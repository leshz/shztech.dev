import { About } from "@/components/sections/About/About";
import { Hero } from "@/components/sections/Hero/Hero";
import { site } from "@/data/site";
import {
  personJsonLd,
  serializeJsonLd,
  webSiteJsonLd,
} from "@/lib/seo/jsonld";

/**
 * Home page.
 *
 * `<main>` lives in the root layout, so sections render directly here.
 * Resume, Skills, Services and Portfolio have their own routes; the home page
 * stays a short introduction rather than a single endless scroll.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own typed data, with `<` escaped in serializeJsonLd. React offers no other way to emit a ld+json body.
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([personJsonLd(), webSiteJsonLd()]),
        }}
      />
      <Hero />
      <About />
    </>
  );
}

export const metadata = {
  alternates: { canonical: site.url },
};
