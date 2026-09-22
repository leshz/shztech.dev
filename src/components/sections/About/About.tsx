import Image from "next/image";
import { yearsOfExperience } from "@/data/resume";
import { site } from "@/data/site";
import section from "@/styles/section.module.css";
import styles from "./About.module.css";

/**
 * About section. Server component.
 *
 * Portrait is served from `public/images/avatar.jpg` — a local asset rather
 * than a remote URL, so it needs no `images.remotePatterns` entry and cannot
 * break the build if an external host changes. Replace that file to change
 * the photo; no code change required.
 */
export function About() {
  return (
    <section id="about" className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>About</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.portraitWrap}>
            <Image
              src="/images/avatar.jpg"
              alt={site.name}
              fill
              sizes="(min-width: 40rem) 16rem, 60vw"
              className={styles.portrait}
            />
          </div>
          <div>
            <p className={styles.bio}>{site.bio}</p>
            <dl className={styles.infoList}>
              <div>
                <dt className={styles.infoTerm}>Location</dt>
                <dd className={styles.infoValue}>{site.location}</dd>
              </div>
              <div>
                <dt className={styles.infoTerm}>Email</dt>
                <dd className={styles.infoValue}>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className={styles.infoTerm}>Availability</dt>
                <dd className={styles.infoValue}>{site.availability}</dd>
              </div>
              <div>
                <dt className={styles.infoTerm}>Experience</dt>
                <dd className={styles.infoValue}>{yearsOfExperience}+ years</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
