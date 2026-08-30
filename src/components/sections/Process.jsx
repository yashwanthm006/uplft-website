import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import { PROCESS_STEPS } from "../../data/process.js";

export default function Process() {
  return (
    <section className="process">
      <div className="container">
        <Reveal className="section-head">
          <SectionTag>How We Work</SectionTag>
          <h2>A Simple, Disciplined Process</h2>
          <p>No guesswork — every step is built to move fast without breaking your brand.</p>
        </Reveal>

        <div className="process-grid">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal className="process-card" key={step.num} delay={i * 80}>
              <span className="process-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
