import { useEffect, useState } from "react";
import MagneticButton from "../ui/MagneticButton.jsx";
import Marquee from "../ui/Marquee.jsx";
import useParallax from "../../hooks/useParallax.js";
import useTilt from "../../hooks/useTilt.js";
import { MARQUEE_WORDS } from "../../data/stats.js";
import { HERO_CARDS } from "../../data/showcase.js";

const ROTATING_WORDS = ["LAUNCH", "BRAND", "TREND", "GROW"];

// Wrapper handles position + the ambient floating animation (CSS keyframes);
// the inner card gets its own mouse-driven 3D tilt (see useTilt) so it looks
// like it's popping out of the screen on hover, without the two transforms
// fighting each other.
function HeroFloatCard({ card }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(14);
  return (
    <div className={`hero-float-card-wrap ${card.pos}`}>
      <div className="hero-float-card" ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <div className="hero-float-icon"><i className={`fa-solid ${card.icon}`}></i></div>
        <div>
          <span className="hero-float-value">{card.value}</span>
          <span className="hero-float-label">{card.label}</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const { layerRef, onMouseMove, onMouseLeave } = useParallax(24);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="home" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="hero-bg">
        <div className="parallax-layer" ref={layerRef}>
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        <div className="grain"></div>
      </div>

      <div className="hero-showcase">
        {HERO_CARDS.map((card) => (
          <HeroFloatCard card={card} key={card.label} />
        ))}
      </div>

      <div className="container hero-inner">
        <span className="hero-eyebrow"><i className="fa-solid fa-rocket"></i> New Business Launch Offers Open</span>

        <h1 className="hero-title">
          We Help Companies
          <span className="hero-rotator">
            {ROTATING_WORDS.map((w, i) => (
              <span key={w} className={`hero-rotator-word ${i === wordIndex ? "active" : ""}`}>{w}</span>
            ))}
          </span>
          <span className="block">On Social Media</span>
        </h1>

        <p className="hero-sub">
          UPLFT.co is a Bengaluru creative agency turning new brands into ones people actually
          follow — through branding, content, influencer collabs and disciplined social media management.
        </p>

        <div className="hero-actions">
          <MagneticButton as="a" href="#contact" className="btn btn-primary btn-lg">
            Start Your Growth Story <i className="fa-solid fa-arrow-right"></i>
          </MagneticButton>
          <MagneticButton as="a" href="#work" className="btn btn-outline btn-lg">
            <i className="fa-solid fa-play"></i> See What We Create
          </MagneticButton>
        </div>
      </div>

      <Marquee words={MARQUEE_WORDS} className="hero-marquee" />
    </section>
  );
}
