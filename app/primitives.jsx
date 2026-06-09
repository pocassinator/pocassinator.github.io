/* Kit-local primitives — window-attached so other Babel files can read them.
   Mirror the design-system components (components/*) but self-contained so the
   kit renders without the generated bundle. Styled entirely from tokens. */

function useReduced() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const fn = () => setR(m.matches);
    m.addEventListener && m.addEventListener("change", fn);
    return () => m.removeEventListener && m.removeEventListener("change", fn);
  }, []);
  return r;
}

function Eyebrow({ children, spacing = "label", style, as: As = "div", ...rest }) {
  const ls = { wide: "var(--ls-wide)", label: "var(--ls-label)", loose: "var(--ls-loose)" }[spacing];
  return (
    <As style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", textTransform: "uppercase",
      letterSpacing: ls, color: "var(--text-faint)", ...style }} {...rest}>{children}</As>
  );
}

function Tag({ children, active, onClick, theme, style, ...rest }) {
  const [h, setH] = React.useState(false);
  // a theme tag is ALWAYS a hyperlink to its theme page, unless an explicit
  // onClick overrides (e.g. a filter control). Derive the theme from text.
  const label = theme != null ? theme : (typeof children === "string" ? children : null);
  const go = onClick || (label && window.__ssNav ? () => window.__ssNav("theme:" + label) : undefined);
  const interactive = !!go;
  return (
    <span role={interactive ? "link" : undefined} tabIndex={interactive ? 0 : undefined}
      onClick={go}
      onKeyDown={interactive ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } } : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      title={interactive && !onClick ? "See everything tagged “" + label + "”" : undefined}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.45em", fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)", lineHeight: 1, padding: "3px 9px 4px", border: "1px solid",
        borderColor: active ? "var(--sage-deep)" : h && interactive ? "var(--sage-deep)" : "var(--border)", borderRadius: "var(--radius-sm)",
        background: active ? "var(--sage-wash)" : "var(--paper-850)",
        color: active ? "var(--sage)" : h && interactive ? "var(--sage)" : "var(--text-faint)",
        cursor: interactive ? "pointer" : "default", whiteSpace: "nowrap", outline: "none",
        transition: "color var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)", ...style }} {...rest}>
      <span aria-hidden="true" style={{ color: "var(--sage)" }}>·</span>{children}
    </span>
  );
}

function Button({ children, variant = "outline", size = "md", href, icon = "→", iconLeft, disabled, onClick, style, ...rest }) {
  const [h, setH] = React.useState(false); const [a, setA] = React.useState(false);
  const As = href ? "a" : "button";
  const sizes = { sm: { padding: "0.4rem 0.75rem", fontSize: "var(--fs-xs)" },
    md: { padding: "0.625rem 1.125rem", fontSize: "var(--fs-sm)" },
    lg: { padding: "0.8rem 1.5rem", fontSize: "var(--fs-base)" } }[size];
  const variants = {
    solid: { background: a ? "var(--sage-deep)" : h ? "#8da37a" : "var(--sage)", color: "var(--text-on-sage)", borderColor: "transparent" },
    outline: { borderColor: h ? "var(--ink-500)" : "var(--sage-deep)", color: h ? "var(--link-hover)" : "var(--sage)" },
    ghost: { color: h ? "var(--text-muted)" : "var(--text)", borderColor: "transparent" },
    link: { padding: 0, borderColor: "transparent", color: h ? "var(--link-hover)" : "var(--sage)", borderBottom: "1px dotted currentColor", borderRadius: 0 },
  }[variant];
  return (
    <As href={href} onClick={disabled ? undefined : onClick} aria-disabled={disabled || undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setA(false); }}
      onMouseDown={() => setA(true)} onMouseUp={() => setA(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.6em", fontFamily: "var(--font-mono)",
        fontWeight: variant === "solid" ? 700 : 400, letterSpacing: "var(--ls-wide)", lineHeight: 1,
        border: "1px solid transparent", borderRadius: "var(--radius-sm)", cursor: disabled ? "not-allowed" : "pointer",
        textDecoration: "none", background: "none", opacity: disabled ? 0.4 : 1,
        transform: a && !disabled ? "translateY(0.5px)" : "none",
        transition: "color var(--dur) var(--ease-out), background var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)",
        ...sizes, ...variants, ...style }} {...rest}>
      {icon && iconLeft && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {icon && !iconLeft && <span aria-hidden="true">{icon}</span>}
    </As>
  );
}

