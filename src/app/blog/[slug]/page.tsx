import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon/Icon";
import { getAllPostSlugs, getPostBySlug } from "@/lib/content/posts";
import { blogPostingJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { mdxComponents } from "@/mdx-components";
import sectionStyles from "@/styles/section.module.css";
import styles from "./page.module.css";

/**
 * Next 16 passes route params as a Promise — they must be awaited.
 * (This differs from Next 14, where `params` was a plain object.)
 */
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={sectionStyles.section}>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own typed data, escaped in serializeJsonLd */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(blogPostingJsonLd(post)),
        }}
      />

      <div className={sectionStyles.content}>
        <header className={styles.header}>
          <Link href="/blog" className={styles.back}>
            <Icon name="arrow-right" size={12} className={styles.backIcon} />
            All posts
          </Link>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>

          <div className={styles.meta}>
            <time dateTime={post.date}>
              {dateFormatter.format(new Date(`${post.date}T00:00:00Z`))}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
            {post.draft ? <span className={styles.draft}>Draft</span> : null}
          </div>

          {post.tags.length > 0 ? (
            <ul className={styles.tags}>
              {post.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className={styles.body}>
          <MDXContent code={post.mdx} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
