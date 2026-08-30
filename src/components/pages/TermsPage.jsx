import { useEffect } from "react";
import { COMPANY } from "../../data/company.js";
import logoNav from "../../assets/uplft-logo-nav.png";

// Standalone Terms & Conditions page. Reached via the footer's "Terms of
// Service" link (href="#terms") — App.jsx watches the URL hash and swaps
// this in for the whole marketing site when it's exactly "#terms", so the
// page has its own real, shareable, bookmarkable URL
// (e.g. uplft.co/#terms) without needing any server-side routing config,
// since hash fragments are handled entirely in the browser.
export default function TermsPage() {
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
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last Updated: August 18, 2026</p>

        <p>
          By engaging <strong>UPLFT.CO</strong> ("we", "us", or "our") for our services, the
          client ("you" or "client") agrees to the following Terms &amp; Conditions.
        </p>

        <h2>1. Services</h2>
        <p>
          UPLFT.CO provides digital marketing, social media management, creative design, video
          production, AI-assisted content, website maintenance, and related services as agreed in
          the approved quotation or service plan.
        </p>
        <p>Any work outside the agreed scope may be charged separately.</p>

        <h2>2. Payment</h2>
        <p>
          <strong>50% of the first month's fee is payable in advance</strong> before services
          commence. From the <strong>second month onwards, the full monthly fee is payable at the
          end of each month</strong>.
        </p>
        <p>Delayed payments may result in suspension of services until outstanding dues are cleared.</p>

        <h2>3. Pricing &amp; Service Plan</h2>
        <p>
          The agreed starting plan and pricing will remain fixed for the{" "}
          <strong>first six months</strong>. After six months, the service plan and pricing may be
          reviewed and revised based on the client's requirements and scope of work. Any changes
          will be communicated and agreed upon before taking effect.
        </p>

        <h2>4. Revisions &amp; Additional Work</h2>
        <p>
          Deliverables and revisions will be provided according to the agreed scope. Additional
          work, major changes, or revisions beyond the agreed scope may incur additional charges.
        </p>

        <h2>5. Client Responsibilities</h2>
        <p>
          The client is responsible for providing accurate information, required materials, brand
          assets, and timely approvals. Delays in providing these may affect project timelines.
        </p>

        <h2>6. Performance</h2>
        <p>
          UPLFT.CO will make reasonable efforts to achieve marketing and creative objectives but
          does not guarantee specific results, including followers, views, engagement, leads,
          sales, or revenue, as these depend on various external factors.
        </p>

        <h2>7. Content &amp; Ownership</h2>
        <p>
          Final approved work will be transferred to the client upon receipt of applicable
          payments. UPLFT.CO retains ownership of its pre-existing templates, tools, processes,
          and resources.
        </p>
        <p>
          Unless otherwise agreed, UPLFT.CO may showcase completed work in its portfolio and
          promotional materials.
        </p>

        <h2>8. Cancellation &amp; Termination</h2>
        <p>
          Either party may terminate the engagement with reasonable written notice. Any
          outstanding payments for completed or ongoing work remain payable. Payments for work
          already completed or commenced are non-refundable.
        </p>

        <h2>9. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any non-public business or project information
          shared during the engagement.
        </p>

        <h2>10. Third-Party Platforms</h2>
        <p>
          UPLFT.CO is not responsible for issues caused by third-party platforms, including social
          media algorithm changes, outages, account restrictions, or policy changes.
        </p>

        <h2>11. Agreement</h2>
        <p>
          Approval of a quotation, proposal, service plan, or commencement of services constitutes
          acceptance of these Terms &amp; Conditions.
        </p>

        <div className="legal-contact-block">
          <strong>UPLFT.CO</strong>
          <span>Email: {COMPANY.email}</span>
          <span>Phone: {COMPANY.phoneDisplay}</span>
        </div>

        <p className="legal-note">
          UPLFT.CO reserves the right to update these Terms &amp; Conditions when necessary.
        </p>
      </main>
    </div>
  );
}
