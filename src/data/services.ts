// Services/capabilities listed on the site.
// `icon` is a plain semantic string (not a lucide import) — a separate Icon
// component maps these names to actual icons, keeping this module UI-free.

export type Service = {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
};

export const services = [
  {
    icon: "code",
    title: "Full-Stack Product Development",
    description:
      "End-to-end delivery of production applications with React, Next.js, and Node.js — from data model to deployed UI, built for teams shipping at scale.",
  },
  {
    icon: "layout",
    title: "Frontend Architecture",
    description:
      "Design and structure of maintainable frontend systems — component architecture, state management, and performance-minded rendering patterns for complex products.",
  },
  {
    icon: "layers",
    title: "Headless Commerce & CMS Integration",
    description:
      "Strapi-based headless CMS setups and e-commerce integrations, connecting content and product data to fast, SEO-friendly storefronts.",
  },
  {
    icon: "credit-card",
    title: "Payments Integration",
    description:
      "Integration of payment providers such as MercadoPago into e-commerce and fintech flows, including plugin-level work for CMS platforms.",
  },
  {
    icon: "cloud",
    title: "Cloud & CI/CD",
    description:
      "Containerized deployments and automated pipelines with Docker, AWS, and GitHub Actions to keep releases fast and reliable.",
  },
  {
    icon: "sparkles",
    title: "AI-Assisted Development Workflows",
    description:
      "Practical adoption of AI tooling such as Claude Code and n8n into day-to-day engineering workflows to speed up delivery without sacrificing quality.",
  },
] as const satisfies Service[];
