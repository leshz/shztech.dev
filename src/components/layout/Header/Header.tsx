"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle/ThemeToggle";
import { site } from "@/data/site";
import styles from "./Header.module.css";

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * `/` is only active on an exact match; every other link is also active on
 * its own sub-paths (e.g. `/blog` stays active on `/blog/some-post`).
 */
function isLinkActive(href: string, pathname: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Close the mobile panel on route change. `pathname` is read only to
  // retrigger the effect on navigation, not inside the body.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is an intentional re-trigger, not a used value.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Dismiss with Escape while the mobile panel is open.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {site.shortName}
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.navLink}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            type="button"
            className={styles.menuTrigger}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        className={styles.mobilePanel}
        data-open={menuOpen}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <ul className={styles.mobileList}>
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href, pathname);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
