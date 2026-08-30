import useReveal from "../../hooks/useReveal.js";

// Generic scroll-reveal wrapper. Pass `as` to render a different tag (e.g. "form").
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, revealed] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${revealed ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: revealed ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
