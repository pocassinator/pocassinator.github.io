/* The Hallucinating Archive — a single, quiet statement page.
   Content is intentionally minimal: the project write-up, a Work-in-Progress
   marker, and a credit. No chapter spine / diagrams / references for now. */

function Archive() {
  const wrap = { maxWidth: "var(--content-narrow)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
  const para = { fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)",
    lineHeight: "var(--lh-relaxed)", margin: "0 0 var(--space-5)", maxWidth: "64ch" };
  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-8)" }}>
      <section style={wrap}>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, var(--fs-3xl))", letterSpacing: "var(--ls-tight)",
          lineHeight: "var(--lh-tight)", maxWidth: "16ch", marginBottom: "var(--space-7)" }}>The Hallucinating Archive</h1>

        <p style={{ ...para, fontFamily: "var(--font-serif)", fontSize: "var(--fs-lg)", color: "var(--ink-100)", lineHeight: "var(--lh-snug)" }}>
          The Hallucinating Archive is an interactive public art installation and research prototype that treats AI hallucination not as an error to be corrected, but as a way of seeing.
        </p>
        <p style={para}>
          Visitors message the Archive from their own phones, the way they would message anyone. Their words come back to them in two forms: a private, ordinary reply on their screen, and a hallucinatory inner monologue that surfaces in the shared space — projected text drifting over slow footage and soundscapes of the city. The private act of chatting becomes part of a collective, public experience.
        </p>
        <p style={para}>
          The work sits at the intersection of my practice as an artist, educator, and researcher. It is an installation, but it is also a live environment for studying how meaning, mood, and identity are composed — by people and by machines — from the same everyday inputs.
        </p>
        <p style={para}>
          A functioning prototype of the Hallucinating Archive was presented at{" "}
          <span style={{ color: "var(--text)", fontWeight: 700 }}>Unconference 2026, organised by ARISA Foundation at the Goethe-Institut, Pune, in March 2026</span>, where visitors interacted with the system live. The project is currently in development: the interactions gathered there are shaping its ethical guardrails and the next phase of the research.
        </p>
        <p style={{ ...para, color: "var(--text-faint)" }}>More soon.</p>

        <div style={{ marginTop: "var(--space-7)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase",
            letterSpacing: "var(--ls-label)", color: "var(--sage)", border: "1px dotted var(--sage-deep)",
            borderRadius: "var(--radius-sm)", padding: "3px 9px" }}>Work in Progress</span>
        </div>

        {/* credit */}
        <section style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-6)", marginTop: "var(--space-9)" }}>
          <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Credit</Eyebrow>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", maxWidth: "60ch", margin: 0 }}>
            Tech &amp; Automation Wizard for The Hallucinating Archive —{" "}
            <span style={{ color: "var(--text)" }}>Prashant Solanki</span>, my brother.{" "}
            <a href="https://www.instagram.com/borderline.incriminating" target="_blank" rel="noopener noreferrer"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--link-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sage)")}
              style={{ color: "var(--sage)", whiteSpace: "nowrap", textDecoration: "none", transition: "color var(--dur)" }}>@borderline.incriminating&nbsp;↗</a>
          </p>
        </section>
      </section>
    </main>
  );
}

Object.assign(window, { Archive });
