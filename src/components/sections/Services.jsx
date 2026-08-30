import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import useTilt from "../../hooks/useTilt.js";
import { SERVICES } from "../../data/services.js";

// Reveal handles the scroll-in fade/rise (needs its own ref for the
// IntersectionObserver); the inner card gets a separate ref for the
// mouse-tilt so the two don't collide — same pattern as the Work cards.
function ServiceCard({ s, delay }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8);
  return (
    <Reveal className="service-card-wrap" delay={delay}>
      <div className="service-card" ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <div className="service-icon"><i className={`fa-solid ${s.icon}`}></i></div>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal className="section-head">
          <SectionTag>What We Do</SectionTag>
          <h2>Everything a New Brand Needs to Get Noticed</h2>
          <p>From identity to influencers — one team, one calendar, one accountable partner.</p>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard s={s} key={s.title} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
