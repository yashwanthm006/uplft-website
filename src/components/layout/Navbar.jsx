import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../../data/nav.js";
import logoNav from "../../assets/uplft-logo-nav.png";
import MagneticButton from "../ui/MagneticButton.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
      let current = "home";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick() {
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#home" className="logo">
          <img src={logoNav} alt="UPLFT.co" className="logo-img" />
        </a>

        <div
          className={`nav-backdrop ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
              onClick={handleNavClick}

            >
              {item.label}
            </a>
          ))}
          {/* Not part of NAV_ITEMS/scroll-spy on purpose — this swaps to the
              standalone Terms page (see App.jsx's "#terms" hash check)
              rather than scrolling to a section on the home page. */}
          <a href="#terms" onClick={handleNavClick}>Terms &amp; Conditions</a>
          <a href="#contact" className="btn btn-primary nav-cta" onClick={handleNavClick}>
            Get Started <i className="fa-solid fa-arrow-right"></i>
          </a>
        </nav>

        <MagneticButton as="a" href="#contact" className="btn btn-primary nav-cta-desktop">
          Get Started <i className="fa-solid fa-arrow-right"></i>
        </MagneticButton>

        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
