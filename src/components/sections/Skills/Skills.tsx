import { SkillBar } from "@/components/ui/SkillBar/SkillBar";
import { skillGroups } from "@/data/skills";
import section from "@/styles/section.module.css";
import styles from "./Skills.module.css";

/**
 * Skills section. Server component.
 *
 * Renders every group from `skillGroups` as its own labelled list of skill
 * meters, laid out in a responsive multi-column grid reusing the section
 * primitive's `.grid2`/`.grid3` breakpoints.
 */
export function Skills() {
  return (
    <section id="skills" className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>Skills</h2>
        </div>

        <div className={`${section.grid} ${section.grid3} ${styles.groups}`}>
          {skillGroups.map((group) => (
            <div key={group.group} className={styles.group}>
              <h3 className={styles.groupName}>{group.group}</h3>
              <ul className={styles.list}>
                {group.skills.map((skill) => (
                  <li key={skill.name} className={styles.item}>
                    <SkillBar label={skill.name} level={skill.level} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
