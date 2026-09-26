import type { APIRoute } from 'astro';
import { locations, practice } from '../data/practice';
import { pagesFor, sectionsFor, urlFor } from '../i18n/pages';

// /llms.txt (llmstxt.org): the practice in plain Markdown for AI assistants,
// built from the same content and facts as the pages, so it never drifts.
// German first (the site's language), with links to both versions.
export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).toString();
  const home = (await pagesFor('de')).find((p) => p.data.slug === '')!;
  const hero = home.data.hero!;
  const sections = await sectionsFor('de');
  const legal = (await pagesFor('de')).filter((p) => p.data.layout === 'legal');
  const legalEn = (await pagesFor('en')).filter((p) => p.data.layout === 'legal');

  const lines: string[] = [
    `# ${practice.practiceName.de} ${practice.name}`,
    '',
    `> ${home.data.description}`,
    '',
    `${practice.tagline.de.replace(' · ', ', ')}. Kontakt am besten per E-Mail: ${practice.email} (Telefon: ${practice.phone.display}).`,
    '',
    '## Standorte',
    '',
    ...locations.flatMap((l) => [
      `- **${l.city}**: ${l.street}, ${l.postalCode} ${l.city} – ${l.days.de}. Abrechnung: ${l.billing.de
        .map((b) => (typeof b === 'string' ? b : b.text))
        .join(', ')}.`,
    ]),
    '',
    `## ${hero.title}`,
    '',
    `${hero.lead} ${hero.text.join('\n\n')}`,
  ];

  for (const s of sections) {
    lines.push('', `## ${s.data.title}`, '', (s.body ?? '').trim());
    if (s.data.cv) {
      lines.push('', ...s.data.cv.map((r) => `- ${r.period}: ${r.text}`));
    }
    if (s.data.links) {
      lines.push('', s.data.links.text, ...s.data.links.items.map((l) => `- ${l.href}`));
    }
  }

  lines.push(
    '',
    '## Seiten',
    '',
    `- [Startseite (Deutsch)](${abs(urlFor('de', ''))})`,
    `- [Home (English)](${abs(urlFor('en', ''))})`,
    ...legal.map((p) => `- [${p.data.title}](${abs(urlFor('de', p.data.slug))})`),
    ...legalEn.map((p) => `- [${p.data.title}](${abs(urlFor('en', p.data.slug))})`),
    '',
  );

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
