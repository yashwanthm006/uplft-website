import { useRef } from "react";

// Makes an element gently follow the cursor while hovered, then springs back.
// Desktop-only effect — harmless no-op on touch devices (no mousemove fires).
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  return { ref, onMouseMove, onMouseLeave };
}
