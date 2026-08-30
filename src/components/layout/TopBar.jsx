import { COMPANY, SOCIALS } from "../../data/company.js";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <a href={`mailto:${COMPANY.email}`}><i className="fa-solid fa-envelope"></i> {COMPANY.email}</a>
          <a href={`tel:${COMPANY.phoneRaw}`}><i className="fa-solid fa-phone"></i> {COMPANY.phoneDisplay}</a>
        </div>
        <div className="topbar-right">
          <span className="topbar-startup-badge"><i className="fa-solid fa-rocket"></i> New Business Offers Live</span>
          <div className="topbar-social">
            {SOCIALS.map((s) => (
              <a href={s.href} key={s.label} aria-label={s.label} target="_blank" rel="noopener noreferrer"><i className={`fa-brands ${s.icon}`}></i></a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
