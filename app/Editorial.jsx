/* Editorial.jsx — the layout vocabulary that turns lists into spreads.
   - Plate     : a greyscale image SLOT (placeholder until labelled files land)
   - NetHeader : a sub-section header band with the live cursor-net behind it
   - Spread    : one editorial entry — big index + title overlapping a plate,
                 with meta & notes running OUTSIDE the frame, alternating sides
   Real artwork, when supplied, can drop straight into <Plate src=… />. */

/* ---------- greyscale image plate ---------- */
function Plate({ src, label, ratio = "4 / 3", caption, style, tall }) {
  const [h, setH] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative", aspectRatio: tall ? "3 / 4" : ratio, width: "100%",
        background: "var(--paper-850)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
        overflow: "hidden", ...style,
      }}
    >
      {src ? (
        <img src={src} alt={label || ""} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover",
            filter: h ? "grayscale(0.15) contrast(1.02)" : "grayscale(1) contrast(1.02) brightness(0.92)",
            transition: "filter var(--dur-slow) var(--ease-out)" }} />
      ) : (
        <React.Fragment>
          {/* placeholder field: faint diagonal hatch + centred label */}
          <div style={{ position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(135deg, rgba(236,236,236,0.04) 0 1px, transparent 1px 11px)" }} />
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <div style={{ textAlign: "center", color: "var(--text-ghost)", fontFamily: "var(--font-mono)" }}>
              <div style={{ fontSize: "var(--fs-lg)", opacity: 0.5 }}>▦</div>
              <div style={{ fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", marginTop: "var(--space-2)" }}>
                {label || "image"}
              </div>
              <div style={{ fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", marginTop: "4px", color: "var(--sage)", opacity: 0.8 }}>
                image coming soon · WIP
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {/* crop ticks — editorial corner marks */}
      {["top left", "top right", "bottom left", "bottom right"].map((c) => {
        const [v, hh] = c.split(" ");
        return <span key={c} style={{ position: "absolute", [v]: "8px", [hh]: "8px", width: "7px", height: "7px",
          borderTop: v === "top" ? "1px solid var(--border-strong)" : "none",
          borderBottom: v === "bottom" ? "1px solid var(--border-strong)" : "none",
          borderLeft: hh === "left" ? "1px solid var(--border-strong)" : "none",
          borderRight: hh === "right" ? "1px solid var(--border-strong)" : "none" }} />;
      })}
      {caption && (
        <div style={{ position: "absolute", left: "10px", bottom: "8px", fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-2xs)", color: "var(--text-faint)", background: "color-mix(in srgb, var(--paper-950) 70%, transparent)",
          padding: "2px 6px", borderRadius: "var(--radius-xs)" }}>{caption}</div>
      )}
    </div>
  );
}

/* ---------- header band with the living network behind it ---------- */
function NetHeader({ kicker, title, keywords = [], minHeight, intensity = 1, slim, right, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.CursorNet) return;
    const destroy = window.CursorNet.mount(ref.current, { keywords, density: slim ? 14 : 20, seed: (title || "").length + 5, intensity });
    return destroy;
  }, [title]);
  const mh = minHeight != null ? minHeight : (slim ? 104 : 200);
  return (
    <div ref={ref} style={{ position: "relative", minHeight: mh, display: "flex",
      alignItems: slim ? "flex-end" : "center", justifyContent: "space-between", gap: "var(--space-5)", flexWrap: "wrap",
      padding: slim ? "var(--space-5) 0 var(--space-3)" : "var(--space-7) 0", borderBottom: "1px dotted var(--rule)", overflow: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {kicker && <Eyebrow style={{ marginBottom: "var(--space-3)" }}>{kicker}</Eyebrow>}
        <h2 style={{ fontSize: slim ? "var(--fs-xl)" : "clamp(2rem, 5vw, var(--fs-3xl))", letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-tight)" }}>{title}</h2>
        {children}
      </div>
      {right && <div style={{ position: "relative", zIndex: 1 }}>{right}</div>}
    </div>
  );
}

/* ---------- one editorial entry: title overlaps the plate, text spills out ---------- */
function Spread({ index, title, year, meta, children, tags = [], src, label, flip, tall, onOpen, cta }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const imageCol = (
    <div style={{ position: "relative" }}>
      <Plate src={src} label={label} tall={tall && !phone} ratio={phone ? "4 / 3" : undefined} caption={meta} style={onOpen ? { cursor: "pointer" } : null} />
    </div>
  );
  const textCol = (
    <div style={{ position: "relative", zIndex: 2, alignSelf: "center",
      // pull the text inward so it overlaps the plate edge (desktop only)
      margin: phone ? 0 : (flip ? "0 -8% 0 0" : "0 0 0 -8%") }}>
      {index != null && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xl)", color: "var(--text-ghost)", lineHeight: 1 }}>{index}</div>}
      <h3 style={{ fontSize: phone ? "var(--fs-xl)" : "clamp(1.6rem, 3.4vw, var(--fs-2xl))", letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-tight)",
        margin: "var(--space-2) 0 var(--space-3)", textWrap: "balance",
        textShadow: src && !phone ? "0 2px 20px rgba(0,0,0,0.5)" : "none" }}>{title}</h3>
      {year && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginBottom: "var(--space-3)" }}>{year}</div>}
      {children && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", maxWidth: "46ch" }}>{children}</div>}
      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
          {tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
      {cta && <div style={{ marginTop: "var(--space-4)" }}>{cta}</div>}
    </div>
  );
  if (phone) {
    return (
      <div onClick={onOpen} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", margin: "var(--space-7) 0" }}>
        {imageCol}{textCol}
      </div>
    );
  }
  return (
    <div onClick={onOpen} style={{ display: "grid",
      gridTemplateColumns: flip ? "0.95fr 1.15fr" : "1.15fr 0.95fr", alignItems: "center",
      gap: "var(--space-4)", margin: "var(--space-8) 0" }}>
      {flip ? <React.Fragment>{textCol}{imageCol}</React.Fragment> : <React.Fragment>{imageCol}{textCol}</React.Fragment>}
    </div>
  );
}

/* ---------- collapsible subsection (accordion) ---------- */
function Collapsible({ title, summary, count, defaultOpen = false, children }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [h, setH] = React.useState(false);
  return (
    <div style={{ borderTop: "1px dotted var(--rule)" }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ appearance: "none", background: "none", border: 0, cursor: "pointer", width: "100%", textAlign: "left",
          display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-4)",
          padding: "var(--space-5) 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <h2 style={{ fontSize: "var(--fs-xl)", letterSpacing: "var(--ls-tight)",
            color: open || h ? "var(--sage)" : "var(--text)", transition: "color var(--dur) var(--ease-out)" }}>{title}</h2>
          {summary && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", maxWidth: "62ch", lineHeight: "var(--lh-normal)" }}>{summary}</span>}
        </div>
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flex: "0 0 auto" }}>
          {count != null && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-ghost)" }}>{count}</span>}
          <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-lg)", lineHeight: 1,
            color: open || h ? "var(--sage)" : "var(--text-faint)", width: "1ch", textAlign: "center",
            transition: "color var(--dur) var(--ease-out)" }}>{open ? "−" : "+"}</span>
        </span>
      </button>
      {open && <div className="fade-in" style={{ paddingBottom: "var(--space-8)" }}>{children}</div>}
    </div>
  );
}

