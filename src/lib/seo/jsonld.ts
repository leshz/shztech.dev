import { education, experience, languages } from "@/data/resume";
import { site } from "@/data/site";
import type { Post } from "@/lib/content/posts";

/**
 * JSON-LD builders.
 *
 * These return plain objects. Pages serialise them into a
 * `<script type="application/ld+json">` tag. The data is our own typed content,
 * never user input, so `JSON.stringify` is sufficient — but we still escape `<`
 * to avoid any chance of closing the script tag early.
 */

const socialUrls = site.socials
  .filter((social) => social.platform !== "email")
  .map((social) => social.url);

/** Serialise JSON-LD for safe embedding inside a <script> element. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** schema.org Person — the site's primary entity. */
export function personJsonLd() {
  const currentRole = experience[0];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: site.role,
    description: site.bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressCountry: "CO",
    },
    sameAs: socialUrls,
    ...(currentRole
      ? {
          worksFor: {
            "@type": "Organization",
            name: currentRole.company,
          },
        }
      : {}),
    // Degree-granting institutions only. Platzi is continuous learning, not
    // an alumniOf claim, so it is deliberately excluded here.
    alumniOf: education
      .filter((item) => item.degree.startsWith("B.S."))
      .map((item) => ({
        "@type": "CollegeOrUniversity",
        name: item.institution,
      })),
    knowsLanguage: languages.map((item) => ({
      "@type": "Language",
      name: item.language,
    })),
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Frontend Architecture",
      "Design Systems",
      "Micro-frontends",
      "Monorepos",
      "Technical SEO",
      "Headless CMS",
      "Fintech",
      "Crypto",
      "Technical Leadership",
    ],
  };
}

/** schema.org WebSite — enables sitelinks search metadata. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    author: { "@type": "Person", name: site.name, url: site.url },
    inLanguage: "en",
  };
}

/** schema.org BlogPosting for a single post. */
export function blogPostingJsonLd(post: Post) {
  const url = `${site.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    keywords: post.tags.join(", "),
    wordCount: post.wordCount,
    inLanguage: "en",
    image: `${site.url}/blog/${post.slug}/opengraph-image`,
  };
}

/** schema.org BreadcrumbList. Pass crumbs in order, root first. */
export function breadcrumbJsonLd(
  crumbs: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
