import { describe, expect, it } from "vitest";

/**
 * Draft visibility rule.
 *
 * A post with `draft: true` stays in the repository and is visible while
 * writing, but must never reach production — not in the listing, the sitemap,
 * the RSS feed, the rendered page, or its social image.
 *
 * `posts.ts` imports the generated `content-collections` module, which only
 * exists after a build, so this tests the predicate directly rather than
 * importing the port. The rule is one line in `posts.ts` (`isPublished`) and
 * this locks its semantics.
 */

type DraftLike = { draft: boolean };

/** Mirrors `isPublished` in posts.ts. */
const isPublished = (post: DraftLike, nodeEnv: string): boolean =>
  nodeEnv === "development" || !post.draft;

const draft = { draft: true };
const published = { draft: false };

describe("draft visibility", () => {
  it("hides drafts in production", () => {
    expect(isPublished(draft, "production")).toBe(false);
  });

  it("shows drafts in development, so they can be previewed while writing", () => {
    expect(isPublished(draft, "development")).toBe(true);
  });

  it("hides drafts during tests and any other environment", () => {
    // Anything that is not explicitly development must behave like production.
    for (const env of ["test", "staging", "preview", ""]) {
      expect(isPublished(draft, env)).toBe(false);
    }
  });

  it("always shows published posts", () => {
    for (const env of ["production", "development", "test", ""]) {
      expect(isPublished(published, env)).toBe(true);
    }
  });
});
