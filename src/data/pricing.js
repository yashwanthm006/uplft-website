// Transcribed from the client's "Social Media Management Packages" graphic,
// updated per the client's revised pricing/features (Aug 2026).
//
// All three plans list the SAME set of rows (the full Premium feature set)
// so it reads as a proper comparison table — a feature not available on a
// tier shows greyed-out with an X instead of being missing entirely. Each
// row's `text` is the exact plain-text label shown when that tier includes
// the feature; `offLabel` is what shows (greyed) when it doesn't.
export const PRICING_FEATURES = [
  { id: "content", offLabel: "Content (Static, Reels, Carousels)" },
  { id: "influencer", offLabel: "Influencer Marketing" },
  { id: "video", offLabel: "Professional Video Shoot" },
  { id: "gmb", offLabel: "GMB Management" },
  { id: "manager", offLabel: "Social Media Manager" },
  { id: "profile", offLabel: "Profile Optimization" },
  { id: "adCampaign", offLabel: "Engagement & Awareness Ad Campaign" },
  { id: "platforms", offLabel: "Platforms: Instagram, Facebook & YouTube" },
  { id: "calendar", offLabel: "Monthly Content Calendar" },
  { id: "seo", offLabel: "Website Update & SEO (Basic)" },
];

export const PRICING_TIERS = [
  {
    name: "Basic",
    badge: "gray",
    price: "₹20,000",
    period: "/Month",
    featured: false,
    values: {
      content: "8 Content (Static, Reels, Carousels)",
      influencer: null,
      video: "1 - Professional Video Shoot",
      gmb: "GMB Management",
      manager: null,
      profile: "Profile Optimization",
      adCampaign: "Engagement & Awareness Ad Campaign",
      platforms: "Platforms: Instagram, Facebook & YouTube",
      calendar: "Monthly Content Calendar",
      seo: null,
    },
  },
  {
    name: "Standard",
    badge: "lime",
    price: "₹35,000",
    period: "/Month",
    featured: false,
    values: {
      content: "12 Content (Static, Reels, Carousels)",
      influencer: "1 - Influencer Marketing",
      video: "2 - Professional Video Shoot",
      gmb: "GMB Management & Ads",
      manager: null,
      profile: "Profile Optimization",
      adCampaign: "Engagement & Awareness Ad Campaign",
      platforms: "Platforms: Instagram, Facebook & YouTube",
      calendar: "Monthly Content Calendar",
      seo: null,
    },
  },
  {
    name: "Premium",
    badge: "lime",
    icon: "fa-gem",
    price: "₹60,000",
    period: "/Month",
    featured: true,
    values: {
      content: "16 Content (Static, Reels, Carousels)",
      influencer: "3 - Influencer Marketing",
      video: "3/4 - Professional Video Shoot",
      gmb: "GMB Management & Ads",
      manager: "Senior Social Media Manager",
      profile: "Profile Optimization",
      adCampaign: "Engagement & Awareness Ad Campaign",
      platforms: "Platforms: Instagram, Facebook & YouTube",
      calendar: "Monthly Content Calendar",
      seo: "Website Update & SEO (Basic)",
    },
  },
];

export const PRICING_NOTE = "All packages are exclusive of GST";
