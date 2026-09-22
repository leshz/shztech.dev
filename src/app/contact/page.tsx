import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact/Contact";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name}. ${site.availability}`,
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
