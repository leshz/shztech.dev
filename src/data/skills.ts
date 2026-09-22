// Skill groups, sourced from the CV's Core Skills section.
//
// Levels are a self-assessment on a 0-100 scale, used only to size the bars.
// They are deliberately coarse: 90+ is a daily working specialty, 75-85 is
// production-comfortable, 60-70 is working knowledge. Tune them here — every
// bar on the site reads from this file.

export type Skill = {
  readonly name: string;
  readonly level: number;
};

export type SkillGroup = {
  readonly name: string;
  readonly skills: readonly Skill[];
};

export const skillGroups = [
  {
    name: "Frontend",
    skills: [
      { name: "React 19", level: 95 },
      { name: "TypeScript (strict)", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript (ES2023+)", level: 95 },
      { name: "Vue.js", level: 70 },
      { name: "Angular", level: 65 },
      { name: "SCSS", level: 85 },
      { name: "TailwindCSS", level: 80 },
    ],
  },
  {
    name: "State & Data",
    skills: [
      { name: "Redux / Redux Sagas", level: 85 },
      { name: "React Query", level: 85 },
      { name: "Zustand", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "REST API", level: 90 },
    ],
  },
  {
    name: "Backend & CMS",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "Strapi (custom plugins)", level: 85 },
      { name: "WordPress (themes & plugins)", level: 80 },
      { name: "PHP", level: 70 },
      { name: "Python", level: 60 },
    ],
  },
  {
    name: "Testing",
    skills: [
      { name: "Jest", level: 90 },
      { name: "Vitest", level: 85 },
      { name: "React Testing Library", level: 90 },
      { name: "Playwright", level: 80 },
      { name: "Cypress", level: 70 },
    ],
  },
  {
    name: "Architecture & Tooling",
    skills: [
      { name: "Monorepos (Turborepo, Lerna)", level: 85 },
      { name: "Design Systems", level: 90 },
      { name: "Micro-frontends", level: 80 },
      { name: "Clean architecture", level: 85 },
      { name: "Webpack 5 / Rollup", level: 80 },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3, Lambda, Route53)", level: 75 },
      { name: "Docker", level: 75 },
      { name: "GitHub Actions", level: 80 },
      { name: "CircleCI", level: 70 },
      { name: "GCP (App Engine)", level: 60 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Redis", level: 70 },
      { name: "DynamoDB", level: 65 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    name: "SEO & Observability",
    skills: [
      { name: "Technical SEO", level: 85 },
      { name: "Core Web Vitals", level: 85 },
      { name: "DataDog", level: 75 },
      { name: "New Relic", level: 70 },
      { name: "Grafana", level: 70 },
    ],
  },
  {
    name: "AI Tooling",
    skills: [
      { name: "Claude Code (SDD)", level: 90 },
      { name: "n8n (workflow automation)", level: 75 },
      { name: "Autonomous agents", level: 70 },
    ],
  },
] as const satisfies readonly SkillGroup[];
