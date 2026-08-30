import { useRef } from "react";

// Subtly shifts a layer opposite/with the cursor for depth — attach
// onMouseMove to a container and layerRef to the element that should move.
export default function useParallax(strength = 20) {
  const layerRef = useRef(null);

  function onMouseMove(e) {
    const layer = layerRef.current;
    if (!layer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    layer.style.transform = `translate(${px * strength}px, ${py * strength}px)`;
  }

  function onMouseLeave() {
    const layer = layerRef.current;
    if (!layer) return;
    layer.style.transform = "translate(0, 0)";
  }

  return { layerRef, onMouseMove, onMouseLeave };
}
