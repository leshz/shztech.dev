import type { EducationItem, ExperienceItem } from "@/data/resume";
import {
  earlierExperience,
  education,
  experience,
  languages,
} from "@/data/resume";
import section from "@/styles/section.module.css";
import styles from "./Resume.module.css";

/**
 * Resume section. Server component.
 *
 * Renders the reverse-chronological `experience` timeline, then an
 * `earlierExperience` summary paragraph, then Education and Languages.
 *
 * `division` and `detail` are optional fields. Under
 * `exactOptionalPropertyTypes`, they are read and rendered only behind an
 * `!== undefined` guard — never passed through as an explicit `undefined`.
 */
export function Resume() {
  return (
    <section id="resume" className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>Resume</h2>
        </div>

        <ol className={styles.timeline}>
          {experience.map((item: ExperienceItem) => (
            <li
              key={`${item.company}-${item.role}`}
              className={`${styles.item} ${item.current ? styles.itemCurrent : ""}`}
            >
              <div className={styles.header}>
                <h3 className={styles.role}>{item.role}</h3>
                <span className={styles.company}>
                  {item.company}
                  {item.division !== undefined ? ` · ${item.division}` : ""}
                </span>
                {item.current ? (
                  <span className={styles.currentBadge}>Current</span>
                ) : null}
              </div>

              <div className={styles.meta}>
                <span>{item.period}</span>
                <span className={styles.metaDivider} aria-hidden="true">
                  /
                </span>
                <span>{item.location}</span>
              </div>

              <p className={styles.context}>{item.context}</p>

              <ul className={styles.highlights}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <ul className={styles.stack}>
                {item.stack.map((tech) => (
                  <li key={tech} className={styles.tag}>
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <h3 className={styles.subheading}>Earlier</h3>
        <p className={styles.earlier}>{earlierExperience}</p>

        {/*
          Education renders only when there is real data, preserving the
          original guard now that `education` is populated.
        */}
        {education.length > 0 ? (
          <>
            <h3 className={styles.subheading}>Education</h3>
            <ul className={styles.blockList}>
              {education.map((item: EducationItem) => (
                <li
                  key={`${item.institution}-${item.degree}`}
                  className={styles.blockItem}
                >
                  <h4 className={styles.blockTitle}>{item.degree}</h4>
                  <div className={styles.blockMeta}>
                    <span>{item.institution}</span>
                    <span className={styles.metaDivider} aria-hidden="true">
                      /
                    </span>
                    <span>{item.period}</span>
                  </div>
                  {item.detail !== undefined ? (
                    <p className={styles.blockDetail}>{item.detail}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <h3 className={styles.subheading}>Languages</h3>
        <ul className={styles.languageList}>
          {languages.map((item) => (
            <li key={item.language} className={styles.languageItem}>
              {item.language}{" "}
              <span className={styles.languageLevel}>— {item.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
