// Grouped skills with self-assessed proficiency levels (0-100).
// Levels are a personal estimate, not a certification — tune them here in
// one place as skills grow or fade. Core stack (TS/React/Node) sits highest.

export type Skill = {
  readonly name: string;
  readonly level: number;
};

export type SkillGroup = {
  readonly group: string;
  readonly skills: readonly Skill[];
};

export const skillGroups = [
  {
    group: "Core",
    skills: [
      { name: "TypeScript", level: 95 },
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Node.js", level: 90 },
      { name: "JavaScript", level: 95 },
    ],
  },
  {
    group: "Frontend",
    skills: [
      { name: "Vue.js", level: 70 },
      { name: "Angular", level: 65 },
      { name: "TailwindCSS", level: 85 },
      { name: "SCSS", level: 80 },
    ],
  },
  {
    group: "Backend & CMS",
    skills: [
      { name: "Express", level: 80 },
      { name: "Strapi", level: 85 },
      { name: "WordPress", level: 65 },
      { name: "PHP", level: 60 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    group: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 70 },
      { name: "Docker", level: 75 },
      { name: "GitHub Actions", level: 75 },
    ],
  },
  {
    group: "Testing & Observability",
    skills: [
      { name: "Jest", level: 80 },
      { name: "Playwright", level: 70 },
      { name: "DataDog", level: 65 },
    ],
  },
  {
    group: "AI Tooling",
    skills: [
      { name: "Claude Code", level: 85 },
      { name: "n8n", level: 65 },
      { name: "Turborepo", level: 75 },
    ],
  },
] as const satisfies SkillGroup[];
