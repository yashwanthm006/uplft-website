import { useState } from "react";
import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import { FAQ_ITEMS } from "../../data/faq.js";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="container faq-inner">
        <Reveal className="section-head">
          <SectionTag>FAQ</SectionTag>
          <h2>Questions, Answered</h2>
        </Reveal>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal className={`faq-item ${open === i ? "open" : ""}`} key={item.q} delay={i * 50}>
              <button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>
                {item.q}
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
