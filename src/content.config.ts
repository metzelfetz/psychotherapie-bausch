import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per page and language: src/content/pages/<lang>/<name>.md
// Since s3 the home page is a one-pager: its frame (hero, band, contact box)
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
          title: z.string(),
          lead: z.string().optional(),
          text: z.string(),
          image: image(),
          imageAlt: z.string(),
          // 'photo': landscape photo in an arch. 'portrait': a cut-out portrait
          // (transparent PNG) standing in front of a sage arch.
          variant: z.enum(['photo', 'portrait']).default('photo'),
        })
        .optional(),
      // Wide photo between the second-to-last and the last section.
      band: z.object({ image: image(), imageAlt: z.string() }).optional(),
      // Closing sentence of the page, shown in the contact box with the
      // mailto button and phone number. No box when it is missing.
      cta: z.string().optional(),
    }),
});

// The one-pager's sections: src/content/sections/<lang>/<name>.md, each an
// `#anchor` on the home page and an entry in the header and footer nav.
const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z.object({
    // Section heading (h2). Omitted when the hero already carries it.
    title: z.string().optional(),
    anchor: z.string(),
    navLabel: z.string(),
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
