// Real projects shown on the portfolio/work page.
// To add a project: append an object below with a unique slug.
// `liveUrl` is optional — omit the key entirely when there's no live site
// (exactOptionalPropertyTypes forbids assigning `liveUrl: undefined`).

export type ProjectCategory = "E-commerce" | "Open Source" | "Tooling";

export type Project = {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly repoUrl: string;
  readonly liveUrl?: string;
  readonly featured: boolean;
  readonly category: ProjectCategory;
};

export const projects = [
  {
    slug: "evokare",
    name: "evokare",
    description: "Mono repo for e-commerce with Strapi and Next.js.",
    stack: ["TypeScript", "Next.js", "Strapi"],
    repoUrl: "https://github.com/leshz/evokare",
    liveUrl: "https://elisa-horta.vercel.app",
    featured: true,
    category: "E-commerce",
  },
  {
    slug: "mercadopago-strapi",
    name: "mercadopago-strapi",
    description:
      "A powerful plugin for integrating MercadoPago with the Strapi CMS. Simplifies the integration process, allowing you to easily handle payments and manage products to create a lightweight e-commerce solution using MercadoPago's API.",
    stack: ["TypeScript", "Strapi"],
    repoUrl: "https://github.com/leshz/mercadopago-strapi",
    featured: true,
    category: "Open Source",
  },
  {
    slug: "sagrada-cura",
    name: "Sagrada Cura",
    description:
      "A digital platform dedicated to helping you find the perfect balance in your daily life. A space where wellness, spirituality, and self-care meet. Full e-commerce with payments, SEO optimization, and a Strapi headless CMS.",
    stack: ["TypeScript", "Next.js 15", "MercadoPago SDK", "Strapi"],
    repoUrl: "https://github.com/leshz/sagrada-cura",
    liveUrl: "https://sagradacura.com",
    featured: true,
    category: "E-commerce",
  },
  {
    slug: "mac-os-setup",
    name: "mac-os-setup",
    description:
      "Automated script to set up a Mac from scratch. Perfect for when you format your computer or switch to a new Mac.",
    stack: ["Shell", "Zsh", "Bash"],
    repoUrl: "https://github.com/leshz/mac-os-setup",
    featured: false,
    category: "Tooling",
  },
] as const satisfies Project[];
