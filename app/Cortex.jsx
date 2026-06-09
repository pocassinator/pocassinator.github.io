/* Cortex — the site-wide neural map, summoned from the right margin.
   Macro scale of the same line network. Persistent ✦ affordance + pin-open;
   margin-hover opens after a short delay; Esc / click-out closes.
   Renders the SITE_MAP via window.LineNetwork. */

function Cortex({ current, onNavigate }) {
  const [open, setOpen] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const svgRef = React.useRef(null);
  const hoverTimer = React.useRef(null);
  const W = 380, H = 560;

  // build nodes + edges from the site map
  const { nodes, edges, sectionIndex } = React.useMemo(() => {
    const sections = Object.keys(window.SITE_MAP);
    const nodes = [{ x: 46, y: H / 2, r: 5, label: "Home", page: "Home" }];
    const edges = [];
    const sectionIndex = {};
    const top = 70, gap = (H - 140) / (sections.length - 1);
    sections.forEach((sec, i) => {
      if (sec === "Home") return;
      const si = nodes.length;
      sectionIndex[sec] = si;
      const y = top + i * gap;
      nodes.push({ x: 168, y, r: 4.5, label: sec === "The Hallucinating Archive" ? "The Archive" : sec, page: sec, lit: sec === current });
      edges.push([0, si]);
      const subs = window.SITE_MAP[sec];
      subs.forEach((sub, j) => {
        const subY = y - (subs.length - 1) * 9 + j * 18;
        const sj = nodes.length;
        nodes.push({ x: 300, y: subY, r: 3, label: sub, dim: true, page: sec });
        edges.push([si, sj]);
      });
    });
    return { nodes, edges, sectionIndex };
  }, [current]);

  React.useEffect(() => {
    if (open && svgRef.current && window.LineNetwork) {
      // draw dots + threads only; labels are rendered as hyperlinks in the overlay
      window.LineNetwork.draw(svgRef.current, {
        nodes: nodes.map((n) => ({ x: n.x, y: n.y, r: n.r, lit: n.lit, dim: n.dim })),
        edges, seed: 5, pulse: true, wobble: 9,
      });
    }
  }, [open, nodes, edges]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && !pinned) setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned]);

  const reallyOpen = open || pinned;
  const phone = window.useIsPhone ? window.useIsPhone() : false;

  if (phone) return <MobileMap current={current} onNavigate={onNavigate} />;

  return (
    <>
      {/* right-edge hover zone (desktop) */}
      <div
        onMouseEnter={() => { hoverTimer.current = setTimeout(() => setOpen(true), 320); }}
        onMouseLeave={() => { clearTimeout(hoverTimer.current); }}
        style={{ position: "fixed", top: 0, right: 0, width: "22px", height: "100%", zIndex: "var(--z-cortex)" }}
        aria-hidden="true"
      />

      {/* persistent ✦ affordance */}
      <button
        onClick={() => { setPinned((p) => !p); setOpen(true); }}
        title="Open the Cortex — site map"
        aria-label="Open the Cortex site map"
        style={{ position: "fixed", top: "50%", right: "14px", transform: "translateY(-50%)",
          zIndex: "calc(var(--z-cortex) + 1)", appearance: "none", cursor: "pointer",
          width: "34px", height: "34px", borderRadius: "50%", border: "1px solid var(--border-strong)",
          background: "var(--paper-850)", color: reallyOpen ? "var(--sage-bright)" : "var(--sage)",
          fontSize: "16px", lineHeight: 1, display: "grid", placeItems: "center",
          boxShadow: reallyOpen ? "var(--glow-sage)" : "none",
          transition: "color var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)" }}
      >✦</button>

      {/* the map panel */}
      <div
        onMouseLeave={() => { if (!pinned) setOpen(false); }}
        style={{ position: "fixed", top: 0, right: 0, height: "100%", width: "min(" + W + "px, 94vw)",
          background: "linear-gradient(270deg, var(--paper-900) 72%, rgba(21,20,15,0))",
          zIndex: "var(--z-cortex)", pointerEvents: reallyOpen ? "auto" : "none",
          opacity: reallyOpen ? 1 : 0, transform: reallyOpen ? "none" : "translateX(16px)",
          transition: "opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)" }}
      >
        <div style={{ position: "absolute", top: "var(--space-5)", left: "var(--space-6)", right: "var(--space-7)",
          display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Eyebrow>Cortex · site map</Eyebrow>
          <button onClick={() => { setPinned(false); setOpen(false); }} aria-label="Close"
            style={{ appearance: "none", background: "none", border: 0, color: "var(--text-faint)", cursor: "pointer", padding: 0 }}>
            <Icon name="x" size={16} />
          </button>
        </div>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width="100%" height="100%"
          style={{ position: "absolute", inset: 0 }} />
        {/* every node is a hyperlink: anchored dot hit-area + label, sage on hover */}
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          {nodes.map((n, i) => (
            <CortexLink key={i} node={n}
              onActivate={() => { onNavigate && onNavigate(n.page); if (!pinned) setOpen(false); }} />
          ))}
        </svg>
        <div style={{ position: "absolute", bottom: "var(--space-5)", left: "var(--space-6)", right: "var(--space-7)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>
            {pinned ? "pinned · tap ✦ to release" : "tap a node to navigate"}
          </span>
        </div>
      </div>
    </>
  );
}

function CortexLink({ node, onActivate }) {
  const [h, setH] = React.useState(false);
  const left = node.x > 240; // far-right subsection labels read better to the left
  const base = node.lit ? "var(--sage-bright)" : node.dim ? "var(--node-idle)" : "var(--text-muted)";
  const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(); } };
  return (
    <a href="#" role="link" tabIndex={0} aria-label={node.label}
      onClick={(e) => { e.preventDefault(); onActivate(); }} onKeyDown={onKey}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ cursor: "pointer", textDecoration: "none", outline: "none" }}>
      <circle cx={node.x} cy={node.y} r="13" fill="transparent" />
      <circle cx={node.x} cy={node.y} r={h ? node.r + 2 : node.r} fill={h ? "var(--sage)" : "transparent"} />
      <text x={node.x + (left ? -9 : 9)} y={node.y + 3} textAnchor={left ? "end" : "start"}
        fontFamily="var(--font-mono, monospace)" fontSize={node.dim ? 11 : 12}
        fill={h ? "var(--sage)" : base} style={{ transition: "fill var(--dur) var(--ease-out)" }}>
        {node.label}
      </text>
    </a>
  );
}

