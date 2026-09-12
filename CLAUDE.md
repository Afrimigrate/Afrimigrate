# AfriMigrate — Master Project Handoff for Claude Code

**Read this file first, in full, before writing any code.**

## What This Is

AfriMigrate is becoming a comprehensive migration platform for Africans moving
abroad — not just a calculator site. Founder: Augustine Okafor, Manchester UK.
Tagline: "Connecting Africa to the World." Live at **afrimigrate.com** (custom
domain via Namecheap DNS; hosting is moving from GitHub Pages to Vercel — see
"Deployment" below). Built as a multi-page Astro static site.

**Status as of the current expansion:** the original 30-page SEO site (Phase
1) is live, and Phase 2 (country profiles for all six countries, plus a
native CRS calculator) is also live — see "Phase 1 Sitemap" and "Phase 2
Vision" below for what that covers. Two Phase 2 items are still open: the
"find your best-fit country" quiz and the multi-country comparison tool.

We are now building **Phase 3: a full product with real user accounts** — 
onboarding, a personalised dashboard, a country recommendation engine, a
migration timeline with email reminders, a document vault, a UK sponsorship
tracker, and more (see "Phase 3 — Full Product" below). This is a genuine
architecture change: a static site alone cannot do accounts, saved data, or
file uploads, so Phase 3 adds **Supabase** (auth + database + file storage)
and, for the paid tier, **Stripe** — see "Architecture — Supabase" and
"Monetisation" below. Working method: Supabase setup → onboarding + dashboard
shell (checkpoint with Augustine before continuing) → recommendation engine →
timeline/reminders/vault → UK sponsorship tracker + proof-of-funds content →
Stripe wiring last.

## Phase 2 Vision — Comprehensive Country Coverage

**Countries covered:** Canada, United Kingdom, Australia, Netherlands, Belgium,
United States. All six pull from one reusable **country profile** content
structure (see "Country Profile Schema" below) so the page layout, design and
content categories stay consistent as countries are added.

