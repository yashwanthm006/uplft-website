import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import { PRICING_TIERS, PRICING_FEATURES, PRICING_NOTE } from "../../data/pricing.js";

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <Reveal className="section-head">
          <SectionTag>Social Media Management Packages</SectionTag>
          <h2>Straightforward Pricing, No Surprises</h2>
          <p>Pick a package now, upgrade any time as your brand grows.</p>
        </Reveal>

        <div className="pricing-grid">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal className="pricing-card" key={tier.name} delay={i * 90}>
              <span className={`pricing-pill pricing-pill--${tier.badge}`}>
                {tier.name} {tier.icon && <i className={`fa-solid ${tier.icon}`}></i>}
              </span>
              <div className="pricing-amount">
                {tier.price}<span>{tier.period}</span>
              </div>

              <ul className="pricing-features">
                {PRICING_FEATURES.map((f) => {
                  const value = tier.values[f.id];
                  const included = Boolean(value);
                  return (
                    <li key={f.id} className={included ? "included" : "excluded"}>
                      <i className={`fa-solid ${included ? "fa-circle-check" : "fa-circle-xmark"}`}></i>
                      <span>{included ? value : f.offLabel}</span>
                    </li>
                  );
                })}
              </ul>

              <a href="#contact" className="btn btn-outline btn-full">
                Get Custom Quote
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="pricing-note">
          <i className="fa-solid fa-circle-info"></i> {PRICING_NOTE}
        </Reveal>
      </div>
    </section>
  );
}
