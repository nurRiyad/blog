import { asSitemapCollection } from '@nuxtjs/sitemap/content'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection(
      asSitemapCollection({
        source: '**',
        type: 'page',
      }),
    ),
    blogs: defineCollection(
      asSitemapCollection({
        source: 'blogs/**',
        type: 'page',
        schema: z.object({
          path: z.string(),
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          ogImage: z.string().optional(),
          tags: z.array(z.string()).optional(),
          alt: z.string().optional(),
          date: z.string().optional(),
          published: z.boolean().optional().default(false),
        }),
      }),
    ),
  },
})
