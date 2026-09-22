# shztech.dev

Personal site and blog of **Jeffer Barragán** — Senior Full-Stack Engineer & Tech Lead, Crypto & Fintech.

Live at **[shztech.dev](https://shztech.dev)**.

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC, file-convention SEO, static export of the blog |
| Language | TypeScript (strict) | `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` |
| Styling | CSS Modules + CSS custom properties | Scoped styles, zero runtime, theming by token |
| Content | MDX via `@content-collections/*` | Zod-validated frontmatter — **bad frontmatter fails the build** |
| Theming | `next-themes` (`data-theme`) | No flash of wrong theme |
| Icons | `lucide-react` | Tree-shaken SVG, no icon webfont |
| Lint/format | Biome | One tool, one config |
| Email | Resend via Server Action | No client-side form JS |

## Getting started

```bash
pnpm install
pnpm dev
```

Node version is pinned in `.nvmrc` (24.17.0).

| Script | Does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (also validates all MDX frontmatter) |
| `pnpm start` | Serve the production build |
| `pnpm test` | Vitest run |
| `pnpm lint` | Biome check |
| `pnpm format` | Biome format --write |

### Environment

Copy `.env.example` to `.env.local`. Both variables are only needed by the
contact form; without them the form still validates input and returns a
"not configured yet" message rather than failing.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact-form mail via [Resend](https://resend.com/api-keys) |
| `CONTACT_FROM_EMAIL` | Verified sender address on a Resend-verified domain |

## Architecture

```
src/
├── app/                  # routes, sitemap.ts, robots.ts, opengraph-image.tsx
├── components/
│   ├── ui/               # primitives: Button, Icon, ThemeToggle, SkillBar
│   ├── layout/           # Header, Footer, Preloader
│   └── sections/         # page sections: Hero, About, Resume, Skills, …
├── content/blog/<slug>/  # index.mdx + colocated images
├── data/                 # real content as typed modules (site, resume, skills, projects)
├── lib/
│   ├── content/          # the content port — swap MDX for a CMS here, nowhere else
│   └── seo/              # metadata + JSON-LD builders
└── styles/               # tokens.css, reset.css, keyframes.css, section.module.css
```

Two deliberate seams:

- **`src/styles/tokens.css`** is the only place colors and type scales are defined. Changing the accent colour is one line; dark mode is a `[data-theme="dark"]` token override and needs no component CSS.
- **`src/lib/content/posts.ts`** is the only module that knows posts come from MDX on disk. Pages import from it, so moving to a CMS touches one file.

## Writing a post

Create a folder — that's the whole API:

```
src/content/blog/my-post/
├── index.mdx
└── cover.jpg        # colocated, optimized by next/image
```

```mdx
---
title: "Post title"
description: "Shown in listings, meta tags and OG images."
date: 2026-09-22
tags: [nextjs, typescript]
cover: ./cover.jpg
draft: false
---

Content here. Supports MDX, so React components work inline.
```

### Drafts

Set `draft: true` to keep a post in the repository and out of production. It stays fully editable — `pnpm dev` lists it and renders it at its real URL, so you can preview exactly what will ship — while production excludes it from **all five** surfaces:

| Surface | Draft in `pnpm dev` | Draft in production |
|---|---|---|
| `/blog` listing | visible | hidden |
| `/blog/<slug>` | 200 | **404** |
| `/blog/<slug>/opengraph-image` | 200 | **404** |
| `sitemap.xml` | — | absent |
| `rss.xml` | — | absent |

The rule is one predicate (`isPublished` in `src/lib/content/posts.ts`) and every consumer reads posts through that port, so there is no path that bypasses it. `src/lib/content/drafts.test.ts` pins the semantics — note that only `development` reveals drafts, so preview and staging builds behave like production.

Publishing is flipping one line to `draft: false`.

Frontmatter is validated with Zod at build time. A missing `title` or a malformed `date` **fails `pnpm build`** rather than shipping broken metadata — verified, not assumed:

```
$ pnpm build
Validation failed on src/content/blog/probe/index.mdx:
- date: Invalid ISO date
```

`src/lib/content/schema.test.ts` keeps that guarantee under test so a refactor cannot quietly remove it.

## Verified state

Measured against the production build (`pnpm build && pnpm start`), not dev mode:

| Check | Result |
|---|---|
| Lighthouse (mobile) | **100** accessibility · **100** best practices · **100** SEO · **100** agentic browsing, on `/`, `/resume`, `/portfolio`, `/blog/[slug]`, `/contact` |
| Console | Zero messages — no hydration errors |
| Layout | No horizontal overflow at a true 320px viewport |
| Tests | 15 passing |
| Types / lint | `tsc --noEmit` and `biome check` clean |

Accessibility notes worth keeping in mind when editing:

- **Never put a literal colour in a component.** `src/styles/tokens.css` holds every value. Use `--color-accent-text` for text on a page surface and `--color-accent` for fills and borders — the raw accent measures only 3.03:1 on white and fails WCAG AA as text.
- **`--color-on-accent` is the ink for text on an accent fill**, and is deliberately the same in both themes because the accent surfaces are.
- **A component that adds its own animation must add its own `prefers-reduced-motion` opt-out.** Biome forbids `!important`, so the global clamp in `reset.css` cannot override component animations.

## Attribution

The visual design of this site originated from **"Glitche"**, a commercial template by [bslthemes](https://themeforest.net/user/bslthemes) licensed via ThemeForest.

This repository contains **no template source**. The codebase is an independent implementation: TypeScript instead of JavaScript, CSS Modules with design tokens instead of ~12,300 lines of global CSS, a real MDX content layer instead of hardcoded markup, and a single set of routes with a runtime theme toggle instead of duplicated per-variant pages. The template's LESS, CSS, fonts, JSX, and demo assets are not redistributed here.

## License

Source code in this repository is © Jeffer Barragán. The underlying visual design remains subject to its ThemeForest license and is not licensed for redistribution.
