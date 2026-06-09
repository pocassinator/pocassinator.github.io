/* Workshops.jsx — the "Immersive Art Workshops" subsection (first in In Public).
   A rich, editorial block: write-up + glimpses, real testimonials, an
   "upcoming" shelf, and an interest/hosting form that captures where someone
   is based so Shruti can reach out when she's planning something nearby. */

function CircleAvatar({ src, size = 64 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto",
      background: "var(--paper-850)", border: "1px solid var(--border)", display: "grid", placeItems: "center" }}>
      {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)" }} />
        : <span style={{ color: "var(--text-ghost)", fontSize: "var(--fs-lg)" }}>☻</span>}
    </div>
  );
}

function Testimonial({ quote, name, role, flip }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  if (phone) {
    return (
      <div style={{ margin: "var(--space-5) 0" }}>
        <div style={{ position: "relative", background: "var(--paper-800)", border: "1px solid var(--border)",
          borderLeft: "2px solid var(--sage-deep)", borderRadius: "var(--radius-sm)", padding: "var(--space-5)" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: "var(--space-1)", left: "var(--space-3)",
            fontFamily: "var(--font-serif)", fontSize: "2.4rem", lineHeight: 1, color: "var(--sage-deep)", opacity: 0.6 }}>“</span>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-base)", color: "var(--ink-200)",
            lineHeight: "var(--lh-relaxed)", margin: 0, paddingTop: "var(--space-3)" }}>{quote}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
          <CircleAvatar size={44} />
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)" }}>{name}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)" }}>{role}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: flip ? "auto 1fr" : "1fr auto", gap: "var(--space-5)",
      alignItems: "start", margin: "var(--space-6) 0" }}>
      {flip && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", paddingTop: "var(--space-5)" }}>
        <CircleAvatar />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)" }}>{name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)" }}>{role}</div>
        </div>
      </div>}
      <div style={{ position: "relative", background: "var(--paper-800)", border: "1px solid var(--border)",
        borderLeft: "2px solid var(--sage-deep)", borderRadius: "var(--radius-sm)", padding: "var(--space-6)" }}>
        <span aria-hidden="true" style={{ position: "absolute", top: "var(--space-2)", left: "var(--space-4)",
          fontFamily: "var(--font-serif)", fontSize: "3rem", lineHeight: 1, color: "var(--sage-deep)", opacity: 0.6 }}>“</span>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-md)", color: "var(--ink-200)",
          lineHeight: "var(--lh-relaxed)", margin: 0, paddingTop: "var(--space-3)" }}>{quote}</p>
      </div>
      {!flip && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", paddingTop: "var(--space-5)" }}>
        <CircleAvatar />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)" }}>{name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)" }}>{role}</div>
        </div>
      </div>}
    </div>
  );
}

