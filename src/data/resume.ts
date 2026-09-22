// Experience, education and languages, as shown on the resume page.
// Sourced from the CV (Jeff_Barragan_CV_2026). Metrics are real — do not
// round them up, and do not add a figure the CV does not state.

export type ExperienceItem = {
  readonly company: string;
  /** Sub-brand or client, when the work sat inside a larger org. */
  readonly division?: string;
  readonly role: string;
  /** Human-readable range, e.g. "Nov 2022 — Present". */
  readonly period: string;
  readonly location: string;
  /** One or two sentences of context about the organisation. */
  readonly context: string;
  /** Concrete achievements. Keep the numbers the CV states. */
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly current: boolean;
};

export type EducationItem = {
  readonly institution: string;
  readonly degree: string;
  readonly period: string;
  readonly detail?: string;
};

export type LanguageItem = {
  readonly language: string;
  /** Full label, for the resume page. */
  readonly level: string;
  /** Compact label, for tight spots like the About info list. */
  readonly shortLevel: string;
};

/**
 * The four most recent roles, in reverse-chronological order.
 *
 * Earlier positions (Indra/Tigo 2017–2019, PMK/Claro 2016–2017, Digital Andes
 * 2015) are deliberately not listed here: they are on the CV, and the site
 * stays focused on recent, relevant work. `earlierExperience` below carries a
 * one-line summary so the timeline does not appear to start in 2020.
 */
export const experience = [
  {
    company: "Mercado Libre",
    division: "Mercado Pago",
    role: "Senior Software Engineer",
    period: "Nov 2022 — Present",
    location: "Bogotá, Colombia",
    context:
      "Latin America's largest e-commerce and fintech platform, operating across 18+ countries. Embedded in the Mercado Pago fintech vertical, building crypto products at scale.",
    highlights: [
      "Leads frontend development across a suite of 5 interconnected crypto applications covering the full P2P buy, sell and hold flow for multiple digital assets — including MeliDólar, MeLi's USD-backed stablecoin with 65M+ USD in circulation.",
      "Led the fragmentation of the Product Detail Page, MeLi's highest-traffic view, extracting shared UI components into a reusable library inside a monorepo shared by ~1,000 engineers. Reduced bundle size by ~35% and CI pipeline execution by 25%, with full test coverage and zero regressions.",
      "Built a component and shared utility library adopted by the Demand team, MeLi's largest IT division, standardising frontend patterns across microservices serving 18+ countries.",
      "Contributed to the technical integration of MeLi's official Apple Store seller channel, a cross-functional initiative that drove a 45% increase in official seller sales volume.",
      "Structured the technical onboarding for the crypto area and built mentorship and growth plans to close skill gaps across the team.",
    ],
    stack: [
      "React 19",
      "TypeScript (strict)",
      "Nordic",
      "Andes Design System",
      "Node.js",
      "Turborepo",
      "Rollup",
      "Vitest",
      "Playwright",
      "DataDog",
    ],
    current: true,
  },
  {
    company: "Independent",
    role: "Freelance Full-Stack Developer",
    period: "2018 — Present",
    location: "Colombia (Remote)",
    context:
      "20+ projects across e-commerce, content platforms and digital marketing for clients in Colombia and Latin America.",
    highlights: [
      "Built headless e-commerce solutions connecting Strapi CMS, including custom plugin development, to Next.js storefronts — giving non-technical teams full editorial control.",
      "Wrote custom WordPress plugins for specific client business logic, extending the platform beyond its out-of-the-box capabilities.",
      "Designed and shipped custom WordPress themes from mockup to production: pixel-perfect, responsive and cross-browser.",
      "Ran technical SEO for e-commerce clients — indexation, on-page structure and metadata — for measurable gains in qualified traffic and conversions.",
    ],
    stack: ["Next.js", "Strapi", "WordPress", "PHP", "TypeScript", "SEO"],
    current: true,
  },
  {
    company: "Globant",
    role: "Web UI Senior Engineer",
    period: "Aug 2020 — Nov 2022",
    location: "Bogotá, Colombia",
    context:
      "Global digital transformation firm serving Fortune 500 companies. Two high-impact client engagements, in fintech and OTT media.",
    highlights: [
      "NERA (Banco Galicia) — acted as de facto Technical Lead for a 6-engineer frontend team on the MVP of Argentina's largest bank's agri-finance platform, running sprint ceremonies, code review as approver and architecture decisions. Delivered on schedule; the platform has since grown to USD 1.2B+ in financing operations, 12,000+ registered producers, and a joint venture with Santander across Argentina, Paraguay and Uruguay.",
      "Defined NERA's frontend architecture for credit and financing workflows, handling multi-product structures — credits in pesos, USD and grain tokens — under high reliability requirements.",
      "DTV GO (DirecTV Latin America) — solved a critical integration problem in the OTT subscriber self-care app, where every vendor and add-on carried an incompatible data schema.",
      "Introduced an Adapter pattern to normalise divergent vendor schemas, so new subscription plans could be added without breaking existing flows.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vue.js",
      "Redux Sagas",
      "GraphQL",
      "Jest",
      "Webpack",
      "CircleCI",
    ],
    current: false,
  },
  {
    company: "Booklick",
    role: "Full-Stack Engineer",
    period: "Feb 2020 — Aug 2020",
    location: "Bogotá, Colombia",
    context:
      "EdTech startup — a Netflix-like experience for university knowledge, sharing content across ~20 Colombian universities including Universidad de Los Andes and Universidad Nacional.",
    highlights: [
      "Engineered the push notification system with Firebase Cloud Messaging and AWS Lambda, delivering real-time alerts across the university network.",
      "Built and maintained the Node.js/Express REST API for content discovery and cross-institutional sharing, in a 3-engineer team.",
      "Architected and deployed the AWS infrastructure (EC2, S3, Lambda), ensuring reliability and environment parity.",
    ],
    stack: ["Node.js", "Express", "AWS", "Firebase Cloud Messaging"],
    current: false,
  },
] as const satisfies readonly ExperienceItem[];

/**
 * Roles before 2020, summarised rather than listed. Keeps the timeline honest
 * about where the 8+ years come from without turning the page into the CV.
 */
export const earlierExperience =
  "Earlier roles (2015 — 2019) at Indra in-house at Tigo, PMK in-house at Claro Colombia, and Digital Andes — telecom payment platforms, a jQuery-to-ES6+ migration, a Drupal 7→8 corporate migration, and 40+ client sites and interactive training modules.";

export const education = [
  {
    institution: "Universidad Piloto de Colombia",
    degree: "B.S. Software Engineering",
    period: "2010 — 2016",
  },
  {
    institution: "Platzi",
    degree: "Technical Master Program",
    period: "2020 — Present",
    detail:
      "60+ courses: React, TypeScript, Vue, Angular, CI/CD, NoSQL, GraphQL, performance, cloud architecture, testing and TDD.",
  },
] as const satisfies readonly EducationItem[];

export const languages = [
  { language: "Spanish", level: "Native", shortLevel: "Native" },
  {
    language: "English",
    level: "Professional working proficiency (C1)",
    shortLevel: "C1",
  },
] as const satisfies readonly LanguageItem[];

// Summary stats surfaced on the about/resume page.
export const yearsOfExperience = 8;
export const experienceSummary =
  "8+ years building high-scale web products alongside world-class engineering teams.";
