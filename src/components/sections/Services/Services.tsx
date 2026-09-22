import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { services } from "@/data/services";
import section from "@/styles/section.module.css";
import styles from "./Services.module.css";

/**
 * `services.ts` stores each service's icon as a plain semantic string so
 * that data module stays UI-free (no lucide import there). This map is the
 * one place that translates those strings into the `Icon` component's
 * `IconName` union.
 *
 * Some source strings ("layout", "credit-card") have no dedicated icon in
 * `IconName` (lucide brand/glyph coverage in this project is intentionally
 * small — see Icon.tsx). Those are mapped to the closest semantic
 * equivalent already in the union rather than left unmapped.
 */
const serviceIconMap: Record<string, IconName> = {
  code: "code",
  layout: "layers",
  layers: "layers",
  "credit-card": "check",
  cloud: "cloud",
  sparkles: "sparkles",
};

/** Fallback for any icon string with no entry above, so an unrecognised
 * value never crashes the page — it just renders a generic glyph. */
const fallbackIcon: IconName = "sparkles";

function resolveIconName(icon: string): IconName {
  return serviceIconMap[icon] ?? fallbackIcon;
}

/**
 * Services section. Server component.
 *
 * Icons are decorative here — the card title already conveys the meaning —
 * so `Icon` is called without an `aria-label`, which is its default
 * decorative (`aria-hidden`) behaviour.
 */
export function Services() {
  return (
    <section id="services" className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>What I do</h2>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon name={resolveIconName(service.icon)} size={24} />
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
