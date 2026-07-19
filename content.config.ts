import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Each markdown file in `content/blog/` becomes a routed page at `/blog/<filename>`.
// To publish a post: add a `.md` file here and `git push`. Set `draft: true` to hide one.
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      // `page` maps each file's path to a route and gives us `title`/`description`
      // (part of the built-in page schema) plus the custom fields below.
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        date: z.string(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional()
      })
    })
  }
})
