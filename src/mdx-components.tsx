import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./mdx-components.module.css";

/**
 * Global MDX component overrides.
 *
 * Passed to `MDXContent` when rendering a post body. Three jobs:
 *  - images go through `next/image` so colocated post assets get optimised
 *  - links are internal-vs-external aware and safe by default
 *  - headings get anchor ids so a table of contents / deep links work
 */

/** `Some Title!` -> `some-title` */
function slugify(children: ReactNode): string {
  return String(children)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function Heading({
  as: Tag,
  children,
  ...props
}: {
  as: "h2" | "h3" | "h4";
  children?: ReactNode;
} & ComponentPropsWithoutRef<"h2">) {
  const id = props.id ?? slugify(children);

  return (
    <Tag {...props} id={id} className={styles.heading}>
      <a
        className={styles.anchor}
        href={`#${id}`}
        aria-label={`Link to ${String(children)}`}
      >
        #
      </a>
      {children}
    </Tag>
  );
}

function Anchor({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={styles.link}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={styles.link} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <Icon name="external" size={12} className={styles.externalIcon} />
    </a>
  );
}

function MdxImage(props: ImageProps) {
  return (
    <span className={styles.figure}>
      <Image
        {...props}
        alt={props.alt}
        sizes="(max-width: 768px) 100vw, 768px"
        className={styles.image}
      />
    </span>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => <Heading as="h2" {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <Heading as="h3" {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <Heading as="h4" {...props} />,
  a: Anchor,
  img: MdxImage as unknown as (
    props: ComponentPropsWithoutRef<"img">,
  ) => ReactNode,
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre {...props} className={styles.pre} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} className={styles.blockquote} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className={styles.tableWrap}>
      <table {...props} className={styles.table} />
    </div>
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className={styles.hr} />
  ),
};
