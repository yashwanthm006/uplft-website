import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import { TESTIMONIALS } from "../../data/testimonials.js";

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <Reveal className="section-head">
          <SectionTag>Client Voices</SectionTag>
          <h2>What Founders Say About Working With Us</h2>
        </Reveal>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal className="testimonial-card" key={t.name} delay={i * 70}>
              <i className="fa-solid fa-quote-left quote-icon"></i>
              <p>{t.quote}</p>
              <div className="testimonial-author">
                <span className="avatar">{t.initials}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
