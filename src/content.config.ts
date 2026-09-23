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
        })
        .optional(),
      cv: z.array(z.object({ period: z.string(), text: z.string() })).optional(),
      trainings: z.array(z.string()).optional(),
      showMap: z.boolean().default(false),
      // Shows the mailto "Email senden" button below the prose.
      cta: z.boolean().default(false),
    }),
});

export const collections = { pages };
