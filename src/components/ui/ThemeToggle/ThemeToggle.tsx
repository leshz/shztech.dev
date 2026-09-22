"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./ThemeToggle.module.css";

/**
 * Light/dark theme toggle. Renders a stable, same-dimension placeholder
 * until mounted so SSR output matches the client's first paint (next-themes
 * only knows the resolved theme after hydration) — this avoids both a
 * hydration mismatch and a layout shift.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={styles.placeholder} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      <Icon name={isDark ? "sun" : "moon"} size={18} />
    </button>
  );
}
