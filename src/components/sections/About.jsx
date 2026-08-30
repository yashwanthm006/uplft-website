import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import MagneticButton from "../ui/MagneticButton.jsx";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about-inner">
        <Reveal className="about-visual">
          <div className="about-card">
            <i className="fa-solid fa-arrow-trend-up"></i>
            <span>Built for brands moving fast</span>
          </div>
        </Reveal>

        <Reveal className="about-copy" delay={100}>
          <SectionTag>About UPLFT.co</SectionTag>
          <h2>A Bengaluru Creative Agency, Built for Brands Like Yours</h2>
          <p>
            UPLFT.co exists for one reason: most new brands don't lose because their product is
            weak — they lose because nobody knows they exist. We fix that with sharp branding,
            consistent content and social media management that actually moves the needle,
            not just the feed.
          </p>
          <p>
            No bloated retainers, no rotating account managers. Just one dedicated team that
            treats your brand's momentum like our own.
          </p>
          <MagneticButton as="a" href="#contact" className="btn btn-primary">
            Let's Talk Strategy <i className="fa-solid fa-arrow-right"></i>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
