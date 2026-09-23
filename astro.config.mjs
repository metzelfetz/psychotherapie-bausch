// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL / BASE_PATH let the same code build for the GitHub Pages staging URL
// (https://metzelfetz.github.io/psychotherapie-bausch/) and the custom domain.
const site = process.env.SITE_URL || 'https://psychotherapie-bausch.de';
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Legal pages are noindex, keep them out of the sitemap too.
      filter: (page) => !/\/(impressum|datenschutz|legal-notice|privacy)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
