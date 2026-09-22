import type { Metadata } from "next";
import { Resume } from "@/components/sections/Resume/Resume";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: `Experience and background of ${site.name} — ${site.role}.`,
  path: "/resume",
});

export default function ResumePage() {
  return <Resume />;
}
