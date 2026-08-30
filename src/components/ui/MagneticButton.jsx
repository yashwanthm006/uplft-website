import useMagnetic from "../../hooks/useMagnetic.js";

// A button/link that gently pulls toward the cursor on hover — signature
// "award-site" interaction, used for every primary CTA on the page.
export default function MagneticButton({ as: Tag = "a", className = "", children, ...rest }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25);
  return (
    <span className="magnetic-wrap" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <Tag ref={ref} className={`magnetic-el ${className}`} {...rest}>
        {children}
      </Tag>
    </span>
  );
}
