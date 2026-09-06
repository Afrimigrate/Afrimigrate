import { defineConfig } from 'astro/config';

// Static output — builds to plain HTML/CSS/JS deployable on GitHub Pages.
// Set 'site' to your custom domain so sitemap/canonical URLs are correct.
export default defineConfig({
  site: 'https://afrimigrate.com',
  output: 'static',
});
