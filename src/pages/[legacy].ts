import type { APIRoute, GetStaticPaths } from 'astro';

// v1's URLs, so old links and bookmarks keep working (settles plan.md's
// "legacy redirect mechanism" question: Astro's `redirects` config always
// emits `<path>/index.html`, never a literal `<name>.html` file, so a plain
// endpoint route is used instead).
// v1's index.html maps to the same root URL in v2, so it needs no redirect
// stub (and a same-path stub would race the real homepage route).
// Targets are a page slug or, since the one-pager (s3), a `#section` anchor
// on the home page.
const LEGACY_TARGETS: Record<string, string> = {
  'ueber_mich.html': '#ueber-mich',
  'ablauf.html': '#standorte',
  'kontakt.html': '#standorte',
  'impressum.html': 'impressum',
  'datenschutz.html': 'datenschutz',
};

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(LEGACY_TARGETS).map((legacy) => ({ params: { legacy } }));

export const GET: APIRoute = ({ params, site }) => {
  const target = LEGACY_TARGETS[params.legacy as string];
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const path = target.startsWith('#') ? `${base}${target}` : `${base}${target}/`;
  const url = new URL(path, site).toString();
  const body = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>Weitergeleitet</title>
<meta http-equiv="refresh" content="0; url=${url}">
<link rel="canonical" href="${url}">
</head>
<body>Diese Seite ist umgezogen zu <a href="${url}">${url}</a>.</body>
</html>
`;
  return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
