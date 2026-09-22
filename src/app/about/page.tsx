import type { Metadata } from "next";
import { About } from "@/components/sections/About/About";
import { site } from "@/data/site";
import { personJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: site.bio,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own typed data, with `<` escaped in serializeJsonLd. React offers no other way to emit a ld+json body.
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
      />
      <About />
    </>
  );
}
