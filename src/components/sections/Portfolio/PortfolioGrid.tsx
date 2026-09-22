"use client";

import type { CSSProperties } from "react";
import styles from "./PortfolioGrid.module.css";
import { ProjectCard } from "./ProjectCard";
import { usePortfolioFilter } from "./usePortfolioFilter";

/**
 * Filter bar + responsive project grid.
 *
 * This is the client boundary for the Portfolio section: it is the only part
 * that needs state. The section wrapper and the cards stay presentational.
 *
 * What replaced isotope-layout:
 *  - Layout: `grid-template-columns: repeat(auto-fill, minmax(...))`. The
 *    browser decides the column count from the available width; there is no
 *    JS measurement, no absolute positioning, and nothing to re-arrange on
 *    resize.
 *  - Filtering: the ARRAY is narrowed before render, so non-matching cards
 *    leave the DOM (and the a11y tree) entirely rather than being hidden with
 *    `display: none`.
 */
export function PortfolioGrid() {
  const { activeFilter, setActiveFilter, filteredProjects, options } =
    usePortfolioFilter();

  const count = filteredProjects.length;

  return (
    <div className={styles.wrap}>
      {/*
        Group + accessible label: without it, a screen reader meets a bare row
        of buttons with no indication of what they filter.

        A native `<fieldset>` rather than `role="group"` on a div — it exposes
        the same `group` role without an explicit ARIA role (which is what
        Biome's `a11y/useSemanticElements` asks for), and it is valid outside a
        form. The `<legend>` is the accessible name, visually hidden because
        the heading above already says "Work"; `aria-label` on the fieldset
        would be ignored by some AT pairings, a legend never is.
      */}
      <fieldset className={styles.filters}>
        <legend className={styles.filtersLegend}>
          Filter projects by category
        </legend>
        {options.map((option) => {
          const isActive = option === activeFilter;
          const filterClassName = [
            styles.filter,
            isActive ? styles.filterActive : undefined,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              className={filterClassName}
              onClick={() => setActiveFilter(option)}
            >
              {option}
            </button>
          );
        })}
      </fieldset>

      {/* Polite live region: the visual result is obvious to a sighted user
          but silent otherwise, so announce the new count on every change. */}
      <p aria-live="polite" className={styles.count}>
        {count === 1 ? "1 project" : `${count} projects`}
      </p>

      {/*
        Keying the list on the active filter remounts the children when the
        filter changes, which restarts the CSS entry animation. The CARDS
        still use the stable `slug` as their key — an index key plus filtering
        makes React reuse the wrong DOM node for a different project.
      */}
      <ul key={activeFilter} className={styles.grid}>
        {filteredProjects.map((project, index) => (
          <li
            key={project.slug}
            className={styles.cell}
            /* Stagger: a CSS custom property is the only per-item value here;
               no colour or font-size literal is involved. */
            style={{ "--card-index": index } as CSSProperties}
          >
            <ProjectCard project={project} className={styles.card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
