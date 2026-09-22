import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import styles from "./Button.module.css";

type Variant = "outline" | "fill";
type Size = "sm" | "md";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  children?: ReactNode;
}

type AnchorOnlyProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children" | "href"
>;

type ButtonOnlyProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>;

type ButtonAsButton = BaseProps &
  ButtonOnlyProps & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorOnlyProps & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return props.href !== undefined;
}

/**
 * React's DOM attribute types mark every optional prop as `T | undefined`
 * rather than omitting it, which trips `exactOptionalPropertyTypes` when
 * spread into a stricter-typed component (e.g. next/link's `LinkProps`).
 * Stripping undefined-valued keys at the spread boundary keeps the
 * runtime behavior identical while satisfying the stricter target type.
 */
type WithoutUndefinedValues<T> = { [K in keyof T]?: Exclude<T[K], undefined> };

function omitUndefined<T extends Record<string, unknown>>(
  obj: T,
): WithoutUndefinedValues<T> {
  const result: WithoutUndefinedValues<T> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const value = obj[key];
    if (value !== undefined) {
      result[key] = value as Exclude<T[keyof T], undefined>;
    }
  }
  return result;
}

export function Button(props: ButtonProps) {
  const {
    variant = "outline",
    size = "md",
    icon,
    iconPosition = "left",
    className,
    children,
  } = props;

  const classNames = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  const iconClassName = styles.icon ?? "";
  const iconElement = icon ? (
    <Icon name={icon} className={iconClassName} />
  ) : null;

  const content = (
    <>
      {iconPosition === "left" ? iconElement : null}
      {children}
      {iconPosition === "right" ? iconElement : null}
    </>
  );

  if (isLinkProps(props)) {
    const {
      href,
      variant: _variant,
      size: _size,
      icon: _icon,
      iconPosition: _iconPosition,
      className: _className,
      children: _children,
      ...anchorRest
    } = props;

    const isInternal = href.startsWith("/");
    const safeAnchorRest = omitUndefined(anchorRest);

    if (isInternal) {
      return (
        <Link href={href} className={classNames} {...safeAnchorRest}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
        {...safeAnchorRest}
      >
        {content}
      </a>
    );
  }

  const {
    href: _href,
    variant: _variant,
    size: _size,
    icon: _icon,
    iconPosition: _iconPosition,
    className: _className,
    children: _children,
    ...buttonRest
  } = props;

  return (
    <button type="button" className={classNames} {...buttonRest}>
      {content}
    </button>
  );
}
