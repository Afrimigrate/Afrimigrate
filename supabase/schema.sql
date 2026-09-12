-- AfriMigrate database schema.
-- Run this once in the Supabase Dashboard -> SQL Editor -> New query,
-- after creating the project. Safe to re-run (uses IF NOT EXISTS / OR REPLACE).
--
-- Every table uses Row Level Security so a signed-in user can only ever
-- read or write their OWN rows — this is what makes it safe to call
-- Supabase directly from the browser with the public anon key.

-- ============================================================
-- profiles: one row per user, captured during onboarding
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  current_location text,
  education_level text,
  career_field text,
  language_ability text,
  budget_amount numeric,
  budget_currency text default 'USD',
  timeline_urgency text, -- e.g. 'asap', '6-12-months', '1-2-years', 'just-exploring'
  country_interest text, -- a country slug (e.g. 'canada'), or null for "not sure yet"
  onboarding_completed_at timestamptz,
  recommended_country text,
  recommended_pathway text,
  recommendation_reasoning text,
  crs_score integer,
  is_premium boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles: insert own" on public.profiles;
create policy "profiles: insert own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- ============================================================
-- documents: the document vault (metadata only — actual files live in
-- Supabase Storage, bucket "documents", path prefixed by user id)
-- ============================================================
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null, -- e.g. 'passport', 'language_cert', 'degree_certificate'
  display_name text not null,
  storage_path text not null,
  expiry_date date,
  uploaded_at timestamptz not null default now()
);

alter table public.documents enable row level security;

drop policy if exists "documents: crud own" on public.documents;
create policy "documents: crud own" on public.documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- timeline_milestones: the personalised migration timeline
-- ============================================================
create table if not exists public.timeline_milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  completed boolean not null default false,
  completed_at timestamptz,
  reminder_sent_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.timeline_milestones enable row level security;

drop policy if exists "timeline_milestones: crud own" on public.timeline_milestones;
create policy "timeline_milestones: crud own" on public.timeline_milestones
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- sponsor_applications: the UK sponsorship tracker
-- ============================================================
create table if not exists public.sponsor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  employer_name text not null,
  role_title text,
  date_applied date,
  status text not null default 'applied', -- 'applied' | 'interviewing' | 'offer' | 'sponsored' | 'rejected'
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sponsor_applications enable row level security;

drop policy if exists "sponsor_applications: crud own" on public.sponsor_applications;
create policy "sponsor_applications: crud own" on public.sponsor_applications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- badges: achievement/gamification system
-- ============================================================
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_key text not null, -- e.g. 'documents_complete', 'language_test_booked', 'ready_to_apply'
  earned_at timestamptz not null default now(),
  unique (user_id, badge_key)
);

alter table public.badges enable row level security;

drop policy if exists "badges: read own" on public.badges;
create policy "badges: read own" on public.badges
  for select using (auth.uid() = user_id);

drop policy if exists "badges: insert own" on public.badges;
create policy "badges: insert own" on public.badges
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- saved_destinations: the "vision board" (premium feature)
-- ============================================================
create table if not exists public.saved_destinations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  country_slug text not null,
  note text,
  created_at timestamptz not null default now(),
  unique (user_id, country_slug)
);

alter table public.saved_destinations enable row level security;

drop policy if exists "saved_destinations: crud own" on public.saved_destinations;
create policy "saved_destinations: crud own" on public.saved_destinations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- Storage bucket for the document vault.
-- Run this too — creates a private bucket where each user can only
-- access files under a path starting with their own user id.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "documents bucket: crud own" on storage.objects;
create policy "documents bucket: crud own" on storage.objects
  for all using (
    bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]
  ) with check (
    bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]
  );
