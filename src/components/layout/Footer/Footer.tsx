import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { type SocialPlatform, site } from "@/data/site";
import styles from "./Footer.module.css";

const SOCIAL_ICON: Record<SocialPlatform, IconName> = {
  github: "github",
  linkedin: "linkedin",
  email: "email",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.social}>
          {site.socials.map((social) => {
            const isExternal = !social.url.startsWith("mailto:");
            return (
              <a
                key={social.platform}
                href={social.url}
                aria-label={social.label}
                className={styles.socialLink}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon name={SOCIAL_ICON[social.platform]} />
              </a>
            );
          })}

          <Link
            href="/rss.xml"
            aria-label="RSS feed"
            className={styles.socialLink}
          >
            <Icon name="rss" />
          </Link>
        </div>

        <p className={styles.copyright}>
          © {year} {site.name}
        </p>

        <p className={styles.smallPrint}>Built with Next.js and TypeScript.</p>
      </div>
    </footer>
  );
}
