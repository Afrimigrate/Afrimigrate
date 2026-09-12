// Supabase client for the browser. Uses the public "anon" key only — this
// is safe to ship to the browser by design (Supabase enforces access via
// Row Level Security policies, defined in supabase/schema.sql), unlike a
// Stripe secret key which must never leave the server.
//
// Astro exposes any env var prefixed PUBLIC_ to client-side code
// automatically. Set these in Vercel's Environment Variables once the
// Supabase project exists — see CLAUDE.md "Architecture — Supabase".
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// A placeholder client when not configured lets pages render and show a
// friendly "not set up yet" message instead of crashing at import time.
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key');
