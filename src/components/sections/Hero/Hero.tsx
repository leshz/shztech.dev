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
          The glitch layers are ::before/::after with `content: attr(data-text)`.
          Chrome exposes CSS-generated content to the accessibility tree, so the
          heading was announced three times ("Jeffer Barragán" ×3). Carrying
          data-text on an aria-hidden decorative span, with the real text in its
          own span, keeps the effect and leaves one accessible name.
        */}
        <h1 className={section.display}>
          <span
            className={glitch.glitchLayers}
            data-text={site.name}
            aria-hidden="true"
          />
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
