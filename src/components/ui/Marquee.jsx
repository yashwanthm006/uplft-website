// Infinite-scrolling brand strip used as a bold section divider — a signature
// pattern on modern creative-agency sites. Duplicates the content once so the
// CSS animation can loop seamlessly.
export default function Marquee({ words = [], className = "" }) {
  const content = [...words, ...words];
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        {content.map((w, i) => (
          <span className="marquee-item" key={i}>
            {w} <i className="fa-solid fa-star"></i>
          </span>
        ))}
      </div>
    </div>
  );
}
