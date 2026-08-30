import { useEffect, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="preloader" className={hidden ? "hidden" : ""}>
      <div className="preloader-mark">
        UP<span>LFT</span>
        <div className="loader-bar"><div className="loader-bar-fill"></div></div>
      </div>
    </div>
  );
}
