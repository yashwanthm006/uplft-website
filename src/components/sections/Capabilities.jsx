import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import { CAPABILITIES } from "../../data/process.js";

export default function Capabilities() {
  return (
    <section className="capabilities">
      <div className="container capabilities-inner">
        <Reveal className="capabilities-copy">
          <SectionTag>Our Capabilities</SectionTag>
          <h2>Strong Across Every Channel That Matters</h2>
          <p>
            We don't outsource pieces of your brand to five different vendors. One in-house
            team plans, shoots, posts and reports — so your content actually looks like one brand.
          </p>
        </Reveal>

        <div className="capability-tags">
          {CAPABILITIES.map((c, i) => (
            <Reveal className="capability-tag" key={c.label} delay={i * 60}>
              <i className={`fa-solid ${c.icon}`}></i>
              <span>{c.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
