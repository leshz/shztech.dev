import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import { postSchema } from "./src/lib/content/schema";

/*
 * `postSchema` is the build gate: content-collections validates every
 * `index.mdx` against it while compiling, so a post with a missing title or a
 * malformed date fails `pnpm build` instead of shipping broken metadata. It
 * lives in src/lib/content/schema.ts so it can be unit-tested directly
 * (see schema.test.ts).
 *
 * content-collections consumes schemas through `@standard-schema/spec`, which
 * Zod 4 implements natively — no adapter needed.
 */

/** Average adult reading speed, words per minute. */
const WORDS_PER_MINUTE = 200;

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  /*
   * Dual themes so code blocks follow the site's light/dark token switch.
   *
   * `github-light-default` rather than `github-light`: the latter's token
   * palette is tuned for a pure-white background and measured 3.06–4.22:1
   * against our `--color-surface-raised` code background, failing WCAG AA.
   * `keepBackground: false` keeps our own token background, so the theme's
   * contrast assumptions have to hold against ours.
   */
  theme: { light: "github-light-default", dark: "github-dark-default" },
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
