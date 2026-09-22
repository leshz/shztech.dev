import section from "@/styles/section.module.css";
import { PortfolioGrid } from "./PortfolioGrid";

/**
 * Portfolio ("Work") section.
 *
 * Server component: it composes the shared section primitive and renders the
 * grid. The `"use client"` boundary lives in `PortfolioGrid`, which is the
 * only piece that owns state — so the section shell, heading and this
 * module's imports never reach the client bundle.
 */
export function Portfolio() {
  return (
    <section id="portfolio" className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>Work</h2>
        </div>
        <PortfolioGrid />
      </div>
    </section>
  );
}
