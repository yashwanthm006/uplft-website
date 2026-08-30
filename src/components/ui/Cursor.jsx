import { useEffect, useRef } from "react";

// Custom lime cursor: a small dot that trails the mouse and expands into a
// ring whenever it hovers anything with.
// Automatically disabled on touch devices via CSS (see .cursor-dot / .cursor-ring rules).
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = 0, ringY = 0;

    function onMove(e) {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ringX = e.clientX;
      ringY = e.clientY;
    }

    function onOver(e) {
      if (e.target.closest('[data-cursor="hover"]')) {
        ring.classList.add("cursor-ring--active");
      }
    }
    function onOut(e) {
      if (e.target.closest('[data-cursor="hover"]')) {
        ring.classList.remove("cursor-ring--active");
      }
    }

    let raf;
    function loop() {
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
