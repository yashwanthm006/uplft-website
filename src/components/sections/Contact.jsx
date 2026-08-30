import { useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../ui/Reveal.jsx";
import SectionTag from "../ui/SectionTag.jsx";
import MultiSelect from "../ui/MultiSelect.jsx";
import { COMPANY, EMAILJS_CONFIG } from "../../data/company.js";
import { SERVICE_OPTIONS } from "../../data/services.js";
import {
  sanitizeInput,
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidMessage,
  isRateLimited,
  markSubmitted,
} from "../../utils/formSecurity.js";
import { useRecaptcha } from "../../hooks/useRecaptcha.js";

const RATE_LIMIT_KEY = "uplft_contact_last_submit";
const RATE_LIMIT_MS = 30000; // 30s cooldown between real submissions
// A human filling this form takes at least a few seconds; a script that
// fills every field and submits instantly does not. Cheap extra signal
// alongside the honeypot.
const MIN_FILL_MS = 2500;

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | blocked | captcha
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [services, setServices] = useState([]);
  // Honeypot: real visitors never see or fill this field. Any bot that
  // auto-fills every input on the page will fill it, and we quietly drop
  // the submission without sending anything or tipping the bot off.
  const [trap, setTrap] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const formOpenedAt = useState(() => Date.now())[0];
  const { containerRef: captchaRef, getToken, reset: resetCaptcha, configured: captchaConfigured } = useRecaptcha();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) setFieldErrors({ ...fieldErrors, [e.target.name]: null });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Only treat "too fast" as a bot signal when there's actual content —
    // an empty form submitted instantly is just someone clicking Send with
    // nothing typed (should see real validation errors below), whereas a
    // FILLED form submitted in under MIN_FILL_MS is the actual bot
    // fingerprint (script fills every field and submits in one tick).
    const hasContent = Boolean(
      form.name.trim() || form.email.trim() || form.phone.trim() || form.message.trim() || services.length > 0
    );
    const filledInstantly = hasContent && Date.now() - formOpenedAt < MIN_FILL_MS;
    if (trap.trim() !== "" || filledInstantly) {
      // Bot filled the honeypot, or filled+submitted faster than any human
      // could type. Pretend it worked so it doesn't retry with a smarter approach.
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setServices([]);
      setTimeout(() => setStatus("idle"), 4500);
      return;
    }

    if (isRateLimited(RATE_LIMIT_KEY, RATE_LIMIT_MS)) {
      setStatus("blocked");
      return;
    }

    const name = sanitizeInput(form.name, 100);
    const email = form.email.trim().slice(0, 254);
    const phone = sanitizeInput(form.phone, 30);
    const message = sanitizeInput(form.message, 2000);

    const errors = {};
    if (!isValidName(name)) errors.name = "Enter your name using letters only (2–100 characters).";
    if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
    if (!isValidPhone(phone)) errors.phone = "Enter a valid phone number (7–16 digits).";
    if (message && !isValidMessage(message)) errors.message = "Share at least a few words, or leave this blank.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      return;
    }
    setFieldErrors({});

    let captchaToken = "";
    if (captchaConfigured) {
      captchaToken = getToken();
      if (!captchaToken) {
        setStatus("captcha");
        return;
      }
    }

    setStatus("sending");
    const servicesText = services.join(", ") || "Not specified";

    try {
      // Branded HTML email (UPLFT logo + theme) sent via EmailJS. The From
      // and To address are both configured on the EmailJS dashboard, not
      // here. When reCAPTCHA is enabled on the template, EmailJS verifies
      // 'g-recaptcha-response' server-side and rejects the send if it's
      // missing or invalid — that check can't be bypassed from the browser.
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          full_name: name,
          email_address: email,
          phone_number: phone,
          services: servicesText,
          message: message || "No additional details provided.",
          ...(captchaConfigured ? { "g-recaptcha-response": captchaToken } : {}),
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      const ok = result.status === 200;

      if (ok) {
        markSubmitted(RATE_LIMIT_KEY);
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
        setServices([]);
        setTimeout(() => setStatus("idle"), 4500);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      if (captchaConfigured) resetCaptcha();
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact-inner">
        <Reveal className="contact-info">
          <SectionTag>Get In Touch</SectionTag>
          <h2>Tell Us About Your Brand</h2>
          <p>Get a free strategy call &amp; audit. We reply within 1 business hour on WhatsApp.</p>

          <div className="info-item">
            <i className="fa-solid fa-location-dot"></i>
            <div><strong>Our Office</strong><span>{COMPANY.address}</span></div>
          </div>
          <div className="info-item">
            <i className="fa-solid fa-phone"></i>
            <div><strong>Call Us</strong><span>{COMPANY.phoneDisplay}</span></div>
          </div>
          <div className="info-item">
            <i className="fa-solid fa-envelope"></i>
            <div><strong>Email Us</strong><span>{COMPANY.email}</span></div>
          </div>
        </Reveal>

        <Reveal as="form" className="contact-form" delay={100} onSubmit={handleSubmit} noValidate>
          {/* Honeypot: invisible to real visitors, bots that auto-fill every
              field will fill it. Submissions with it filled are silently dropped. */}
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
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text" id="name" name="name" placeholder="Rohan Sharma"
                value={form.name} onChange={handleChange} maxLength={100}
                pattern="[A-Za-zÀ-ſ' .-]{2,100}" title="Letters only, 2–100 characters"
                required
              />
              {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email" id="email" name="email" placeholder="rohan@brand.in"
                value={form.email} onChange={handleChange} maxLength={254}
                required
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel" id="phone" name="phone" placeholder="+91 98765 43210"
              value={form.phone} onChange={handleChange} maxLength={30}
              pattern="[+]?[\d\s().-]{7,20}" title="A valid phone number"
              required
            />
            {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Services You're Interested In</label>
            <MultiSelect options={SERVICE_OPTIONS} selected={services} onChange={setServices} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Tell us about your brand <span className="optional-tag">(optional)</span></label>
            <textarea id="message" name="message" rows="4" placeholder="Share your brand, goals and timeline..." value={form.message} onChange={handleChange} maxLength={2000}></textarea>
            {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
          </div>

          {captchaConfigured && (
            <div className="form-group">
              <div className="recaptcha-wrap" ref={captchaRef}></div>
              {status === "captcha" && <span className="field-error">Please verify you're not a robot.</span>}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Message"} <i className="fa-solid fa-paper-plane"></i>
          </button>
          {status === "error" && Object.keys(fieldErrors).length === 0 && (
            <p className="form-note" style={{ color: "#e0455f" }}>Something went wrong — please try again or email us directly.</p>
          )}
          {status === "blocked" && (
            <p className="form-note" style={{ color: "#e0455f" }}>Please wait a moment before sending another message.</p>
          )}
          <p className="form-note"><i className="fa-solid fa-lock"></i> No spam. Your details stay private.</p>

          <div className={`form-success ${status === "success" ? "show" : ""}`}>
            <i className="fa-solid fa-circle-check"></i>
            Thanks! Your enquiry is on its way — we'll be in touch shortly.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
