# AfriMigrate — Website Rebuild

Start here: open `CLAUDE.md` in Claude Code — it has the full brief, design
system, sitemap, competitor research, and backlog. This README is just setup.

## Local development

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

Output goes to `dist/`. Push the contents of `dist/` to the `main` branch of
the `Afrimigrate/Afrimigrate` GitHub repo (same repo currently serving the
live site at afrimigrate.com), or set up a GitHub Action to build and deploy
automatically on push.

## What's already scaffolded

- `src/layouts/Layout.astro` — shared header/footer/design system. Every page
  must use this.
- `src/pages/index.astro` — homepage starter (needs full content ported from
  the live index.html — see TODO comment in the file)
- `src/pages/canada/index.astro` — Canada hub starter
- `src/pages/canada/crs-calculator.astro` — first fully-patterned tool page,
  use this as the template for every other tool/guide page in the sitemap

## What's not done yet

Everything else in the 30-page sitemap in `CLAUDE.md`. Copy the pattern from
`crs-calculator.astro` for each new tool page, and write fresh content for
each guide/hub page — do not copy-paste text between pages, each needs unique
content for SEO to work.

Also see `AfriMigrate_Handoff.docx` and `AfriMigrate_SEO_Competitive_Handoff.docx`
in this folder for the full product backlog and competitive research detail.