function WField({ label, placeholder, type = "text", textarea, half }) {
  const [f, setF] = React.useState(false);
  const s = { width: "100%", boxSizing: "border-box", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)",
    color: "var(--text)", background: "var(--surface-input)", border: "1px solid",
    borderColor: f ? "var(--sage-deep)" : "var(--border)", borderRadius: "var(--radius-sm)",
    padding: "0.6rem 0.75rem", outline: "none", boxShadow: f ? "var(--glow-sage)" : "none", resize: "vertical" };
  return (
    <label style={{ display: "block", gridColumn: half ? "span 1" : "1 / -1" }}>
      <span style={{ display: "block", marginBottom: "var(--space-2)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)",
        textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>{label}</span>
      {textarea
        ? <textarea rows={3} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={s} />
        : <input type={type} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={s} />}
    </label>
  );
}

function InterestForm() {
  const [intent, setIntent] = React.useState("participate");
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  return (
    <div style={{ border: "1px dotted var(--rule)", borderRadius: "var(--radius-sm)", padding: "var(--space-7)",
      background: "var(--paper-850)", marginTop: "var(--space-6)" }}>
      <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Be part of the next one</Eyebrow>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", maxWidth: "60ch", lineHeight: "var(--lh-normal)", marginBottom: "var(--space-5)" }}>
        The workshops travel. Tell me where you're based — if I'm planning or conducting something in your city,
        I'll reach out. Whether you'd like to take part, or to host one where you are.
      </p>
      <div style={{ display: "flex", gap: "2px", padding: "3px", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-pill)",
        background: "var(--paper-900)", width: "fit-content", marginBottom: "var(--space-5)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>
        {[["participate", "Take part"], ["host", "Host one"]].map(([v, l]) => (
          <button key={v} onClick={() => setIntent(v)} style={{ appearance: "none", cursor: "pointer", border: 0,
            borderRadius: "var(--radius-pill)", padding: "0.45rem 0.9rem", fontFamily: "inherit", fontSize: "inherit",
            color: intent === v ? "var(--text-on-sage)" : "var(--text-muted)", background: intent === v ? "var(--sage)" : "transparent",
            transition: "background var(--dur), color var(--dur)" }}>{l}</button>
        ))}
      </div>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1fr 1fr", gap: "var(--space-4)" }}>
        <WField label="Your name" placeholder="Name" half />
        <WField label="Email" type="email" placeholder="you@example.com" half />
        <WField label="City" placeholder="City" half />
        <WField label="Country" placeholder="Country" half />
        <WField label={intent === "host" ? "About the space / who you'd host for (optional)" : "A line about you (optional)"} placeholder="Optional" textarea />
        <div style={{ gridColumn: "1 / -1" }}>
          <Button variant="solid">{intent === "host" ? "Register interest to host" : "Register interest to join"}</Button>
        </div>
      </form>
    </div>
  );
}

function Workshops({ embedded }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const glimpses = [
    { label: "SIFAR 2025 · TISS", caption: "SIFAR 2025 · TISS, Mumbai" },
    { label: "Creative Lab Festival 2025", caption: "Creative Lab Festival 2025" },
    { label: "SIFAR 2024 · TISS", caption: "SIFAR 2024 · TISS, Mumbai" },
  ];
  const testimonials = [
    { name: "Dr Ankit Dwivedi", role: "Researcher & Storyteller",
      quote: "Shruti's workshop was free flowing, without many norms or rules. It allowed for slow and subtle nature immersion followed by expression with visual art. I found myself and participants moved by the experience." },
    { name: "Devlina Bhattacharjee", role: "Master's Student, TISS",
      quote: "The session gave me the chance to connect with nature in a way I hadn't before — exploring textures, colours and patterns I normally overlook. Walking around campus, a place I visit daily, felt completely different. Hearing how others interpreted the same environment sparked great conversations and deeper connections." },
  ];
  return (
    <div>
      {!embedded && (
        <NetHeader kicker="Facilitation as practice" title="Immersive Art Workshops"
          keywords={["aesthetic experience", "nature", "unlearning", "play", "publics & participation"]}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "54ch", lineHeight: "var(--lh-normal)" }}>
            A space for deep personal engagement, sensory awareness and collaborative making.
          </p>
        </NetHeader>
      )}

      {/* write-up + a lead image */}
      <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1.1fr 1fr", gap: phone ? "var(--space-5)" : "var(--space-7)", alignItems: "center", margin: embedded ? "0 0 var(--space-7)" : "var(--space-7) 0" }}>
        <div className="longread" style={{ maxWidth: "none" }}>
          <p>Each workshop unfolds through guided mindfulness, sensory attunement and nature-based exploration. Participants gather organic materials and use art as a medium of reflection — translating emotional and sensory perception into visual form.</p>
          <p style={{ color: "var(--ink-200)" }}>Grounded in my master's research and the philosophies of Dewey, Greene and Eisner, they propose an alternative pedagogical space: one that values process over product, and democratises art-making through low-resource, accessible materials — so meaningful engagement is open to all.</p>
        </div>
        <Plate label="workshop — lead image" ratio="4 / 3" />
      </div>

      {/* glimpses */}
      <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Glimpses</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr 1fr" : "repeat(3, 1fr)", gap: "var(--space-5)", marginBottom: "var(--space-9)" }}>
        {glimpses.map((g) => <Plate key={g.label} label={g.label} caption={g.caption} ratio="1 / 1" />)}
      </div>

      {/* testimonials */}
      <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Voices from the experience</Eyebrow>
      {testimonials.map((t, i) => <Testimonial key={t.name} {...t} flip={i % 2 === 1} />)}

      {/* upcoming */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-5)", alignItems: "center",
        border: "1px dotted var(--rule)", borderRadius: "var(--radius-sm)", padding: "var(--space-5) var(--space-6)", marginTop: "var(--space-8)" }}>
        <Eyebrow>Upcoming</Eyebrow>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)" }}>
          Dates and venues announced here. ✦ Register below and I'll let you know when one lands near you.
        </span>
      </div>

      {/* interest / hosting form */}
      <InterestForm />
    </div>
  );
}

Object.assign(window, { Workshops });