/* ---------- expandable academic references (collapsed by default) ----------
   Shared by the essay reader, the Archive, and anywhere references appear. */
function RefList({ refs, title = "References", defaultOpen = false, style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [h, setH] = React.useState(false);
  if (!refs || !refs.length) return null;
  return (
    <div style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-5)", marginTop: "var(--space-7)", ...style }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ appearance: "none", background: "none", border: 0, cursor: "pointer", padding: 0, width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span aria-hidden="true" style={{ display: "inline-block", fontSize: "var(--fs-xs)", lineHeight: 1,
            color: open || h ? "var(--sage)" : "var(--text-faint)", transform: open ? "rotate(90deg)" : "none",
            transition: "transform var(--dur) var(--ease-out), color var(--dur)" }}>▸</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase",
            letterSpacing: "var(--ls-label)", color: open || h ? "var(--sage)" : "var(--text-faint)", transition: "color var(--dur)" }}>{title}</span>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>
          {open ? "hide" : refs.length + " — show"}
        </span>
      </button>
      {open && (
        <ul className="fade-in" style={{ listStyle: "none", margin: "var(--space-4) 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: "var(--measure-mono)" }}>
          {refs.map((r, i) => (
            <li key={i} style={{ display: "flex", gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", lineHeight: "var(--lh-normal)" }}>
              <span style={{ color: "var(--sage)" }}>—</span><span>{r}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- a warm WIP closing note, shared across sections ---------- */
function WipNote({ children, style }) {
  return (
    <div style={{ borderTop: "1px dotted var(--rule)", marginTop: "var(--space-8)", paddingTop: "var(--space-5)", ...style }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", lineHeight: "var(--lh-normal)", maxWidth: "62ch", margin: 0 }}>
        {children || "More detailed versions of all of this are coming soon."}
      </p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-ghost)", fontStyle: "italic", margin: "var(--space-2) 0 0" }}>
        Bear with me for a bit — it took 3 years to get this far on the website lol.
      </p>
    </div>
  );
}

Object.assign(window, { Plate, NetHeader, Spread, Collapsible, WipNote });
