// Real projects shown on the portfolio/work page.
// To add a project: append an object below with a unique slug.
// `liveUrl` is optional — omit the key entirely when there's no live site
// (exactOptionalPropertyTypes forbids assigning `liveUrl: undefined`).

export type ProjectCategory =
  | "SaaS"
  | "Client Work"
  | "E-commerce"
  | "Open Source"
  | "Tooling";

export type Project = {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly stack: readonly string[];
  /**
   * Public repository. Optional: some work ships as a product with a private
   * codebase, and rendering a dead "Code" link would be worse than omitting it.
   */
  readonly repoUrl?: string;
  readonly liveUrl?: string;
  /**
   * Screenshot under `public/`, for projects where the live site is the thing
   * worth showing. Omit for repo-only projects.
   */
  readonly image?: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    /** Describes what the screenshot shows, for screen readers. */
    readonly alt: string;
  };
  readonly featured: boolean;
  readonly category: ProjectCategory;
};

/**
 * Fallback card image for source-only projects — a library, a plugin, a CLI —
 * where there is no page to screenshot. Without it those cards would be
 * noticeably shorter than the ones with a shot, leaving the grid uneven.
 */
const PLACEHOLDER_IMAGE = {
  src: "/images/projects/placeholder.svg",
  width: 1280,
  height: 720,
  alt: "Stylised terminal window, standing in for a project that ships as source rather than as a website.",
} as const;

export const projects = [
  {
    slug: "legal-hermes",
    name: "Legal Hermes",
    description:
      "SaaS that monitors court cases in Colombia's judicial branch and emails lawyers the moment a case changes — replacing a manual daily check with automated change detection and a full history of every modification found.",
    stack: ["TypeScript", "Next.js", "SaaS", "Automation"],
    liveUrl: "https://legalhermes.com",
    image: {
      src: "/images/projects/legalhermes.webp",
      width: 1280,
      height: 720,
      alt: "Legal Hermes landing page: the headline 'Nunca más pierda una actuación judicial' above a description of automated court-case monitoring, with request-a-demo and how-it-works buttons.",
    },
    featured: true,
    category: "SaaS",
  },
  {
    slug: "elisa-horta",
    name: "Elisa Horta",
    description:
      "Site for a Bogotá clinical psychologist with 36+ years in practice: appointment booking, an editorial blog, and content managed through Strapi so she can publish without a developer. Built from the evokare monorepo.",
    stack: ["TypeScript", "Next.js", "Strapi", "SEO"],
    repoUrl: "https://github.com/leshz/evokare",
    liveUrl: "https://elisahorta.com.co",
    image: {
      src: "/images/projects/elisahorta.webp",
      width: 1280,
      height: 720,
      alt: "Elisa Horta's site: the headline 'Reconectando con tu bienestar' over a violet gradient, beside a photo of two people holding hands, with buttons to book an appointment and read her story.",
    },
    featured: true,
    category: "Client Work",
  },
  {
    slug: "mercadopago-strapi",
    name: "mercadopago-strapi",
    description:
      "A powerful plugin for integrating MercadoPago with the Strapi CMS. Simplifies the integration process, allowing you to easily handle payments and manage products to create a lightweight e-commerce solution using MercadoPago's API.",
    stack: ["TypeScript", "Strapi"],
    repoUrl: "https://github.com/leshz/mercadopago-strapi",
    image: PLACEHOLDER_IMAGE,
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
    /*
     * No `liveUrl`: the domain now serves a farewell page, so linking it would
     * send visitors to a closing notice rather than the work. The screenshot
     * below is the storefront as it actually ran, recovered from the Internet
     * Archive (snapshot 2025-07-14) while the live site still existed.
     */
    image: {
      src: "/images/projects/sagradacura.webp",
      width: 1280,
      height: 720,
      alt: "Sagrada Cura storefront: a product photo of a cleansing spray against tree bark under the heading 'Terapias holísticas', beside a promotion for an energy-healing workshop.",
    },
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
    image: PLACEHOLDER_IMAGE,
    featured: false,
    category: "Tooling",
  },
] as const satisfies Project[];
