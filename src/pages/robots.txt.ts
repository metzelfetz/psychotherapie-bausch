import type { APIRoute } from 'astro';

// All crawlers are welcome, search engines and AI assistants alike (the
// practice wants to be found and cited). Staging pages carry `noindex` in
// their <head> instead, see BaseLayout.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const sitemap = new URL(`${base}sitemap-index.xml`, site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
