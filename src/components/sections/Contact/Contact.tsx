import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { site } from "@/data/site";
import section from "@/styles/section.module.css";
import styles from "./Contact.module.css";
import { ContactForm } from "./ContactForm";

const socialIconMap: Record<
  (typeof site.socials)[number]["platform"],
  IconName
> = {
  github: "github",
  linkedin: "linkedin",
  email: "email",
};

/**
 * Contact section. Server component — the client boundary is contained
 * entirely inside `ContactForm`, so the surrounding heading/intro/details
 * stay server-rendered.
 */
export function Contact() {
  return (
    <section id="contact" className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>Contact</h2>
        </div>

        <p className={`${section.lead} ${styles.intro}`}>{site.availability}</p>

        <div className={styles.grid}>
          <div className={styles.details}>
            <dl className={styles.infoList}>
              <div>
                <dt className={styles.infoTerm}>Email</dt>
                <dd className={styles.infoValue}>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className={styles.infoTerm}>Location</dt>
                <dd className={styles.infoValue}>{site.location}</dd>
              </div>
            </dl>

            <ul className={styles.socials}>
              {site.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    className={styles.socialLink}
                    target={social.platform === "email" ? undefined : "_blank"}
                    rel={
                      social.platform === "email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                  >
                    <Icon
                      name={socialIconMap[social.platform]}
                      aria-label={social.label}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
