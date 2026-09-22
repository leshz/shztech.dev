import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
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
        <h1
          className={`${section.display} ${glitch.glitch}`}
          data-text={site.name}
        >
          {site.name}
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
      <span className={styles.scrollHint} aria-hidden="true">
        <Icon name="mouse" />
      </span>
    </section>
  );
}
