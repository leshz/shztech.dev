// Experience and education, as shown on the resume/about page.
// Dates are omitted where not confirmed — do not invent them.

export type ExperienceItem = {
  readonly company: string;
  readonly role: string;
  readonly summary: string;
  readonly current: boolean;
};

export type EducationItem = {
  readonly institution: string;
  readonly degree: string;
  readonly field: string;
};

export const experience = [
  {
    company: "Mercado Pago",
    role: "Tech Lead, Frontend",
    summary:
      "Leads frontend development for a suite of crypto applications: P2P buy, sell, and hold across multiple digital assets. Mercado Pago is Mercado Libre's fintech arm.",
    current: true,
  },
  {
    company: "Mercado Libre",
    role: "Senior Full-Stack Engineer",
    summary: "Shipped products at regional scale across 18+ countries.",
    current: false,
  },
  {
    company: "NERA (Banco Galicia)",
    role: "Tech Lead",
    summary:
      "Led the MVP for an agri-finance platform, now at USD 1.2B+ in operations.",
    current: false,
  },
] as const satisfies ExperienceItem[];

// NOTE: education details were not provided by the owner. Do not fabricate
// a university or program — fill this in with real data when available.
export const education: readonly EducationItem[] = [];

// Summary stat surfaced on the about/resume page.
export const yearsOfExperience = 8;
export const experienceSummary =
  "8+ years building digital products used by millions.";