**Visa/route coverage per country** — research each country's actual, current
system; the categories below are a floor, not a ceiling. Wherever a route
genuinely exists for that country, document it with: eligibility, approximate
cost, typical timeline, required documents, and whether it leads to permanent
residency.
- Points-based / highly-skilled visas
- Employer-sponsored visas
- Intra-company transfer visas
- Startup / entrepreneur / investor visas
- Working holiday visas
- Family / spousal / partner visas
- Digital nomad visas (where one formally exists — note clearly where it
  doesn't, rather than inventing one)
- Seasonal / agricultural visas
- Graduate / post-study work visas
- Student visas
- Tourist / visitor visas

**Beyond visas — what else belongs on a country page:**
- Best career pathways and in-demand skills right now
- Culture and workplace etiquette — what to actually expect day to day
- Best tourist sites and things to do
- Cost-of-living snapshot for 2–3 major cities (rent, food, transport)
- A "first 30 days" checklist: banking, SIM card, housing, healthcare
  registration
- (Open to more categories as they prove useful — e.g. a "diaspora community"
  section, healthcare system overview, or schooling/childcare notes for
  families. Propose before building a new category so it can be added to the
  shared schema once, not per-country.)

**Country Profile Schema (built, live for all six countries):** one
TypeScript data shape (`src/data/types.ts`) that every country's data file
(`src/data/countries/<slug>.ts`) implements, rendered by one shared component
(`src/components/CountryProfile.astro`). Visa routes are grouped by category
and shown as accordions/cards (not a wall of text) so pages stay scannable on
mobile. `visitingVisas` is kept explicitly separate from the general
`visaCategories` accordion, paired with `touristSites`, per product
requirement. Country-specific bespoke tools (like Canada's CRS calculator)
live alongside the profile as their own pages and link back into it — the
profile doesn't replace them. Adding a 7th or 8th country is now a content
task (write a new `src/data/countries/<slug>.ts` file) — the schema and
renderer don't need to change.

**Additional features still open from Phase 2:**
1. **"Find your best-fit country" quiz** — a short, free questionnaire (budget,
   timeline, education, goals) recommending a country + visa route. Prominent
   homepage entry point. In Phase 3 this becomes a lighter, one-time-view
   version of the full account-based recommendation engine (see Phase 3).
2. **Side-by-side comparison tool** for 2–3 countries at once (extends the
   existing `/compare` page, which currently only has static prose for
   Canada/UK/Australia).

**Content additions layered onto every country page (built alongside the
country profile, not as separate hidden pages):**
- **Credential recognition guide** — how a foreign degree/qualification gets
  assessed in that country (WES for Canada, ECCTIS for the UK, and the
  equivalent bodies for Australia, Netherlands, Belgium, US), with typical
  cost and timeline. ⚠️ Needs real, verified body names/fees — see "Data
  Sourcing Flags" below.
- **Local-currency cost display** — every cost shown (visa fees, proof of
  funds, living costs) also shows an approximate conversion into Nigerian
  Naira, Ghanaian Cedi, Kenyan Shilling and South African Rand, clearly
  labelled as approximate/fluctuating. Static rates updated periodically are
  fine — no real-time forex needed.
- **Proof of funds guidance** — how much is typically required (by family
  size where relevant), what counts as acceptable proof (bank statements, a
  GIC for Canada, etc.), and how long funds typically need to be held/
  seasoned. Legitimate financial documentation guidance only — never
  suggestions about fabricating or misrepresenting funds or their source.
- **Pathway-to-residency + in-demand careers, written as genuine practical
  guidance** — the realistic route from arrival to permanent residency, and
  which careers/skills are currently in demand, for someone starting from
  very little. Grounded and realistic, not hype.

**Freemium model (current, final — see "Monetisation" for the full picture):**
all visa/route information, career/pathway guidance, and tourist attraction
listings **with photos** stay free forever — this is the discovery and
trust-building layer, good for search traffic. The CRS calculator and a
one-time view of the country quiz result are also free forever. The saved,
personalised, account-based experience (dashboard, vision board, document
vault, timeline + reminders, UK sponsor tracker, PDF reports) is Premium via
Stripe.

## Phase 3 — Full Product (User Accounts, Dashboard, Personalisation)

The biggest scope change so far: AfriMigrate moves from a content site to a
real product with logged-in users. Build in this order, checkpointing with
Augustine after step 2 before continuing:

1. **Supabase setup** (auth + Postgres database + file storage in one
   service — see "Architecture — Supabase" below). Confirm it actually works
   before building on top of it.
2. **Onboarding + dashboard shell.** Sign-up/login (email/password to start).
   First-login onboarding captures: name, current location, education,
   career/field, language ability, budget/available funds, timeline urgency,
   and (if known) country of interest, or "not sure yet." Every logged-in
   user then lands on `/dashboard`, greeted by name, with placeholder
   sections for everything below (real content comes in later steps).
   **Stop here and show Augustine before continuing.**
3. **Country recommendation engine.** Scores and recommends a best-fit
   country + visa pathway from the onboarding answers — cost of the pathway
   relative to stated budget, career/skill demand match, language
   requirement match, realistic timeline. Shown with simple, legible
   reasoning (e.g. "Canada ranked highest for you because your IT background
   is in high demand and your budget covers the full process within 18
   months"), not just a bare score.
4. **Migration timeline + email reminders.** A personalised, staged timeline
   from the chosen pathway (e.g. "Month 1: language test, Month 2: document
   collection, Month 4: submit application"). Email reminders as milestones
   approach or documents near expiry, via **Resend** (or similar) triggered
   on a schedule — Supabase's own scheduled Edge Functions / `pg_cron` can
   run this without needing a separate cron host.
5. **Document vault.** Users upload and store documents (passport, language
   certs, degree certificates, etc.) in Supabase Storage, with expiry dates
   shown and fed into the reminder system above.
6. **UK sponsorship tracker** (dedicated to the Skilled Worker pathway):
   - A searchable, filterable directory of UK Skilled Worker sponsor
     licence holders, sourced from the UK government's own public register.
     ⚠️ Real factual data — do not invent or guess employer names; see "Data
     Sourcing Flags" below.
   - Guidance on which sectors/employers commonly sponsor and how to search
     effectively.
   - A place to track applications sent.
   - The pathway from sponsored work visa through to ILR, explained
     step by step.
7. **Migration readiness score** on the dashboard: a motivating percentage
   (progress bar or similar) based on documents uploaded, timeline milestones
   completed, and whether the country/pathway is confirmed.
8. **Success Stories section**, searchable/filterable by destination country.
   Start with 2–3 clearly-labelled placeholder examples (Augustine will
   supply real ones later) — design it so he can add real stories later
   without a developer (a simple structured data file, not hardcoded HTML).
9. **Visual polish / "make it feel alive"** — once the above works:
   - Real tourist-attraction photos via the **Unsplash API** (free, legal for
     commercial use — see "Architecture — Unsplash" below), lazy-loaded/
     cached sensibly.
   - An achievement/badge system on the dashboard tied to real progress
     ("Documents Complete", "Language Test Booked", "Ready to Apply").
   - Best-fit country quiz results shown as swipeable/browsable destination
     cards (photo + key facts), not a plain list.
   - A simple interactive world map on the homepage — click a country for a
     preview before committing to the full page.
   - Small, tasteful celebratory animation (e.g. brief confetti) on
     onboarding completion or hitting 100% readiness — subtle and premium,
     matching the existing warm editorial design system, never cartoonish.

**Stripe wiring for the premium tier comes last**, once everything above
works — see "Monetisation" for the exact free/premium split.

## Architecture — Supabase (Auth, Database, File Storage)

Chosen because it bundles authentication, a Postgres database, and file
storage in one service, and — importantly — **its JS client can be called
directly from the browser** using the public "anon" key plus Row Level
Security policies. That means accounts, the dashboard, and the document
vault can all work from this static Astro site as-is, without needing
Vercel's serverless functions the way Stripe does (Stripe's *secret* key can
never be client-side; Supabase's anon key is designed to be). The one piece
that does need scheduled server-side execution is the email-reminder cron —
Supabase's own Edge Functions + `pg_cron` can handle that without a separate
host.

**What Augustine needs to do to set this up** (parallel to the Stripe
dashboard steps already documented):
1. Create a free account at supabase.com and a new project for AfriMigrate.
2. In Project Settings → API, copy the **Project URL** and the **anon
   public** key (not the `service_role` key — that one must never reach the
   browser or get committed).
3. Paste both into Vercel's environment variables as `PUBLIC_SUPABASE_URL`
   and `PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`).
4. Run the schema in `supabase/schema.sql` via the Supabase SQL Editor to
   create the required tables and Row Level Security policies.
5. In Authentication → Providers, confirm Email is enabled (it is by
   default).

## Architecture — Unsplash (Tourist Photos)

Free, legal for commercial use, and needs no payment method. Augustine needs
to: (1) create a free account at unsplash.com/developers, (2) register a new
application to get an **Access Key**, (3) paste it into Vercel as
`PUBLIC_UNSPLASH_ACCESS_KEY`. Free tier is rate-limited (50 requests/hour on
the default "Demo" tier) — cache fetched photo URLs (e.g. in the database
alongside each tourist site, refreshed periodically) rather than calling the
API on every page load.

## Data Sourcing Flags (real data required — do not fabricate)

- **UK sponsor licence register**: the UK government publishes the full,
  current list of Skilled Worker sponsor licence holders publicly. This is a
  large dataset (thousands of rows) best imported directly from the official
  published register rather than manually transcribed — Augustine should
  confirm the current official source URL so the import pulls from the real
  file, not a scraped or secondhand copy, and the directory needs a
  refresh process since the register changes regularly.
- **Credential recognition bodies**: WES (Canada) and ECCTIS (UK, formerly
  UK NARIC) are correct and stable. The equivalent bodies for Australia,
  Netherlands, Belgium and the US should be verified against each country's
  current official immigration/education-recognition guidance before
  publishing — these can change names or scope.

## Original Job (Phase 1 — completed)

1. Scaffold this repo as a static site generator (Astro) so pages share one layout.
2. Port the original `index.html` design (colours, type, spacing — see Design
   System below) into `src/layouts/Layout.astro` as the shared shell.
3. Build the 30 pages listed in "Phase 1 Sitemap" below.
4. Generate `sitemap.xml` and `robots.txt` as part of the build.
5. Do NOT touch the Bubble app — that's a separate no-code product surface
   (see "Bubble App" section) and is out of scope for this repo. Tool pages here
   should link to or iframe-embed the Bubble tool, not reimplement its logic yet.

This phase is done. Its output (`src/pages/*`, `src/layouts/Layout.astro`,
`public/`) is the foundation Phase 2 builds on — don't redo it, extend it.

## Non-Negotiables

- Keep the visual identity **exactly** as established — do not redesign it.
  Green and gold are ACCENT colours only, used sparingly. The background is warm
  off-white, not white, not dark. See full design tokens below.
- Every new page must reuse the same shared `Layout.astro` — never hand-roll a
  one-off header/footer.
- Every page needs a unique, keyword-targeted `<title>` and meta description —
  this is the whole point of tonight's work (SEO surface area).
- Free-forever positioning must show up in copy everywhere — this is the core
  differentiator vs. every competitor found in research (see Competitors below).

---

## Design System (already established — replicate exactly)

```css
--bg:        #F7F4EF;   /* warm off-white — dominant background, NOT white */
--bg2:       #EDEAE3;   /* slightly deeper warm tone for alternating sections */
--ink:       #141210;   /* near-black — headings, primary text */
--ink2:      #5C564E;   /* muted body text */
--green:     #2E8B2E;   /* ACCENT ONLY — logo, primary CTA, key numbers */
--gold:      #C8960E;   /* ACCENT ONLY — eyebrow labels, small highlights */
--gold-bg:   #FBF3DC;   /* pale gold background for "hot/most used" badges */
--border:    #DDD8CF;
--white:     #FFFFFF;
--radius:    10px;
--radius-lg: 18px;
```

**Typography:**
- Display / headings: `Fraunces` (serif), weight 900, italic used for emphasis
  words in hero headlines (e.g. "Pay *nothing*.")
- Body: `DM Sans`, weights 300/400/500/600
- Google Fonts import:
  `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,900&family=DM+Sans:wght@300;400;500;600&display=swap`

**Logo:** Green Africa silhouette inside a gold ring with a leaf motif, "AFRIMIGRATE"
wordmark below in a gold band, tagline "CONNECTING AFRICA TO THE WORLD". Files
already exist in the live GitHub repo (`logo.jpeg`, `apple-touch-icon.png`,
`icon-192.png`, `icon-512.png`) — pull them into `public/` here.

**Tone of voice:** short sentences, no jargon, calm and confident. Example lines
already in use: "Plan your move abroad. Pay nothing.", "No jargon. One clear plan.",
"Migration shouldn't cost a fortune to plan."

---

## Phase 1 Sitemap — Completed (30 pages, live on the `claude/nice-cannon-wuunzz` branch)

| # | Page | Path | Target Keyword |
|---|------|------|-----------------|
| 1 | Home | `/` | afrimigrate, free migration planning africa |
| 2 | Tools Hub | `/tools` | free immigration tools africans |
| 3 | How It Works | `/how-it-works` | how to plan migration abroad |
| 4 | Canada Hub | `/canada` | move to canada from africa |
| 5 | CRS Calculator | `/canada/crs-calculator` | CRS calculator canada express entry |
| 6 | Express Entry Guide | `/canada/express-entry` | express entry canada guide |
| 7 | PNP Finder | `/canada/pnp` | provincial nominee program finder |
| 8 | Saskatchewan SINP | `/canada/pnp/saskatchewan-sinp` | saskatchewan sinp points calculator |
| 9 | Document Checklist (Canada) | `/canada/document-checklist` | canada pr document checklist |
| 10 | Cost of Moving to Canada | `/canada/cost-of-moving` | cost of moving to canada from nigeria |
| 11 | PR Timeline Estimator | `/canada/pr-timeline` | how long does canada pr take |
| 12 | UK Hub | `/uk` | move to uk from africa |
| 13 | Skilled Worker Visa Checker | `/uk/skilled-worker-visa-checker` | uk skilled worker visa eligibility |
| 14 | UK Visa Cost Calculator | `/uk/visa-cost-calculator` | uk visa cost calculator IHS NHS |
| 15 | Visa to ILR Roadmap | `/uk/ilr-roadmap` | uk visa to ILR roadmap steps |
| 16 | Australia Hub | `/australia` | move to australia from africa |
| 17 | Australia Points Calculator | `/australia/points-calculator` | australia points calculator 189 190 |
| 18 | Skills Assessment Guide | `/australia/skills-assessment` | australia skills assessment body finder |
| 19 | Compare Destinations | `/compare` | canada vs uk vs australia immigration |
| 20 | Destinations Hub | `/destinations` | best country for africans to migrate |
| 21 | Blog Hub | `/blog` | migration guides for africans |
| 22 | Nigeria → Canada Guide | `/blog/nigeria-to-canada-guide` | moving from nigeria to canada guide |
| 23 | Ghana → UK Guide | `/blog/ghana-to-uk-guide` | moving from ghana to uk guide |
| 24 | Kenya → Australia Guide | `/blog/kenya-to-australia-guide` | moving from kenya to australia guide |
| 25 | How CRS Scoring Works | `/blog/how-crs-score-works` | how does crs score work |
| 26 | Document Prep Guide | `/blog/document-checklist-guide` | immigration document checklist guide |
| 27 | About | `/about` | afrimigrate about us |
| 28 | FAQ | `/faq` | afrimigrate frequently asked questions |
| 29 | Privacy Policy | `/privacy-policy` | legal/trust |
| 30 | Terms of Service | `/terms` | legal/trust |

All 30 pages above are built. Do not rebuild them — Phase 2 adds a new layer
(country profiles, quiz, comparison tool) alongside this existing sitemap, and
may extend individual pages (e.g. `/compare`) rather than replace them.

---

## Deployment

Hosting is moving from GitHub Pages to Vercel (Astro static output needs no
`vercel.json` — Vercel auto-detects it). Augustine needs to: (1) import the
repo into Vercel, (2) point afrimigrate.com's DNS at Vercel in Namecheap once
Vercel shows the required records. The `public/CNAME` file is kept either way
so nothing breaks if GitHub Pages is used instead.

---

## Monetisation

Core promise: every visa/route guide, calculator, checklist, and the country
quiz are **free forever**. Premium is additive only — it's the saved,
personalised, account-based layer on top, never a paywall on information.

**Free tier (final, concrete — do not re-litigate):**
- All visa/pathway/career information, for every country
- Tourist attraction listings **with photos** — deliberately kept visually
  rich and free; it's a discovery and trust-building layer that's also good
  for search traffic
- The CRS calculator
- Sign-up, onboarding, and the country recommendation result (one-time view)

**Premium tier (Stripe):**
- The full personalised dashboard experience — badges, migration readiness
  score
- "Vision board" — saving favourite destinations/photos from the quiz result
- Document vault
- Migration timeline with email reminders
- UK sponsorship tracker
- Downloadable PDF reports
- AI-generated cover letter / SOP

In short: **free = discover and decide, premium = plan, save, and track.**

**Already built:** `/premium` with real Stripe Checkout wiring in
`api/create-checkout-session.js` and `api/stripe-webhook.js` for the $9 PDF
report and $15 AI cover letter — these live at the project root, not under
`src/`, so they run as Vercel serverless functions without needing an Astro
SSR adapter; the rest of the site stays a plain static build. **This only
works once the site is actually hosted on Vercel** (GitHub Pages can't run
server code) — until then the buttons on `/premium` fail gracefully with a
"not switched on yet" message rather than breaking. See `.env.example` for
the exact environment variables Vercel needs and where each one comes from
in the Stripe Dashboard.

The rest of the premium tier (dashboard, vault, timeline, UK tracker) is
gated by Supabase auth once accounts exist, not by Stripe directly — Stripe
unlocks the premium *content* inside an already-logged-in account, rather
than gating login itself.

The webhook currently only logs a successful payment — actual PDF rendering
and AI letter generation need their own follow-up decisions (a PDF library
needs no new account; the AI cover letter needs an LLM API key from
whichever provider Augustine picks) before that fulfillment logic gets built.

---

## Competitive Landscape (researched — do not re-research, act on this)

**Direct threat — Africa-focused AI relocation tools already live:**
- **JapaPrep AI** — AI-generated SOPs/CVs, 17 countries, 32+ visa routes
- **Japa Assist** — WhatsApp AI bot for Nigerians
- **Japa GPT**, **JapaConnect** — similar Nigeria-focused tools

**Proven SEO/content model to replicate:**
- **Moving2Canada** — huge content hub, ranks for hundreds of long-tail keywords
- **CRSCalculate.com** — one URL per calculator/province — directly copy this pattern
- **CanadaVisa.com**, **Y-Axis**, **TerraTern** — lead-gen calculator suites, one
  calculator per country under one domain

**AfriMigrate's differentiation to push hard in copy:** pan-African (not Nigeria-only),
100% free forever (not a paid-tier upsell), tool-based (not chat-only).

---

## Bubble App (existing product — separate from this repo)

- URL: `japa--app.bubbleapps.io` (still branded "JAPA" — needs renaming to
  "afrimigrate" in Bubble Settings → General)
- Built: CRS Score Calculator, Results Dashboard, Document Checklist, User Input form
- **Known bug:** mobile layout is broken — all elements use fixed pixel positions
  instead of responsive containers/groups. Wrap everything in a responsive
  container and set width to 100%/centred.
- **Not yet built:** database (needs data types `ScoreRun`, `DocumentLink`,
  `CareerPath`), User Dashboard, UK tools, Australia tools
- CRS pathway logic: Study = default, PNP = score ≥300, FSW = score ≥400
- Gotcha: dropdown option text with apostrophes (e.g. "Master's degree") can
  break exact-match conditions in Bubble workflows — watch for this if building
  similar logic elsewhere

## Full Feature Backlog (from Trello — 100+ planned features)

Canada (32), UK (30), Australia (23), Global Comparison Engine (9), AI features (7),
User Accounts & Saved Plans (15). Full itemised list is in
`AfriMigrate_Handoff.docx` in this folder — treat it as the source of truth for
in-app tool functionality (separate from the marketing-site sitemap above).

## Phase 2 Backlog — Not Now

(Named "Phase 2 Backlog" per Augustine's own request — not to be confused
with the country-profile "Phase 2" earlier in this doc, which is a separate,
already-largely-completed body of work. This section is just a holding pen
for good ideas raised alongside the Phase 3 build that are explicitly
deferred, so they aren't lost.)

- **WhatsApp reminder channel**, alongside the email reminders in Phase 3 step 4
- **AI-powered mock visa interview practice** — especially useful for US visa applicants
- **Referral program**
- **French and Portuguese language support** for Francophone/Lusophone African users
- **Employer-facing side of the platform** — companies eventually paying to reach candidates directly

## Outstanding Ops Items (not code, but flag to Augustine if relevant)

- Email waitlist on the current landing page has no backend — needs Mailchimp or
  ConvertKit connected
- Trello board "JAPA Agile Project" (https://trello.com/b/oHL04ZEI/japa-agile-project)
  still needs to be moved from a guest context into Augustine's main Trello
  account/workspace so future tools can read it directly
