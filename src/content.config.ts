import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per page and language: src/content/pages/<lang>/<name>.md
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
      nav: z.boolean().default(false),
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
      cv: z
        .array(
          z.object({
            period: z.string(),
            text: z.string(),
            // Ongoing position: drawn with a filled timeline dot.
            current: z.boolean().default(false),
          }),
        )
        .optional(),
      trainings: z.array(z.string()).optional(),
      // Tag groups shown beside the text. They repeat terms from the text.
      highlights: z.array(z.object({ label: z.string(), items: z.array(z.string()) })).optional(),
      // Practice facts shown beside the text (from src/data/practice.ts).
      aside: z.enum(['contact', 'address']).optional(),
      // Wide mood photo between the text and the contact box.
      band: z.object({ image: image(), imageAlt: z.string() }).optional(),
      showMap: z.boolean().default(false),
      // Closing sentence of the page, shown in the contact box with the
      // mailto button and phone number. No box when it is missing.
      cta: z.string().optional(),
    }),
});

export const collections = { pages };
