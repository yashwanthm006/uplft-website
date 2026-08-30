import { useState } from "react";
import emailjs from "@emailjs/browser";
import { COMPANY, SOCIALS, EMAILJS_CONFIG } from "../../data/company.js";
import logoNav from "../../assets/uplft-logo-nav.png";
import { isValidEmail, isRateLimited, markSubmitted } from "../../utils/formSecurity.js";

const RATE_LIMIT_KEY = "uplft_footer_last_submit";
const RATE_LIMIT_MS = 30000; // 30s cooldown between real submissions
const MIN_FILL_MS = 1500; // this form is one field, so a shorter floor than the contact form

// No reCAPTCHA on this form by design (client's call — low-stakes "email me
// the info pack" form). It still keeps the honeypot, timing check and rate
// limit below. Server-side reCAPTCHA verification is also switched off on
// the "Get Details Info Pack" EmailJS template to match.
export default function Footer() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | blocked
  const [email, setEmail] = useState("");
  // Honeypot: invisible to real visitors, bots that auto-fill every field
  // will fill it. We quietly no-op instead of sending anything.
  const [trap, setTrap] = useState("");
  const formOpenedAt = useState(() => Date.now())[0];

  async function handleSubscribe(e) {
    e.preventDefault();

    // Only a filled-in field submitted implausibly fast counts as a bot
    // signal — an empty click should just fall through to the real "enter
    // a valid email" validation below, not a fake success.
    const filledInstantly = email.trim() !== "" && Date.now() - formOpenedAt < MIN_FILL_MS;
    if (trap.trim() !== "" || filledInstantly) {
      setStatus("sent");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    if (isRateLimited(RATE_LIMIT_KEY, RATE_LIMIT_MS)) {
      setStatus("blocked");
      return;
    }

    const cleanEmail = email.trim().slice(0, 254);
    if (!isValidEmail(cleanEmail)) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      // Sends the branded info-pack email straight to whatever address the
      // visitor typed — the destination is the {{to_email}} variable, not a
      // fixed inbox. Uses a separate EmailJS template from the contact form,
      // so this never touches that flow.
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.detailsTemplateId,
        { to_email: cleanEmail },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      if (result.status === 200) {
        markSubmitted(RATE_LIMIT_KEY);
        setStatus("sent");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="logo">
            <img src={logoNav} alt="UPLFT.co" className="logo-img" />
          </a>
          <p>A Bengaluru-based creative agency helping companies launch, brand and grow through content, social and influencer marketing.</p>
          <div className="social-row">
            {SOCIALS.map((s) => (
              <a href={s.href} key={s.label} aria-label={s.label} target="_blank" rel="noopener noreferrer"><i className={`fa-brands ${s.icon}`}></i></a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <a href="#services">Branding &amp; Identity</a>
          <a href="#services">Content Creation</a>
          <a href="#services">Social Media Management</a>
          <a href="#services">Influencer Marketing</a>
          <a href="#services">Performance &amp; GMB Ads</a>
          <a href="#services">Website Design &amp; SEO</a>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <a href="#about">About Us</a>
          <a href="#work">Our Work</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-col footer-newsletter">
          <h5>Get Our Details</h5>
          <p>Services &amp; pricing, sent straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
            <input
              type="text"
              name="company_url"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              className="hp-field"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              type="email"
              placeholder={status === "sent" ? "Check your inbox!" : "Your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              required
              disabled={status === "sending"}
            />
            <button type="submit" aria-label="Send me the details" disabled={status === "sending"}>
              <i className={`fa-solid ${status === "sending" ? "fa-spinner fa-spin" : "fa-arrow-right"}`}></i>
            </button>
          </form>
          {status === "error" && (
            <p className="form-note" style={{ color: "#e0455f", marginTop: "8px" }}>Please enter a valid email address.</p>
          )}
          {status === "blocked" && (
            <p className="form-note" style={{ color: "#e0455f", marginTop: "8px" }}>Please wait a moment before trying again.</p>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} {COMPANY.fullName}. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
