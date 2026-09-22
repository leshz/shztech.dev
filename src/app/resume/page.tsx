import type { Metadata } from "next";
import { Resume } from "@/components/sections/Resume/Resume";
import { Services } from "@/components/sections/Services/Services";
import { Skills } from "@/components/sections/Skills/Skills";
import { yearsOfExperience } from "@/data/resume";
import { site } from "@/data/site";
import { personJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: `${site.role} with ${yearsOfExperience}+ years across fintech, crypto and high-scale e-commerce — Mercado Libre, Globant and Banco Galicia. Experience, skills and education.`,
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      {/*
        Person JSON-LD belongs on this page too: it carries the structured
        alumniOf, worksFor, knowsLanguage and knowsAbout claims, and this is
        the page a recruiter or a search crawler reads as the CV.
      */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own typed data, with `<` escaped in serializeJsonLd. React offers no other way to emit a ld+json body.
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
      />
      <Resume />
      <Skills />
      <Services />
    </>
  );
}
