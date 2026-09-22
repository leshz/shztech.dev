import type { Metadata } from "next";
import { Resume } from "@/components/sections/Resume/Resume";
import { Services } from "@/components/sections/Services/Services";
import { Skills } from "@/components/sections/Skills/Skills";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: `Experience, skills and capabilities of ${site.name} — ${site.role}.`,
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <Resume />
      <Skills />
      <Services />
    </>
  );
}
