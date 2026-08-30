// Layout — chrome that wraps every page (nav, header bar, footer, sticky CTAs).
import { useEffect, useState } from "react";
import TermsPage from "./components/pages/TermsPage.jsx";
import PrivacyPage from "./components/pages/PrivacyPage.jsx";
import Preloader from "./components/layout/Preloader.jsx";
import TopBar from "./components/layout/TopBar.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import StickyActions from "./components/layout/StickyActions.jsx";

// Sections — the actual page content, in on-page order.
import Hero from "./components/sections/Hero.jsx";
import Stats from "./components/sections/Stats.jsx";
import Services from "./components/sections/Services.jsx";
import Process from "./components/sections/Process.jsx";
import Capabilities from "./components/sections/Capabilities.jsx";
import WhyUs from "./components/sections/WhyUs.jsx";
import About from "./components/sections/About.jsx";
import Work from "./components/sections/Work.jsx";
import ServicesMarquee from "./components/sections/ServicesMarquee.jsx";
import Pricing from "./components/sections/Pricing.jsx";
import FAQ from "./components/sections/FAQ.jsx";
import CTABanner from "./components/sections/CTABanner.jsx";
import Contact from "./components/sections/Contact.jsx";

// Global UI — always mounted, overlays the whole page.
import ScrollProgress from "./components/ui/ScrollProgress.jsx";

export default function App() {
  // Simple hash-based page switch — no router needed. "#terms" swaps out
  // the whole marketing site for the standalone Terms & Conditions page,
  // giving it a real shareable URL (uplft.co/#terms) with zero server-side
  // routing config, since hash fragments never touch the server. Every
  // other hash (#pricing, #contact, etc.) is left alone — those still work
  // as plain in-page scroll anchors like before.
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    function onHashChange() { setHash(window.location.hash); }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#terms") {
    return <TermsPage />;
  }
  if (hash === "#privacy") {
    return <PrivacyPage />;
  }

  return (
    <>
      <ScrollProgress />
      <Preloader />
      <header className="site-header">
        <TopBar />
        <Navbar />
      </header>

      <Hero />
      <Stats />
      <Services />
      <Process />
      <Work />
      <ServicesMarquee />
      <Capabilities />
      <WhyUs />
      <About />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Contact />

      <Footer />
      <StickyActions />
    </>
  );
}
