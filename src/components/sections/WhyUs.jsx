import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import { WHY_ITEMS } from "../../data/process.js";

export default function WhyUs() {
  return (
    <section className="why-us">
      <div className="container">
        <Reveal className="section-head">
          <SectionTag>Our Promise</SectionTag>
          <h2>Why Brands Choose UPLFT</h2>
        </Reveal>

        <div className="why-grid">
          {WHY_ITEMS.map((item, i) => (
            <Reveal className="why-card" key={item.num} delay={i * 70}>
              <span className="why-num">{item.num}</span>
              <div className="why-icon"><i className={`fa-solid ${item.icon}`}></i></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
