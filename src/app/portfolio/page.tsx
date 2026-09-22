import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio/Portfolio";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected projects — headless commerce, payments integrations, open-source tooling.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return <Portfolio />;
}
