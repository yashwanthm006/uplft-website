export const SERVICES = [
  {
    icon: "fa-palette",
    title: "Branding & Identity",
    desc: "Logo, brand guidelines and a visual identity that makes a new brand feel instantly credible.",
  },
  {
    icon: "fa-video",
    title: "Content Creation",
    desc: "Static posts, reels, carousels and professional video shoots — planned on a monthly content calendar.",
  },
  {
    icon: "fa-share-nodes",
    title: "Social Media Management",
    desc: "End-to-end management across Instagram, Facebook & YouTube, run by a dedicated social media manager.",
  },
  {
    icon: "fa-users",
    title: "Influencer Marketing",
    desc: "Curated influencer collaborations that put your brand in front of real, engaged audiences.",
  },
  {
    icon: "fa-bullseye",
    title: "Performance & GMB Ads",
    desc: "Google Business Profile management plus engagement and awareness ad campaigns that convert.",
  },
  {
    icon: "fa-display",
    title: "Website Design & SEO",
    desc: "Fast, on-brand websites with basic SEO so your brand ranks and converts from day one.",
  },
  {
    icon: "fa-location-dot",
    title: "Local & Community Marketing",
    desc: "Hyperlocal campaigns and community engagement that build word-of-mouth fast.",
  },
  {
    icon: "fa-bolt",
    title: "Organic & Trend Marketing",
    desc: "Trend-jacking and organic content strategies that get a new brand talked about, not just seen.",
  },
];

// Flat list for the contact form's multi-select — every service title plus
// a catch-all "Others" so a lead can flag a need not listed above.
export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Others"];
