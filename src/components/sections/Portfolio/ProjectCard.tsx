import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

export interface ProjectCardProps {
  readonly project: Project;
  /**
   * Optional extra class (the grid uses it for the entry animation).
   * Typed `| undefined` explicitly: with `exactOptionalPropertyTypes`, a bare
   * `className?: string` rejects a CSS-module lookup, which is
   * `string | undefined`.
   */
  readonly className?: string | undefined;
}

/**
 * One portfolio card. Purely presentational — no state, no effects, so it
 * stays renderable on the server side of the tree.
 *
 * Deliberately NOT a single card-wide anchor: the card holds two distinct
 * destinations (live site, repository), and nesting two `<a>` elements inside
 * an outer `<a>` is invalid HTML and breaks keyboard/AT navigation. The hover
 * affordance is the card's own (border + lift), while the two links remain
 * separate, individually focusable targets. There is no lightbox and no
 * screenshot gallery by product decision.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const { name, description, stack, repoUrl, liveUrl, featured } = project;

  const cardClassName = [styles.card, className].filter(Boolean).join(" ");

  return (
    <article className={cardClassName}>
      <div className={styles.head}>
        <Icon name="code" size={18} className={styles.headIcon} />
        <h3 className={styles.name}>{name}</h3>
        {featured ? <span className={styles.featured}>Featured</span> : null}
      </div>

      <p className={styles.description}>{description}</p>

      {stack.length > 0 ? (
        <ul className={styles.stack}>
          {stack.map((tech) => (
            <li key={tech} className={styles.tag}>
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.actions}>
        {/*
          `liveUrl` is genuinely absent on some projects (the data omits the
          key rather than setting `undefined`). Rendering the link only when
          the value exists means we never emit a dead `href` or the literal
          string "undefined".
        */}
        {liveUrl !== undefined ? (
          <Button
            href={liveUrl}
            variant="fill"
            size="sm"
            icon="external"
            iconPosition="right"
            aria-label={`${name} — live site`}
          >
            Live
          </Button>
        ) : null}
        <Button
          href={repoUrl}
          variant="outline"
          size="sm"
          icon="github"
          iconPosition="right"
          aria-label={`${name} — source code on GitHub`}
        >
          Code
        </Button>
      </div>
    </article>
  );
}
