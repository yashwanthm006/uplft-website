import Reveal from "../ui/Reveal.jsx";
import MagneticButton from "../ui/MagneticButton.jsx";

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <Reveal className="container cta-inner">
        <h2>Got a Brand? Let's Get You Noticed.</h2>
        <p>Book a free strategy call and audit — we reply within 1 business hour on WhatsApp.</p>
        <MagneticButton as="a" href="#contact" className="btn btn-light btn-lg">
          Start Working With Us <i className="fa-solid fa-arrow-right"></i>
        </MagneticButton>
      </Reveal>
    </section>
  );
}
