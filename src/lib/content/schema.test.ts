import { describe, expect, it } from "vitest";
import { postSchema } from "./schema";

/**
 * Regression guard for the build gate.
 *
 * The project's promise is that malformed frontmatter fails `pnpm build`
 * rather than shipping broken metadata. That was verified manually once (a
 * post with `date: not-a-date` exited non-zero with "Invalid ISO date"), but a
 * manual check does not survive a refactor — these tests do.
 */

const valid = {
  title: "A valid post",
  description: "A description within the length limit.",
  date: "2026-09-22",
  tags: ["css"],
  content: "# Body",
};

describe("postSchema", () => {
  it("accepts well-formed frontmatter", () => {
    const result = postSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("applies defaults for omitted optional fields", () => {
    const { tags: _tags, ...withoutTags } = valid;
    const result = postSchema.safeParse(withoutTags);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tags).toEqual([]);
      expect(result.data.draft).toBe(false);
    }
  });

  it("treats cover as genuinely optional", () => {
    expect(postSchema.safeParse(valid).success).toBe(true);
    expect(
      postSchema.safeParse({ ...valid, cover: "./cover.jpg" }).success,
    ).toBe(true);
  });

  // Each of these is a real way a post could ship broken metadata.
  it.each([
    ["a missing title", { ...valid, title: undefined }],
    ["an empty title", { ...valid, title: "" }],
    ["a missing description", { ...valid, description: undefined }],
    ["a non-ISO date", { ...valid, date: "not-a-date" }],
    ["a US-format date", { ...valid, date: "09/22/2026" }],
    ["an impossible date", { ...valid, date: "2026-13-45" }],
    ["a missing date", { ...valid, date: undefined }],
    ["tags that are not an array", { ...valid, tags: "css" }],
    ["a non-boolean draft flag", { ...valid, draft: "yes" }],
    ["an empty cover path", { ...valid, cover: "" }],
  ])("rejects %s", (_label, input) => {
    expect(postSchema.safeParse(input).success).toBe(false);
  });

  it("rejects an over-long title rather than truncating it", () => {
    const result = postSchema.safeParse({ ...valid, title: "x".repeat(121) });
    expect(result.success).toBe(false);
  });

  it("names the offending field, so the build error is actionable", () => {
    const result = postSchema.safeParse({ ...valid, date: "not-a-date" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["date"]);
    }
  });
});
