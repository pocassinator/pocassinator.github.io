/* Theme page — the payoff of the Mycelium made literal.
   Click any theme "spore" anywhere on the site and land here: everything
   carrying that thread, gathered ACROSS sections and ordered newest-first
   within each. The non-linear web, momentarily collapsed into one reading. */

/* which collections belong to which section, + how to reach that section */
function themeSections() {
  return [
    { key: "Making", sub: "Art · Digital · Design",
      items: [...(window.WORKS || []), ...(window.DIGITAL || []), ...(window.DESIGN || [])] },
    { key: "Unmaking", sub: "Research & Writing",
      items: [...(window.ESSAYS || [])] },
    { key: "In Public", sub: "Participatory · Workshops · Exhibitions",
      items: [...(window.PARTICIPATORY || []), ...(window.WORKSHOPS || []), ...(window.EXHIBITIONS || [])] },
  ];
}

/* every distinct theme across the corpus (for the jump-rail) */
function allThemes() {
  const set = new Set();
  themeSections().forEach((s) => s.items.forEach((it) => (it.tags || []).forEach((t) => set.add(t))));
  // archive node themes too
  (window.NODE_INDEX && window.NODE_INDEX["archive"] ? window.NODE_INDEX["archive"].tags : []).forEach((t) => set.add(t));
  return [...set].sort();
}

function yearKey(item) {
  const v = String(item.year ?? item.date ?? "");
  if (/current|present|ongoing/i.test(v)) return 9999;
  const m = v.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
}
function metaOf(item) {
  return item.meta || [item.medium, item.size].filter(Boolean).join(" · ") || item.client || item.kind || "";
}
function yearOf(item) {
  const v = item.year ?? "";
  return v === "current" ? "current" : v;
}

function ThemeRow({ item, theme, section, onNavigate }) {
  const [h, setH] = React.useState(false);
  const others = (item.tags || []).filter((t) => t !== theme);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={() => onNavigate(section)}
      style={{ display: "grid", gridTemplateColumns: "64px 1fr", columnGap: "var(--space-4)",
        padding: "var(--space-4) 0", borderTop: "1px dotted var(--rule)", cursor: "pointer" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "var(--space-2)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", whiteSpace: "nowrap" }}>{yearOf(item)}</span>
      </div>
      <div style={{ opacity: h ? 0.82 : 1, transition: "opacity var(--dur)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text)" }}>{item.title}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: h ? "var(--sage)" : "var(--text-faint)", whiteSpace: "nowrap" }}>
            {section} →
          </span>
        </div>
        {metaOf(item) && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginTop: "2px" }}>{metaOf(item)}</div>}
        {item.note && <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", margin: "var(--space-2) 0 0", lineHeight: "var(--lh-normal)" }}>{item.note}</p>}
        {others.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }} onClick={(e) => e.stopPropagation()}>
            {others.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>
    </div>
  );
}

function Theme({ theme, onNavigate }) {
  const wrap = { maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
  const sections = themeSections()
    .map((s) => ({ ...s, matches: s.items.filter((it) => (it.tags || []).includes(theme)).sort((a, b) => yearKey(b) - yearKey(a)) }))
    .filter((s) => s.matches.length > 0);
  const total = sections.reduce((n, s) => n + s.matches.length, 0);
  const themes = allThemes();

  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-8)" }}>
      <section style={wrap}>
        <button onClick={() => window.history.length > 1 ? onNavigate(localStorage.getItem("ss-prev") || "Making") : onNavigate("Making")}
          style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer",
            fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginBottom: "var(--space-5)" }}>
          ← back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
          <span style={{ color: "var(--sage)", fontSize: "var(--fs-md)" }}>✦</span>
          <Eyebrow>Theme</Eyebrow>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, var(--fs-3xl))", letterSpacing: "var(--ls-tight)", color: "var(--sage)", lineHeight: "var(--lh-tight)", textWrap: "balance" }}>{theme}</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", marginTop: "var(--space-4)", maxWidth: "56ch", lineHeight: "var(--lh-normal)" }}>
          {total} {total === 1 ? "piece" : "pieces"} across {sections.length} {sections.length === 1 ? "part" : "parts"} of the practice — where this thread runs. Learning is non-linear; this is one way to read it.
        </p>
        <hr style={{ border: 0, borderTop: "1px dotted var(--rule)", margin: "var(--space-6) 0 var(--space-8)" }} />

        {sections.length === 0 ? (
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>Nothing tagged “{theme}” yet.</p>
        ) : (
          sections.map((s) => (
            <div key={s.key} style={{ marginBottom: "var(--space-9)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-4)", marginBottom: "var(--space-2)" }}>
                <button onClick={() => onNavigate(s.key)}
                  style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer",
                    fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--fs-lg)", color: "var(--text)" }}>
                  {s.key}
                </button>
                <span style={{ flex: 1, borderTop: "1px dotted var(--rule)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-ghost)" }}>{s.matches.length}</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)", marginBottom: "var(--space-3)" }}>{s.sub}</div>
              {s.matches.map((it, i) => (
                <ThemeRow key={(it.id || it.title) + i} item={it} theme={theme} section={s.key} onNavigate={onNavigate} />
              ))}
            </div>
          ))
        )}

        {/* jump-rail: every other thread */}
        <div style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-5)", marginTop: "var(--space-6)" }}>
          <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Follow another thread</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2) var(--space-3)" }}>
            {themes.map((t) => <Tag key={t} active={t === theme}>{t}</Tag>)}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Theme, allThemes, themeSections });
