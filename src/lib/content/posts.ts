import { allPosts, type Post as RawPost } from "content-collections";

/**
 * The content port.
 *
 * Every page reads posts through this module, never from `content-collections`
 * directly. That keeps the fact that posts are MDX files on disk an
 * implementation detail: moving to a headless CMS later means rewriting this
 * file and nothing else.
 */

export type Post = RawPost;

/** Post metadata without the compiled MDX body — cheap to pass to listings. */
export type PostSummary = Omit<Post, "mdx" | "content">;

const isPublished = (post: Post): boolean =>
  process.env.NODE_ENV === "development" || !post.draft;

const byNewestFirst = (a: Post, b: Post): number =>
  b.date.localeCompare(a.date);

/** Published posts, newest first. Drafts are included only in development. */
export function getAllPosts(): Post[] {
  return allPosts.filter(isPublished).sort(byNewestFirst);
}

/** Listing-shaped posts, newest first, without the compiled body. */
export function getAllPostSummaries(): PostSummary[] {
  return getAllPosts().map(({ mdx: _mdx, content: _content, ...rest }) => rest);
}

/** A single post by slug, or `undefined` when it does not exist or is a draft. */
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** Every published slug — used by `generateStaticParams` and the sitemap. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/** Unique tags across published posts, with how many posts carry each. */
export function getAllTags(): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Published posts carrying a given tag, newest first. */
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
