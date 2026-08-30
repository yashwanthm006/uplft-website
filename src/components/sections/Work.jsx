import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import useTilt from "../../hooks/useTilt.js";
import { WORK_ITEMS } from "../../data/work.js";

function WorkCard({ item, delay }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(6);
  return (
    <Reveal className="work-card-wrap" delay={delay}>
      <div
        className={`work-card ${item.dark ? "work-card--light" : ""}`}
        style={{ background: item.gradient }}
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
       
      >
        <span className="work-tag">{item.tag}</span>
        <div className="work-icon"><i className={`fa-solid ${item.icon}`}></i></div>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="container">
        <Reveal className="section-head">
          <SectionTag>What We Create</SectionTag>
          <h2>The Kind of Work We Do Best</h2>
          <p>A sample of the content types every UPLFT package is built around.</p>
        </Reveal>

        <div className="work-grid">
          {WORK_ITEMS.map((item, i) => (
            <WorkCard item={item} key={item.name} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
