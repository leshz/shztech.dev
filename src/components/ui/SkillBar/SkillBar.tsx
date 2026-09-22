import type { CSSProperties } from "react";
import styles from "./SkillBar.module.css";

export interface SkillBarProps {
  label: string;
  /** 0-100. */
  level: number;
}

/**
 * Declarative skill meter. Replaces a source-template hack that used
 * `insertAdjacentHTML` in a loop to inject ten `<span>` "dot" elements per
 * bar and then read `clientWidth` to size them — imperative DOM mutation
 * bypassing React's tree. Here the fill width is driven entirely by a CSS
 * custom property set inline and consumed by the module stylesheet; no DOM
 * measurement, no manual node insertion.
 *
 * Server component: purely declarative markup, no client interactivity.
 */
export function SkillBar({ label, level }: SkillBarProps) {
  const clamped = Math.min(100, Math.max(0, level));

  // CSSProperties doesn't model custom properties, so a local cast is needed
  // to pass `--fill` through `style`. Scoped to this one call site only.
  const fillStyle = { "--fill": `${clamped}%` } as CSSProperties;

  return (
    <div className={styles.bar}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{clamped}%</span>
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements: native <meter> can't
          host the custom fill-bar visual (a track + separately styled fill
          div driven by --fill); role="meter" on a div with the standard
          aria-value* triple keeps the same accessible semantics. */}
      <div
        className={styles.track}
        role="meter"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.fill} style={fillStyle} />
      </div>
    </div>
  );
}
