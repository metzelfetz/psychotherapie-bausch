import { getCollection, type CollectionEntry } from 'astro:content';
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from './ui';

export type Page = CollectionEntry<'pages'>;

export function langOf(page: Page): Lang {
  return page.id.startsWith('en/') ? 'en' : 'de';
}

export async function pagesFor(lang: Lang) {
  const all = await getCollection('pages');
  return all.filter((p) => langOf(p) === lang).sort((a, b) => a.data.order - b.data.order);
}

export function urlFor(lang: Lang, slug: string) {
  return getRelativeLocaleUrl(lang, slug);
}

/** The same page in the other language, if it exists. */
export async function counterpart(page: Page) {
  const other: Lang = langOf(page) === 'de' ? 'en' : 'de';
  const all = await pagesFor(other);
  return all.find((p) => p.data.translationKey === page.data.translationKey);
}

export type Section = CollectionEntry<'sections'>;

/** The one-pager's sections for a language, in page order. */
export async function sectionsFor(lang: Lang) {
  const all = await getCollection('sections');
  return all.filter((s) => s.id.startsWith(`${lang}/`)).sort((a, b) => a.data.order - b.data.order);
}

/** A section's anchor on the home page; works from any page. */
export function sectionUrl(lang: Lang, section: Section) {
  return `${urlFor(lang, '')}#${section.data.anchor}`;
}
