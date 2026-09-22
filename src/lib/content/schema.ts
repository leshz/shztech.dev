import { z } from "zod";

/**
 * Frontmatter contract for a blog post.
 *
 * Lives in its own module so it can be unit-tested directly. It is imported by
 * `content-collections.ts`, which hands it to content-collections as the
 * build-time gate: a post whose frontmatter fails this schema fails
 * `pnpm build` rather than shipping broken metadata.
 *
 * Zod 4 note: `z.iso.date()` is the current idiom for a strict `YYYY-MM-DD`
 * string (`z.string().date()` is the deprecated v3 form), and `z.email()`
 * replaced `z.string().email()`.
 */
export const postSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(280),
  date: z.iso.date(),
  tags: z.array(z.string()).default([]),
  /** Path to a colocated image, relative to the post folder (e.g. `./cover.jpg`). */
  cover: z.string().min(1).optional(),
  /** Drafts are compiled but filtered out of listings and sitemaps in production. */
  draft: z.boolean().default(false),
  /**
   * The raw MDX body. Declared explicitly: content-collections deprecated
   * adding this implicitly, and declaring it keeps the generated type honest.
   */
  content: z.string(),
});

export type PostFrontmatter = z.infer<typeof postSchema>;
