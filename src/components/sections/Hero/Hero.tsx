import { Button } from "@/components/ui/Button/Button";
import { site } from "@/data/site";
import glitch from "@/styles/glitch.module.css";
import section from "@/styles/section.module.css";
import styles from "./Hero.module.css";

/**
 * Landing hero. Server component — no typewriter effect, no client JS.
 * `site.availability` is rendered as static text.
 */
export function Hero() {
  return (
    <section className={`${section.section} ${styles.hero}`}>
      <div className={`${section.content} ${styles.inner}`}>
        {/*
          `data-text` sits on the heading itself — the ::before/::after glitch
          layers read it via `content: attr(data-text)` and must share the
          text's own box to land on top of it. The real text stays in a child
          span, which is what keeps the accessible name to a single
          "Jeffer Barragán" despite Chrome exposing generated content.
        */}
        <h1
          className={`${section.display} ${glitch.glitchWrap}`}
          data-text={site.name}
        >
          <span className={glitch.glitchText}>{site.name}</span>
        </h1>
        <p className={styles.role}>
          {site.role} · <span className={styles.focus}>{site.focus}</span>
        </p>
        <p className={styles.availability}>{site.availability}</p>
        <div className={styles.ctas}>
          <Button href="/portfolio" variant="fill" icon="portfolio">
            View work
          </Button>
          <Button href="/contact" variant="outline" icon="contact">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