function MobileMap({ current, onNavigate }) {
  const [open, setOpen] = React.useState(false);
  const netRef = React.useRef(null);
  const sections = Object.keys(window.SITE_MAP || {});
  const cur = current || "Home";

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && netRef.current && window.LineNetwork) {
      const w = netRef.current.clientWidth || 360;
      netRef.current.querySelector("svg") && netRef.current.querySelector("svg").setAttribute("viewBox", `0 0 ${w} 120`);
      window.LineNetwork.auto(netRef.current.querySelector("svg"), { width: w, height: 120, count: 12, seed: 5, grow: true, pulse: true, wobble: 12 });
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (p) => { onNavigate && onNavigate(p); setOpen(false); };
  const label = (s) => (s === "The Hallucinating Archive" ? "The Hallucinating Archive" : s);

  return (
    <React.Fragment>
      {/* thumb-zone Map button */}
      <button onClick={() => setOpen((o) => !o)} aria-label="Open the site map"
        style={{ position: "fixed", right: "16px", bottom: "20px", zIndex: "calc(var(--z-cortex) + 1)",
          appearance: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5em",
          padding: "0.6rem 0.95rem", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-strong)",
          background: "var(--paper-800)", color: open ? "var(--sage-bright)" : "var(--sage)",
          fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", letterSpacing: "var(--ls-wide)",
          boxShadow: "var(--shadow-raise)" }}>
        <span aria-hidden="true">✦</span> Map
      </button>

      {open && (
        <div className="fade-in" style={{ position: "fixed", inset: 0, zIndex: "var(--z-cortex)", background: "var(--paper-900)",
          display: "flex", flexDirection: "column", overflowY: "auto" }}>
          {/* header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "var(--space-5) var(--gutter)", borderBottom: "1px dotted var(--rule)", position: "sticky", top: 0, background: "var(--paper-900)", zIndex: 2 }}>
            <div>
              <Eyebrow>Map · where you are</Eyebrow>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--sage)", marginTop: "2px" }}>{cur === "Home" ? "Home" : label(cur)}</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ appearance: "none", background: "none", border: 0, color: "var(--text-faint)", cursor: "pointer", padding: "8px", margin: "-8px" }}>
              <Icon name="x" size={22} />
            </button>
          </div>

          {/* living network band */}
          <div ref={netRef} style={{ height: "120px", position: "relative", borderBottom: "1px dotted var(--rule)", opacity: 0.6 }}>
            <svg width="100%" height="120" preserveAspectRatio="none" />
          </div>

          {/* all sections + subsections at once */}
          <nav style={{ padding: "var(--space-5) var(--gutter) var(--space-9)" }}>
            {sections.map((sec) => {
              const here = sec === cur;
              const subs = window.SITE_MAP[sec] || [];
              return (
                <div key={sec} style={{ padding: "var(--space-4) 0", borderTop: "1px dotted var(--rule)" }}>
                  <button onClick={() => go(sec)} style={{ appearance: "none", background: "none", border: 0, cursor: "pointer",
                    width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <span aria-hidden="true" style={{ width: "9px", height: "9px", borderRadius: "50%", flex: "0 0 auto",
                      background: here ? "var(--sage-bright)" : "var(--node-idle)", boxShadow: here ? "var(--glow-node)" : "none" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-lg)", letterSpacing: "var(--ls-tight)",
                      color: here ? "var(--sage)" : "var(--text)" }}>{label(sec)}</span>
                    {here && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>you are here</span>}
                  </button>
                  {subs.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)", paddingLeft: "calc(9px + var(--space-3))" }}>
                      {subs.map((sub) => (
                        <button key={sub} onClick={() => go(sec)}
                          style={{ appearance: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
                            color: "var(--text-muted)", background: "var(--paper-850)", border: "1px solid var(--border)",
                            borderRadius: "var(--radius-sm)", padding: "4px 10px" }}>{sub}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)", marginTop: "var(--space-6)" }}>
              Learning is non-linear — every section is a peer, woven through shared themes. Tap anything to jump.
            </p>
          </nav>
        </div>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { Cortex, MobileMap });