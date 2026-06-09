/* Nav — slim top bar on desktop; a hamburger + full-screen sheet on phones.
   Active item carries a sage underline; everything dims on hover. */

function NavItem({ label, sub, active, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} title={sub}
      style={{ appearance: "none", background: "none", border: 0, cursor: "pointer", padding: "4px 0", whiteSpace: "nowrap",
        fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)",
        color: active ? "var(--sage)" : h ? "var(--text-muted)" : "var(--text)",
        borderBottom: active ? "1px solid var(--sage)" : "1px solid transparent",
        transition: "color var(--dur) var(--ease-out)" }}>
      {label}
    </button>
  );
}

const NAV_ITEMS = [
  ["The Hallucinating Archive", "Interactive installation & research"],
  ["Unmaking", "Research & Writing"],
  ["In Public", "Exhibitions & Workshops"],
  ["Making", "Art, Digital & Design"],
  ["About", "Intro & bio"],
];
const NAV_WORDS = [["Field Notes", "blog · art · aesthetics · learning"], ["Loose Threads", "notes, process, WIP"]];

function Wordmark({ onNavigate }) {
  return (
    <button onClick={() => onNavigate("Home")}
      style={{ appearance: "none", background: "none", border: 0, cursor: "pointer", padding: 0,
        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--fs-base)",
        letterSpacing: "var(--ls-tight)", color: "var(--ink-100)", whiteSpace: "nowrap" }}>
      Shruti Solanki<span style={{ color: "var(--sage)" }}>.</span>
    </button>
  );
}

function MobileNav({ current, onNavigate }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const go = (p) => { setOpen(false); onNavigate(p); };
  const rowBtn = (label, sub, accent) => (
    <button key={label} onClick={() => go(label)}
      style={{ appearance: "none", background: "none", border: 0, textAlign: "left", cursor: "pointer",
        padding: "var(--space-3) 0", borderBottom: "1px dotted var(--rule)", width: "100%" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-lg)", letterSpacing: "var(--ls-tight)",
        color: current === label ? "var(--sage)" : (accent || "var(--text)") }}>{label}</div>
      {sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", marginTop: "2px" }}>{sub}</div>}
    </button>
  );
  return (
    <React.Fragment>
      <header style={{ position: "sticky", top: 0, zIndex: "var(--z-nav)",
        background: "color-mix(in srgb, var(--paper-900) 90%, transparent)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderBottom: "1px dotted var(--rule)" }}>
        <div style={{ padding: "0 var(--gutter-wide)", minHeight: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark onNavigate={go} />
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            style={{ appearance: "none", background: "none", border: 0, cursor: "pointer", padding: "8px", margin: "-8px",
              color: open ? "var(--sage)" : "var(--text)" }}>
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </header>
      {open && (
        <div style={{ position: "fixed", inset: "56px 0 0", zIndex: "calc(var(--z-nav) - 1)",
          background: "var(--paper-900)", overflowY: "auto", padding: "var(--space-5) var(--gutter-wide) var(--space-8)" }}>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {NAV_ITEMS.map(([l, s]) => rowBtn(l, s))}
            <div style={{ height: "var(--space-5)" }} />
            <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Words</Eyebrow>
            {NAV_WORDS.map(([l, s]) => rowBtn(l, s, "var(--text-muted)"))}
            <div style={{ height: "var(--space-4)" }} />
            {rowBtn("Wares", "merch ↗", "var(--text-muted)")}
            {rowBtn("Contact", "say hello", "var(--text-muted)")}
          </nav>
          <Socials size={20} gap="var(--space-5)" style={{ marginTop: "var(--space-7)", color: "var(--text-faint)" }} />
        </div>
      )}
    </React.Fragment>
  );
}

function Nav({ current, onNavigate }) {
  const phone = useIsPhone(900);
  const [words, setWords] = React.useState(false);
  if (phone) return <MobileNav current={current} onNavigate={onNavigate} />;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: "var(--z-nav)",
      background: "color-mix(in srgb, var(--paper-900) 86%, transparent)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      borderBottom: "1px dotted var(--rule)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter-wide)",
        minHeight: "60px", display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
        <Wordmark onNavigate={onNavigate} />
        <nav style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", marginLeft: "var(--space-3)", flexWrap: "nowrap" }}>
          {NAV_ITEMS.map(([label, sub]) => (
            <NavItem key={label} label={label} sub={sub} active={current === label} onClick={() => onNavigate(label)} />
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <div style={{ position: "relative" }} onMouseLeave={() => setWords(false)}>
            <button onClick={() => { setWords(false); onNavigate("Words"); }} onMouseEnter={() => setWords(true)}
              style={{ appearance: "none", background: "none", border: 0, cursor: "pointer", padding: "4px 0",
                fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
                color: (current === "Words" || current === "Field Notes" || current === "Loose Threads") ? "var(--sage)" : "var(--text-muted)" }}>
              Words <span aria-hidden="true">▾</span>
            </button>
            {words && (
              <div style={{ position: "absolute", top: "100%", right: 0, minWidth: "190px", marginTop: "6px",
                background: "var(--paper-800)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-raise)", padding: "var(--space-2)" }}>
                {NAV_WORDS.map(([t, s]) => (
                  <button key={t} onClick={() => { setWords(false); onNavigate(t); }}
                    style={{ appearance: "none", background: "none", border: 0, textAlign: "left", width: "100%", cursor: "pointer",
                      padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-xs)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper-750)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: current === t ? "var(--sage)" : "var(--text)" }}>{t}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)" }}>{s}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <span onClick={() => onNavigate("Wares")} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", cursor: "pointer" }}>Wares</span>
          <button onClick={() => onNavigate("Contact")}
            style={{ appearance: "none", background: "none", border: 0, cursor: "pointer", padding: "4px 0",
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)",
              color: current === "Contact" ? "var(--sage)" : "var(--text-muted)" }}>Contact</button>
          <Socials size={16} gap="var(--space-3)" style={{ color: "var(--text-faint)" }} />
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Nav });