function DottedRule({ dashed, color, vertical, style }) {
  const stroke = `1px ${dashed ? "dashed" : "dotted"} ${color || "var(--rule)"}`;
  return <hr style={{ border: 0, margin: 0, alignSelf: "stretch",
    ...(vertical ? { borderLeft: stroke, width: 0, minHeight: "1em" } : { borderTop: stroke, height: 0 }), ...style }} />;
}

function ModeToggle({ value = "timeline", onChange,
  options = [{ value: "timeline", label: "Timeline" }, { value: "mycelium", label: "Mycelium" }] }) {
  return (
    <div role="tablist" aria-label="Reading mode" style={{ display: "inline-flex", alignItems: "center", gap: "2px",
      padding: "3px", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-pill)",
      background: "var(--paper-850)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>
      {options.map((opt, i) => {
        const on = value === opt.value;
        return (
          <React.Fragment key={opt.value}>
            {i === 1 && <span aria-hidden="true" style={{ color: "var(--text-ghost)", padding: "0 2px" }}>⇄</span>}
            <button role="tab" aria-selected={on} onClick={() => onChange && onChange(opt.value)}
              style={{ appearance: "none", cursor: "pointer", border: 0, borderRadius: "var(--radius-pill)",
                padding: "0.4rem 0.85rem", fontFamily: "inherit", fontSize: "inherit", letterSpacing: "var(--ls-wide)",
                color: on ? "var(--text-on-sage)" : "var(--text-muted)", background: on ? "var(--sage)" : "transparent",
                transition: "background var(--dur) var(--ease-out), color var(--dur) var(--ease-out)" }}>{opt.label}</button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* tiny inline social/utility icons (outline, currentColor) — kit-local set */
function Icon({ name, size = 18 }) {
  const p = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></>,
    linkedin: <><path d="M4 9v9M4 5.5v.01M9 18v-5a2.5 2.5 0 0 1 5 0v5M9 9v9"/></>,
    github: <path d="M9 19c-4 1.2-4-2-5.5-2.5M15 21v-3.2c0-.9.2-1.6-.5-2.2 2.3-.3 4.5-1.2 4.5-5a3.9 3.9 0 0 0-1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.3-2.9 1a10 10 0 0 0-5 0C6.5 2.2 5.6 2.5 5.6 2.5a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4.5 8c0 3.8 2.2 4.7 4.5 5-.5.5-.6 1-.6 1.6V21"/>,
    arrowDownLine: <><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></>,
    x: <path d="M6 6l12 12M18 6L6 18"/>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    star: <path d="M12 3l1.2 6.3L19 11l-5.8 1.7L12 19l-1.2-6.3L5 11l5.8-1.7z"/>,
  }[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p}</svg>
  );
}

/* social links — Instagram · Behance · LinkedIn. Behance has no clean outline
   glyph, so it uses the brand "Bē" mono lockup per the design system. */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/shrutiunmakes", icon: "instagram" },
  { label: "Behance", href: "https://www.behance.net/shrutisolanki", text: "Bē" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shruti-solanki-176b28251", icon: "linkedin" },
];
function SocialLink({ item, size = 18 }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ color: h ? "var(--sage)" : "inherit", display: "inline-flex", alignItems: "center",
        justifyContent: "center", width: size + "px", height: size + "px", transition: "color var(--dur)" }}>
      {item.icon
        ? <Icon name={item.icon} size={size} />
        : <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: Math.round(size * 0.82) + "px", lineHeight: 1, letterSpacing: "-0.03em" }}>{item.text}</span>}
    </a>
  );
}
function Socials({ size = 18, gap = "var(--space-4)", style }) {
  return (
    <div style={{ display: "flex", gap, alignItems: "center", color: "var(--text-muted)", ...style }}>
      {SOCIAL_LINKS.map((s) => <SocialLink key={s.label} item={s} size={size} />)}
    </div>
  );
}

Object.assign(window, { useReduced, Eyebrow, Tag, Button, DottedRule, ModeToggle, Icon, Socials });

function useIsPhone(bp) {
  bp = bp || 760;
  const q = "(max-width:" + bp + "px)";
  const [p, setP] = React.useState(function () { return !!window.__forcePhone || (typeof window !== "undefined" && window.matchMedia(q).matches); });
  React.useEffect(function () {
    if (window.__forcePhone) { setP(true); return; }
    const m = window.matchMedia(q);
    const fn = function () { setP(m.matches); }; fn();
    m.addEventListener ? m.addEventListener("change", fn) : m.addListener(fn);
    return function () { m.removeEventListener ? m.removeEventListener("change", fn) : m.removeListener(fn); };
  }, [q]);
  return p;
}
window.useIsPhone = useIsPhone;
