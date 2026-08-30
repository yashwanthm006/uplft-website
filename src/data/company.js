// Central place for every brand fact used across the site.
// Change something here once and it updates everywhere.
export const COMPANY = {
  name: "UPLFT",
  fullName: "UPLFT.co",
  tagline: "Creative Agency",
  taglineFull: "Branding • Content • Marketing",
  email: "uplft.2026@gmail.com",
  // Primary number — every Call/WhatsApp link (tel:, wa.me) always points
  // here, even in spots that display both numbers as text.
  phone: "+91 90198 10269",
  phoneRaw: "919019810269",
  // Second number — display-only, never used as a link target.
  phoneSecondary: "+91 86184 48500",
  // Text shown wherever both numbers should be visible (topbar, contact
  // section, info-pack email). Clicking/tapping still dials/opens WhatsApp
  // to the primary number only — see phoneRaw above.
  phoneDisplay: "+91 90198 10269 / +91 86184 48500",
  address: "Jambusavari Dinner, JP Nagar 8th Phase, Bangalore - 560083",
  mapQuery: "JP+Nagar+8th+Phase,+Bangalore+560083",
};

// EmailJS — sends the contact form as a fully branded HTML email (UPLFT
// dark/lime theme). The Service ID, Template ID and Public Key below are
// just pointers — they don't control the From or To address. Both of those
// live entirely on the EmailJS dashboard (Email Services = From, the
// Template's "To Email" setting = To) and can be changed there any time
// without touching this file or redeploying the site.
export const EMAILJS_CONFIG = {
  serviceId: "service_ydltavy",
  templateId: "template_w0hdgxf",
  publicKey: "Vew1jMQmOHuqUGOV0",
  // Second template: footer "Get Our Details" form. Its To Email field is
  // set to the {{to_email}} variable on the EmailJS dashboard, so it sends
  // to whatever address the visitor types in — never a fixed inbox.
  detailsTemplateId: "template_96ugyjf",
};

export const SOCIALS = [
  { icon: "fa-instagram", label: "Instagram", href: "https://www.instagram.com/uplft.co_?igsh=MXR5ZHpxNTdqdXptcw%3D%3D&utm_source=qr" },
  { icon: "fa-facebook-f", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593473750880" },
  { icon: "fa-linkedin-in", label: "LinkedIn", href: "#" },
  { icon: "fa-youtube", label: "YouTube", href: "#" },
];
