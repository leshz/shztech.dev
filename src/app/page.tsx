import glitch from "@/styles/glitch.module.css";
import section from "@/styles/section.module.css";

const NAME = "Jeffer Barragán";

export default function Home() {
  return (
    <main className={section.section}>
      <div className={section.content}>
        <div className={section.title}>
          <h2 className={section.titleInner}>Home</h2>
        </div>
        <h1 className={`${section.display} ${glitch.glitch}`} data-text={NAME}>
          {NAME}
        </h1>
        <p className={section.lead}>
          Senior Full-Stack Engineer · Crypto &amp; Fintech
        </p>
      </div>
    </main>
  );
}
