import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostSummaries } from "@/lib/content/posts";
import { pageMetadata } from "@/lib/seo/metadata";
import sectionStyles from "@/styles/section.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Notes on frontend architecture, TypeScript, and building products at scale.",
  path: "/blog",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function BlogPage() {
  const posts = getAllPostSummaries();

  return (
    <section className={sectionStyles.section}>
      <div className={sectionStyles.content}>
        <h1 className={sectionStyles.title}>
          <span className={sectionStyles.titleInner}>Blog</span>
        </h1>

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts published yet.</p>
        ) : (
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.item}>
                <Link href={`/blog/${post.slug}`} className={styles.link}>
                  <article className={styles.card}>
                    <div className={styles.meta}>
                      <time dateTime={post.date}>
                        {dateFormatter.format(
                          new Date(`${post.date}T00:00:00Z`),
                        )}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime} min</span>
                      {post.draft ? (
                        <span className={styles.draft}>Draft</span>
                      ) : null}
                    </div>

                    <h2 className={styles.title}>{post.title}</h2>
                    <p className={styles.description}>{post.description}</p>

                    {post.tags.length > 0 ? (
                      <ul className={styles.tags}>
                        {post.tags.map((tag) => (
                          <li key={tag} className={styles.tag}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
