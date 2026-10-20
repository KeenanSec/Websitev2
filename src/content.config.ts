import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Cybersecurity', 'Reverse Engineering', 'Projects', 'Personal']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    demo: z.boolean().default(false),
  }),
});

export const collections = { articles };
