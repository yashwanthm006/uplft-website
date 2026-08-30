import { useEffect } from "react";
import { COMPANY } from "../../data/company.js";
import logoNav from "../../assets/uplft-logo-nav.png";

// Standalone Privacy Policy page. Reached via the footer's "Privacy Policy"
// link (href="#privacy") — App.jsx watches the URL hash and swaps this in
// for the whole marketing site when it's exactly "#privacy", same pattern
// as TermsPage ("#terms"): a real, shareable, bookmarkable URL with zero
// server-side routing config, since hash fragments are handled entirely in
// the browser.
export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container legal-header-inner">
          <a href="#home" className="logo">
            <img src={logoNav} alt="UPLFT.co" className="logo-img" />
          </a>
          <a href="#home" className="btn btn-outline legal-back">
            <i className="fa-solid fa-arrow-left"></i> Back to Site
          </a>
        </div>
      </header>

      <main className="container legal-content">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last Updated: August 18, 2026</p>

        <p>
          At <strong>UPLFT.CO</strong>, we respect your privacy and are committed to protecting
          your personal information.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you contact us, request a quotation, or use our website, we may collect information
          such as your name, email address, phone number, business details, and project
          requirements. We may also collect basic technical information such as IP address,
          browser type, and website usage data.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information to respond to enquiries, provide quotations, deliver and manage
          our services, communicate regarding projects, and improve our website and services.
        </p>

        <h2>Cookies</h2>
        <p>
          Our website may use cookies and analytics tools to improve functionality and understand
          website usage. You may manage or disable cookies through your browser settings.
        </p>

        <h2>Sharing Your Information</h2>
        <p>
          We do not sell or rent your personal information. Information may only be shared where
          necessary to provide our services, operate our business, or comply with applicable legal
          requirements.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information. However, no online
          system can be guaranteed to be completely secure.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access, correction, or deletion of your personal information, subject to
          applicable laws.
        </p>

        <h2>Payment &amp; Service Terms</h2>
        <p>
          For our monthly services, <strong>50% of the agreed monthly fee is payable in advance,
          with the remaining 50% payable at the end of the respective month</strong>.
        </p>
        <p>
          The agreed starting plan and pricing will remain fixed for the{" "}
          <strong>initial six-month period</strong>. Upon completion of this period, the service
          plan may be reviewed and revised based on business requirements, scope of work, and
          service needs. Any resulting changes to the service fee will be communicated and agreed
          upon before taking effect.
        </p>

        <div className="legal-contact-block">
          <strong>UPLFT.CO</strong>
          <span>Email: {COMPANY.email}</span>
          <span>Phone: {COMPANY.phoneDisplay}</span>
        </div>

        <p className="legal-note">
          We reserve the right to update this policy from time to time. Any changes will be
          published on this page.
        </p>
      </main>
    </div>
  );
}
