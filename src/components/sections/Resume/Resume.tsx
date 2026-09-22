import { education, experience } from "@/data/resume";
import section from "@/styles/section.module.css";
import styles from "./Resume.module.css";

/**
 * Resume section. Server component.
 *
 * `ExperienceItem` (src/data/resume.ts) has no date/period field at all —
 * only `current: boolean` — so there is nothing optional to guard against
 * rendering "undefined" for; the period label is derived entirely from
 * `current`, never invented.
 *
 * `education` is an intentionally empty array (no real data available).
 * Rendered as a graceful empty state rather than fabricated entries.
 */
export function Resume() {
  return (
    <section id="resume" className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>Resume</h2>
        </div>

        <ol className={styles.timeline}>
          {experience.map((item) => (
            <li
              key={`${item.company}-${item.role}`}
              className={`${styles.item} ${item.current ? styles.itemCurrent : ""}`}
            >
              <div className={styles.header}>
                <h3 className={styles.role}>{item.role}</h3>
                <span className={styles.company}>{item.company}</span>
                <span className={styles.period}>
                  {item.current ? "Current" : "Past"}
                </span>
              </div>
              <p className={styles.summary}>{item.summary}</p>
            </li>
          ))}
        </ol>

        {education.length === 0 ? (
          <p className={styles.empty}>
            Education details are not published yet.
          </p>
        ) : (
          <ol className={styles.timeline}>
            {education.map((item) => (
              <li
                key={`${item.institution}-${item.degree}`}
                className={styles.item}
              >
                <div className={styles.header}>
                  <h3 className={styles.role}>{item.degree}</h3>
                  <span className={styles.company}>{item.institution}</span>
                </div>
                <p className={styles.summary}>{item.field}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
