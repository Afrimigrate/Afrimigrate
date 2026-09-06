# AfriMigrate — Master Project Handoff for Claude Code

**Read this file first, in full, before writing any code.**

## What This Is

AfriMigrate is becoming a comprehensive migration platform for Africans moving
abroad — not just a calculator site. Founder: Augustine Okafor, Manchester UK.
Tagline: "Connecting Africa to the World." Live at **afrimigrate.com** (custom
domain via Namecheap DNS; hosting is moving from GitHub Pages to Vercel — see
"Deployment" below). Built as a multi-page Astro static site.

**Status as of the current expansion:** the original 30-page SEO site (see
"Phase 1 Sitemap — Completed" below) is live. We are now building Phase 2: a
full **country profile** system covering every realistic legal migration route
for six countries, plus career/culture/cost-of-living content, a "find your
best-fit country" quiz, and a multi-country comparison tool. Canada is the
reference implementation — built first, shown to Augustine, then replicated to
the other five countries so adding a 7th or 8th country later is a content
task (fill in a data file), not a rebuild.

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

**Country Profile Schema:** one TypeScript data shape (`src/data/types.ts`)
that every country's data file (`src/data/countries/<slug>.ts`) implements,
rendered by one shared component (`src/components/CountryProfile.astro`).
Visa routes are grouped by category and shown as accordions/cards (not a wall
of text) so pages stay scannable on mobile. Country-specific bespoke tools
(like Canada's CRS calculator) live alongside the profile as their own pages
and link back into it — the profile doesn't replace them.

**Additional features:**
1. **"Find your best-fit country" quiz** — a short, free questionnaire (budget,
   timeline, education, goals) recommending a country + visa route. Prominent
   homepage entry point.
2. **Side-by-side comparison tool** for 2–3 countries at once (extends the
   existing `/compare` page, which currently only has static prose for
   Canada/UK/Australia).

**Freemium model:** all visa/route information, the country quiz, the
comparison tool, and basic checklists stay free forever — never paywalled.
Premium add-ons (via Stripe) are proposed to Augustine with 3–4 concrete
options before any Stripe integration work starts; environment variables only
for keys, never hardcoded or committed. See "Monetisation" below for the
process once Augustine has approved a direction.

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

Core promise: every visa/route guide, calculator, checklist, the country quiz
and the comparison tool are **free forever**. Premium is additive only.

Process: propose 3–4 concrete premium features to Augustine (with reasoning
on build effort vs. likely willingness to pay) → wait for explicit approval on
a direction → only then wire up Stripe, using environment variables for all
keys (never hardcoded, never committed) and clear instructions for what
Augustine needs to set up on the Stripe dashboard himself, since only he can
create that account. Flag clearly if a chosen feature requires user accounts
and a database decision (e.g. saved progress/comparisons) — that's a bigger
architectural step than a stateless PDF export.

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

## Outstanding Ops Items (not code, but flag to Augustine if relevant)

- Email waitlist on the current landing page has no backend — needs Mailchimp or
  ConvertKit connected
- Trello board "JAPA Agile Project" (https://trello.com/b/oHL04ZEI/japa-agile-project)
  still needs to be moved from a guest context into Augustine's main Trello
  account/workspace so future tools can read it directly
