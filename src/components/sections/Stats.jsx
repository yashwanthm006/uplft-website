import { useEffect, useRef, useState } from "react";
import { STATS } from "../../data/stats.js";
import useReveal from "../../hooks/useReveal.js";

function Counter({ target, suffix }) {
  const [ref, revealed] = useReveal(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!revealed) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [revealed, target]);

  return (
    <span ref={ref} className="counter">
      {value}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div className="stat-item" key={s.label}>
            <Counter target={s.target} suffix={s.suffix} />
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
