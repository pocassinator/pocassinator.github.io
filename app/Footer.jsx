/* Footer — the global contact home (since Contact lives in About).
   Full social row + canonical email + newsletter + Words/Wares. */

function Footer({ onNavigate }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  return (
    <footer style={{ borderTop: "1px dotted var(--rule)", marginTop: "var(--space-11)",
      background: "var(--paper-950)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "var(--space-9) var(--gutter-wide) var(--space-7)",
        display: "grid", gridTemplateColumns: phone ? "1fr" : "1.4fr 1fr 1fr", gap: "var(--space-7)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--fs-lg)", color: "var(--ink-100)" }}>
            Shruti Solanki<span style={{ color: "var(--sage)" }}>.</span>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)",
            maxWidth: "34ch", marginTop: "var(--space-3)", lineHeight: "var(--lh-normal)" }}>
            Working through making and writing, between Delhi and Mumbai.
          </p>
          <Socials style={{ marginTop: "var(--space-5)" }} />
        </div>
        <div>
          <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Reach</Eyebrow>
          <a href="mailto:shrutisolanki1226@gmail.com" style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", marginBottom: "var(--space-2)" }}>shrutisolanki1226@gmail.com</a>
          <a href="mailto:hi@shrutisolanki.com" style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: "var(--space-3)" }}>hi@shrutisolanki.com</a>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <button onClick={() => onNavigate("About")} style={ftLink}>About</button>
            <span style={ftLink}>Field Notes</span>
            <span style={ftLink}>Loose Threads</span>
            <span style={ftLink}>Wares ↗</span>
          </div>
        </div>
        <div>
          <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Field Notes — by post</Eyebrow>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", lineHeight: "var(--lh-normal)", marginBottom: "var(--space-3)" }}>
            A few times a season. Art, aesthetics, learning.
          </p>
          <Field label="" placeholder="you@example.com" />
        </div>
      </div>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "var(--space-5) var(--gutter-wide)",
        borderTop: "1px dotted var(--rule)", display: "flex", justifyContent: "space-between", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>© 2026 Shruti Solanki</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>Artist · Educator · Researcher</span>
      </div>
    </footer>
  );
}
const ftLink = { appearance: "none", background: "none", border: 0, padding: 0, textAlign: "left", cursor: "pointer",
  fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)" };

/* tiny local Field used in the footer newsletter (avoids bundle dependency) */
function Field({ label, placeholder }) {
  const [f, setF] = React.useState(false);
  return (
    <label style={{ display: "block" }}>
      {label && <span style={{ display: "block", marginBottom: "var(--space-2)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>{label}</span>}
      <input placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)",
          color: "var(--text)", background: "var(--surface-input)", border: "1px solid",
          borderColor: f ? "var(--sage-deep)" : "var(--border)", borderRadius: "var(--radius-sm)",
          padding: "0.6rem 0.75rem", outline: "none", boxShadow: f ? "var(--glow-sage)" : "none",
          transition: "border-color var(--dur), box-shadow var(--dur)" }} />
    </label>
  );
}

Object.assign(window, { Footer });
