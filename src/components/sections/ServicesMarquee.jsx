import Marquee from "../ui/Marquee.jsx";
import { SERVICES } from "../../data/services.js";

// Second, dark-variant marquee used purely as a rhythmic section divider —
// keeps the page feeling alive between the heavier content blocks.
export default function ServicesMarquee() {
  const words = SERVICES.map((s) => s.title);
  return <Marquee words={words} className="marquee--dark" />;
}
