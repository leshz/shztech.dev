import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getAllPostSlugs, getPostBySlug } from "@/lib/content/posts";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pre-render an OG image per post at build time. */
export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/**
 * Per-post OpenGraph image.
 *
 * Colour literals are intentional: Satori has no stylesheet access, so CSS
 * custom properties do not resolve here. Values mirror src/styles/tokens.css.
 */
export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Post not found";
  const readingTime = post ? `${post.readingTime} min read` : "";
  const tags = post?.tags.slice(0, 3).join(" · ") ?? "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#141414",
        color: "#ffffff",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#f26b38",
        }}
      >
        {site.url.replace("https://", "")}/blog
      </div>

      <div
        style={{
          fontSize: title.length > 60 ? 58 : 72,
          fontWeight: 700,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#a2a2a6",
        }}
      >
        <span>{site.name}</span>
        <span style={{ color: "#ede574" }}>
          {[tags, readingTime].filter(Boolean).join("  ·  ")}
        </span>
      </div>
    </div>,
    size,
  );
}
