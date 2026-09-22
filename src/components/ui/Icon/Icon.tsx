import {
  ArrowRight,
  ArrowUp,
  Book,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Cloud,
  Database,
  ExternalLink,
  FileText,
  Image,
  Images,
  Layers,
  LifeBuoy,
  Link as LinkIcon,
  Mail,
  MapPin,
  Menu,
  Moon,
  Mouse,
  Music,
  Plus,
  Rss,
  Search,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  Tag,
  Terminal,
  Video,
  X,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/**
 * lucide-react removed brand/logo icons in recent major versions. For the
 * few brand marks the original template used, we hand-author minimal
 * inline SVGs here instead of importing a nonexistent lucide export.
 */
type BrandIconProps = SVGProps<SVGSVGElement> & {
  strokeWidth?: number;
  /**
   * Lucide accepts `size`; a raw <svg> does not — it needs width/height, and
   * without them it falls back to its default (~39px) and blows out of its
   * container. `brandSize()` below translates `size` for these components, so
   * every icon honours the same prop regardless of its origin.
   */
  size?: number | undefined;
};

/** Translate lucide's `size` prop into the width/height a raw <svg> needs. */
function brandSize({ size, ...rest }: BrandIconProps): SVGProps<SVGSVGElement> {
  return size === undefined ? rest : { ...rest, width: size, height: size };
}

function BrandTwitter(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...brandSize(props)}
    >
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.14 12.14 0 0 1 3.15 4.9a4.28 4.28 0 0 0 1.32 5.71c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22.46 6Z" />
    </svg>
  );
}

function BrandInstagram(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...brandSize(props)}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function BrandHtml5(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...brandSize(props)}
    >
      <path d="M3.6 2h16.8l-1.53 17.24L12 21.99l-6.87-2.75L3.6 2Zm13.89 4.5H7.34l.17 2h9.79l-.57 6.4-4.72 1.5v.01h-.02l-4.73-1.5-.32-3.62h1.99l.16 1.83 2.9.92v.01h.02l2.9-.92.3-3.32H6.65l-.54-6.31h11.78l-.4 4.5Z" />
    </svg>
  );
}

function BrandGithub(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...brandSize(props)}
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.35 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.34 9.34 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A9.98 9.98 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function BrandDribbble(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...brandSize(props)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72M19.47 8.34C15.38 9.75 8.6 10.5 3.36 10.5M17.6 21.44c-.94-3.42-3.5-8.6-7.88-13.44" />
    </svg>
  );
}

function BrandChrome(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...brandSize(props)}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  );
}

function BrandLinkedin(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...brandSize(props)}
    >
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.5V23h-4.5V8.25ZM8.5 8.25h4.31v2.02h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.85V23h-4.5v-6.86c0-1.63-.03-3.73-2.27-3.73-2.27 0-2.62 1.77-2.62 3.6V23h-4.5V8.25Z" />
    </svg>
  );
}

const brandIconMap = {
  twitter: BrandTwitter,
  instagram: BrandInstagram,
  html5: BrandHtml5,
  github: BrandGithub,
  dribbble: BrandDribbble,
  chrome: BrandChrome,
  linkedin: BrandLinkedin,
} as const;

const lucideIconMap = {
  link: LinkIcon,
  mouse: Mouse,
  works: Briefcase,
  portfolio: Briefcase,
  resume: FileText,
  plus: Plus,
  images: Images,
  image: Image,
  blog: Rss,
  contact: Mail,
  video: Video,
  music: Music,
  tablet: Tablet,
  search: Search,
  location: MapPin,
  book: Book,
  support: LifeBuoy,
  email: Mail,
  code: Terminal,
  phone: Smartphone,
  external: ExternalLink,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  close: X,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  calendar: Calendar,
  clock: Clock,
  tag: Tag,
  layers: Layers,
  cloud: Cloud,
  database: Database,
  terminal: Terminal,
  sparkles: Sparkles,
  check: Check,
  rss: Rss,
} as const;

const iconMap = {
  ...lucideIconMap,
  ...brandIconMap,
};

export type IconName = keyof typeof iconMap;

/**
 * Common prop shape every entry in `iconMap` accepts (both lucide's
 * `LucideIcon` and our hand-authored brand SVGs support these).
 */
type CommonIconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  /**
   * Admits an explicit `undefined` so a labelled icon can CLEAR the
   * `aria-hidden="true"` that the hand-authored brand SVGs hardcode. Under
   * `exactOptionalPropertyTypes` a plain `?: boolean` would reject that.
   */
  "aria-hidden"?: boolean | undefined;
  focusable?: boolean;
  "aria-label"?: string;
  role?: string;
};

/**
 * Optional props explicitly admit `undefined` because of
 * `exactOptionalPropertyTypes`: CSS Module class lookups are typed
 * `string | undefined`, so `className={styles.foo}` would otherwise be a type
 * error at every call site. Accepting `undefined` here keeps that ergonomic
 * without weakening the check elsewhere.
 */
export interface IconProps {
  name: IconName;
  size?: number | undefined;
  className?: string | undefined;
  "aria-label"?: string | undefined;
  strokeWidth?: number | undefined;
}

/**
 * Semantic icon indirection layer. Call sites reference icons by
 * semantic name (e.g. "resume", "github") rather than importing
 * lucide-react (or brand SVGs) directly.
 *
 * Decorative by default: without an `aria-label`, the icon is hidden
 * from assistive tech (`aria-hidden`, `focusable="false"`).
 */
export function Icon({
  name,
  size = 20,
  className,
  "aria-label": ariaLabel,
  strokeWidth,
}: IconProps) {
  const LookedUpIcon = iconMap[name];

  if (!LookedUpIcon) {
    throw new Error(`Icon: unknown icon name "${name}"`);
  }

  const IconComponent = LookedUpIcon as ComponentType<CommonIconProps>;
  const decorative = ariaLabel === undefined;

  const sharedProps: CommonIconProps = {
    size,
    ...(className !== undefined ? { className } : {}),
    ...(strokeWidth !== undefined ? { strokeWidth } : {}),
    /*
     * The labelled branch must actively clear `aria-hidden`, not merely omit
     * it: the hand-authored brand SVGs hardcode `aria-hidden="true"` in their
     * own JSX, and these props spread AFTER it. Omitting the key left both
     * `aria-hidden="true"` and `aria-label` on the element — aria-hidden wins,
     * so an icon-only link ended up with no accessible name at all.
     */
    ...(decorative
      ? { "aria-hidden": true, focusable: false }
      : { "aria-hidden": undefined, "aria-label": ariaLabel, role: "img" }),
  };

  return <IconComponent {...sharedProps} />;
}
