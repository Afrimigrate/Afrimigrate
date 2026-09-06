import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output — builds to plain HTML/CSS/JS deployable on GitHub Pages or Vercel.
// Set 'site' to your custom domain so sitemap/canonical URLs are correct.
export default defineConfig({
  site: 'https://afrimigrate.com',
  output: 'static',
  integrations: [sitemap()],
});
