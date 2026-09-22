import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Shared metadata helpers.
 *
 * `metadataBase` lives in the root layout, so `canonical` and image paths here
 * can stay relative and Next resolves them against the production origin.
 */

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path including the leading slash, e.g. `/blog`. */
  path: string;
  /** Overrides the default OG image for this page. */
  image?: string;
  /** `article` for blog posts, `website` for everything else. */
  type?: "website" | "article";
  publishedTime?: string;
  tags?: readonly string[];
};

/** Build a page's Metadata with canonical URL, OpenGraph and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  tags,
}: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type,
      ...(image ? { images: [{ url: image }] } : {}),
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && tags ? { tags: [...tags] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
