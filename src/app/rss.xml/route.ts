import { Feed } from "feed";
import { site } from "@/data/site";
import { getAllPosts } from "@/lib/content/posts";

/**
 * RSS 2.0 feed.
 *
 * Uses the `feed` package rather than hand-built XML: CDATA escaping and
 * RFC-822 date formatting are easy to get subtly wrong by hand, and a
 * malformed feed fails silently in readers.
 */
export async function GET(): Promise<Response> {
  const feed = new Feed({
    title: `${site.name} — Blog`,
    description: site.bio,
    id: site.url,
    link: site.url,
    language: "en",
    favicon: `${site.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${site.name}`,
    feedLinks: { rss2: `${site.url}/rss.xml` },
    author: {
      name: site.name,
      email: site.email,
      link: site.url,
    },
  });

  for (const post of getAllPosts()) {
    const url = `${site.url}/blog/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: new Date(`${post.date}T00:00:00Z`),
      author: [{ name: site.name, link: site.url }],
      ...(post.tags.length > 0
        ? { category: post.tags.map((tag) => ({ name: tag })) }
        : {}),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
