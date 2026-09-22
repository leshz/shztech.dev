"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { projects } from "@/data/projects";

/**
 * The "show everything" pseudo-option. Kept as a distinct literal rather than
 * `null` so the filter bar can render one homogeneous list of string options
 * and compare with `===`.
 */
export const ALL_FILTER = "All" as const;

export type PortfolioFilter = typeof ALL_FILTER | ProjectCategory;

export interface UsePortfolioFilterResult {
  /** Currently applied filter. */
  readonly activeFilter: PortfolioFilter;
  /** Applies a filter. */
  readonly setActiveFilter: (filter: PortfolioFilter) => void;
  /** Projects matching `activeFilter`, already filtered — not hidden. */
  readonly filteredProjects: readonly Project[];
  /** `"All"` followed by every category present in the data, first-seen order. */
  readonly options: readonly PortfolioFilter[];
}

/**
 * Derives the filter options from the data itself. Hardcoding the category
 * list would silently drift the moment a project with a new category is
 * appended to `src/data/projects.ts`; reading them off the data cannot.
 *
 * Order is "first appearance in the source array", which is stable across
 * renders and deterministic between server and client (unlike `.sort()` on a
 * locale-sensitive comparison). A `Set` de-duplicates while preserving that
 * insertion order.
 */
function deriveOptions(source: readonly Project[]): readonly PortfolioFilter[] {
  const categories = new Set<ProjectCategory>();
  for (const project of source) {
    categories.add(project.category);
  }
  return [ALL_FILTER, ...categories];
}

/**
 * Owns the portfolio's filter state. This is the container half of the
 * container/presentational split: `PortfolioGrid` and `ProjectCard` stay
 * presentational and receive plain data.
 *
 * Replaces isotope-layout's `.arrange({ filter })` call: instead of letting a
 * library absolutely-position and show/hide DOM nodes React owns, we narrow
 * the array and let React reconcile. No DOM measurement, no imperative
 * instance to destroy on unmount, so React 19 Strict Mode's double-invoke is
 * a non-event here.
 */
export function usePortfolioFilter(
  source: readonly Project[] = projects,
): UsePortfolioFilterResult {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>(ALL_FILTER);

  const options = useMemo(() => deriveOptions(source), [source]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === ALL_FILTER) {
      return source;
    }
    return source.filter((project) => project.category === activeFilter);
  }, [source, activeFilter]);

  return { activeFilter, setActiveFilter, filteredProjects, options };
}
