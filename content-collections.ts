import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import { z } from "zod";

/**
 * Frontmatter contract for a blog post.
 *
 * This schema is the build gate: content-collections validates every
 * `index.mdx` against it while compiling, so a post with a missing title or a
 * malformed date fails `pnpm build` instead of shipping broken metadata.
 *
 * Zod 4 note: `z.iso.date()` is the current idiom for a strict `YYYY-MM-DD`
 * string. (`z.string().date()` still exists but is the deprecated v3 form.)
 * content-collections consumes schemas through `@standard-schema/spec`, which
 * Zod 4 implements natively — no adapter needed.
 */
const postSchema = z.object({
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

/** Average adult reading speed, words per minute. */
const WORDS_PER_MINUTE = 200;

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  // Dual themes so code blocks follow the site's light/dark token switch.
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
};

const posts = defineCollection({
  name: "posts",
  directory: "src/content/blog",
  include: "**/index.mdx",
  schema: postSchema,
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, {
      rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
    });

    // `_meta.directory` is the post folder name, which is the public slug.
    // Falling back to the filename keeps a flat `foo.mdx` working too.
    const slug =
      doc._meta.directory || doc._meta.fileName.replace(/\.mdx$/, "");

    const words = doc.content.split(/\s+/u).filter(Boolean).length;
    const readingTime = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

    return { ...doc, mdx, slug, readingTime, wordCount: words };
  },
});

export default defineConfig({ content: [posts] });
