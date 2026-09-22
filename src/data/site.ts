// Site-wide identity and configuration.
// Edit here to update name, role, bio, or social links across the whole site.

export type SocialPlatform = "github" | "linkedin" | "email";

export type SocialLink = {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly url: string;
};

export type SiteConfig = {
  readonly name: string;
  readonly shortName: string;
  readonly role: string;
  readonly focus: string;
  readonly email: string;
  readonly url: string;
  readonly location: string;
  readonly availability: string;
  readonly bio: string;
  readonly socials: readonly SocialLink[];
};

export const site = {
  name: "Jeffer Barragán",
  shortName: "Jeff Barragán",
  role: "Senior Full-Stack Engineer & Tech Lead",
  focus: "Crypto & Fintech",
  email: "me@shztech.dev",
  url: "https://shztech.dev",
  location: "Medellín, Colombia",
  availability: "Open to 100% remote roles — US · Europe · Canada",
  bio: "Senior full-stack engineer and tech lead with 8+ years building digital products used by millions of people. Currently leading frontend development for a suite of crypto applications at Mercado Pago, covering P2P buy, sell, and hold across multiple digital assets. Previously shipped products at regional scale across 18+ countries at Mercado Libre and led the MVP for an agri-finance platform at NERA (Banco Galicia) now processing over USD 1.2B in operations.",
  socials: [
    {
      platform: "github",
      label: "GitHub",
      url: "https://github.com/leshz",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jeffbarragan",
    },
    {
      platform: "email",
      label: "Email",
      url: "mailto:me@shztech.dev",
    },
  ],
} as const satisfies SiteConfig;

export type Site = typeof site;
