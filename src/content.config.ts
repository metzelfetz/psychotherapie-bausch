import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per page and language: src/content/pages/<lang>/<name>.md
// Since s3 the home page is a one-pager: its frame (hero, contact box)
// lives here, its body text in the `sections` collection below.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // URL segment below the language root; '' is the home page.
      slug: z.string(),
      // Shared by the DE and EN version of the same page.
      translationKey: z.string(),
      order: z.number().default(99),
      layout: z.enum(['page', 'legal']).default('page'),
      hero: z
        .object({
          // On the one-pager the hero is its first nav entry ("Willkommen").
          anchor: z.string().optional(),
          navLabel: z.string().optional(),
          title: z.string(),
          lead: z.string().optional(),
          // One string per paragraph.
          text: z.array(z.string()),
          image: image(),
          imageAlt: z.string(),
          // 'photo': landscape photo in an arch. 'portrait': a cut-out portrait
          // (transparent PNG) standing in front of a sage arch.
          variant: z.enum(['photo', 'portrait']).default('photo'),
        })
        .optional(),
      // Closing sentence of the page, shown in the contact box with the
      // mailto button and phone number. No box when it is missing.
      cta: z.string().optional(),
    }),
});

// The one-pager's sections: src/content/sections/<lang>/<name>.md, each an
// `#anchor` on the home page below the hero.
const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z.object({
    // Section heading (h2).
    title: z.string(),
    anchor: z.string(),
    // Entry in the header and footer nav; sections without one are reached
    // by scrolling (e.g. "Schwerpunkte", part of the Willkommen block).
    navLabel: z.string().optional(),
    order: z.number(),
    translationKey: z.string(),
    // CV rows, rendered as a timeline after the text. `text` may hold HTML.
    cv: z
      .array(
        z.object({
          period: z.string(),
          text: z.string(),
          // Ongoing position ("Seit …"): drawn with a filled timeline dot.
          current: z.boolean().default(false),
        }),
      )
      .optional(),
    // A sentence and external links after the CV, rendered as link cards.
    links: z
      .object({
        text: z.string(),
        items: z.array(z.object({ label: z.string(), href: z.string().url() })),
      })
      .optional(),
    // Location cards (facts from src/data/practice.ts), each with the
    // section's own sentence about that location.
    locations: z
      .array(z.object({ id: z.enum(['schopfheim', 'freiburg']), text: z.string() }))
      .optional(),
  }),
});

export const collections = { pages, sections };
