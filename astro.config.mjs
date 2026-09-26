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
  // The one stylesheet (about 10 KB gzipped) goes inline: an external file
  // blocks the first paint on slow phones by a full round trip (s5).
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Legal pages are noindex, keep them out of the sitemap too.
      filter: (page) => !/\/(impressum|datenschutz|legal-notice|privacy)\/?$/.test(page),
      // Pairs / with /en/ as hreflang alternates (same path under the prefix).
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-GB' } },
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
