import { useEffect, useRef, useState } from "react";

// Searchable, multi-select dropdown with removable chips.
// Used by the contact form so a lead can tick every service they need,
// instead of being forced to pick just one from a plain <select>.
export default function MultiSelect({ options, selected, onChange, placeholder = "Search services..." }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  function toggle(option) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  function remove(option, e) {
    e.stopPropagation();
    onChange(selected.filter((s) => s !== option));
  }

  return (
    <div className="multiselect" ref={rootRef}>
      <div className="multiselect-control" onClick={() => setOpen(true)}>
        {selected.length === 0 && !open && <span className="multiselect-placeholder">Select services you need…</span>}
        {selected.map((s) => (
          <span className="multiselect-chip" key={s}>
            {s}
            <button type="button" onClick={(e) => remove(s, e)} aria-label={`Remove ${s}`}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </span>
        ))}
        {open && (
          <input
            type="text"
            className="multiselect-search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        )}
        <i
          className={`fa-solid fa-chevron-down multiselect-caret ${open ? "flip" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        ></i>
      </div>

      {open && (
        <div className="multiselect-menu">
          {filtered.length === 0 && <div className="multiselect-empty">No matches</div>}
          {filtered.map((option) => (
            <label className="multiselect-option" key={option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
