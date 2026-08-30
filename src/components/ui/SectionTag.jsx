// Small uppercase pill label used above every section heading for visual rhythm.
export default function SectionTag({ children }) {
  return (
    <span className="section-tag">
      <span className="dot"></span>
      {children}
    </span>
  );
}
