import { useEffect, useState } from "react";
import { COMPANY } from "../../data/company.js";

export default function StickyActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function onScroll() { setShow(window.scrollY > 500); }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky-actions">
      <a href={`https://wa.me/${COMPANY.phoneRaw}`} className="sticky-btn whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <a href={`tel:${COMPANY.phoneRaw}`} className="sticky-btn call" aria-label="Call">
        <i className="fa-solid fa-phone"></i>
      </a>
      <button
        className={`sticky-btn top ${show ? "show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
       
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}
