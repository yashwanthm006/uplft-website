import useScrollProgress from "../../hooks/useScrollProgress.js";

// Thin lime bar pinned to the very top of the viewport showing read/scroll progress.
export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
