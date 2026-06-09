/* The Hallucinating Archive — a scholarly microsite within the site.
   Research question up top, CTA to the live system,
   a sticky numbered index, the inquiry framing + a narrative arc (the inquiry,
   how it emerged from the MA dissertation, how it expanded, the prototype,
   theoretical grounding, and development toward its ARISA / Goethe-Institut
   launch), then References. No dates in the arc — client updating. */

function TwoTrack() {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const box = { border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--space-4)",
    fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", background: "var(--paper-850)", color: "var(--text-muted)" };
  const lbl = { fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--sage)", display: "block", marginBottom: "4px", letterSpacing: "var(--ls-wide)" };
  return (
    <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1fr auto 1fr", gap: "var(--space-4)", alignItems: "center", margin: "var(--space-5) 0" }}>
      <div style={box}><span style={lbl}>input</span>a message, sent from anywhere via Telegram or web</div>
      <span style={{ color: "var(--text-ghost)", fontFamily: "var(--font-mono)", textAlign: "center" }}>{phone ? "↓" : "→"}</span>
      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <div style={box}><span style={lbl}>track 1 · private</span>an instrumental reply, to your phone</div>
        <div style={{ ...box, borderColor: "var(--sage-deep)" }}><span style={lbl}>track 2 · public</span>a hallucinated inner monologue, projected over Delhi–Bombay footage &amp; sound</div>
      </div>
    </div>
  );
}

function Chapter({ ch }) {
  const inquiry = ch.kind === "inquiry";
  const paras = ch.body || (ch.note ? [ch.note] : []);
  return (
    <section id={"ch-" + ch.n} style={{ scrollMarginTop: "80px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-4)", marginBottom: "var(--space-3)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--sage)" }}>{ch.n}</span>
        <h2 style={{ fontSize: "var(--fs-lg)" }}>{ch.title}</h2>
        {inquiry && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)", border: "1px dotted var(--rule)", padding: "1px 7px", borderRadius: "var(--radius-sm)" }}>deep dive</span>}
      </div>
      <div style={{ maxWidth: "var(--measure-mono)" }}>
        {paras.map((p, i) => (
          <p key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: i ? "var(--space-3) 0 0" : 0 }}>{p}</p>
        ))}
      </div>
      {ch.n === "04" && <TwoTrack />}
    </section>
  );
}

function Archive() {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const chapters = window.ARCHIVE_CHAPTERS;
  const inquiry = chapters.filter((c) => c.kind === "inquiry");
  const arc = chapters.filter((c) => c.kind === "track");
  const wrap = { maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-8)" }}>
      {/* header */}
      <section style={wrap}>
        <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Interactive installation · research-through-making</Eyebrow>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, var(--fs-3xl))", letterSpacing: "var(--ls-tight)", maxWidth: "16ch", lineHeight: "var(--lh-tight)" }}>The Hallucinating Archive</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", marginTop: "var(--space-3)", letterSpacing: "var(--ls-wide)" }}>Algorithmic Aesthetics, Learning &amp; Identity</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "56ch", lineHeight: "var(--lh-normal)" }}>
          A two-track public installation and research prototype that treats AI hallucination not as an error but as a way of knowing.
        </p>
        <div style={{ border: "1px solid var(--border-strong)", borderLeft: "2px solid var(--sage)", borderRadius: "var(--radius-sm)",
          background: "var(--paper-800)", padding: "var(--space-5) var(--space-6)", margin: "var(--space-6) 0", maxWidth: "62ch" }}>
          <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Research question</Eyebrow>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-lg)", color: "var(--ink-100)", lineHeight: "var(--lh-snug)", margin: 0 }}>
            If a machine's hallucination can be read as an act of perception, what does it teach us about how we ourselves come to know?
          </p>
        </div>
        <Button variant="solid" href="https://tha.shrutisolanki.com" onClick={(e) => e.preventDefault()}>Enter the live Archive</Button>

        {/* installation still — image to come */}
        <div style={{ marginTop: "var(--space-7)", maxWidth: "var(--content-narrow)" }}>
          <Plate label="installation still" ratio="16 / 9" caption="The Hallucinating Archive — installation view (image to come)" />
        </div>
      </section>

      {/* index + body */}
      <section style={{ ...wrap, marginTop: "var(--space-9)", display: "grid", gridTemplateColumns: phone ? "1fr" : "200px 1fr", gap: phone ? "var(--space-6)" : "var(--space-8)", alignItems: "start" }}>
        {!phone && (
          <nav style={{ position: "sticky", top: "80px" }}>
            <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Contents</Eyebrow>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {chapters.map((c) => (
                <li key={c.n}>
                  <a href={"#ch-" + c.n} style={{ display: "flex", gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--sage)" }}>{c.n}</span>{c.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          {chapters.map((c, i) => (
            <div key={c.n} style={{ display: "grid", gridTemplateColumns: "28px 1fr", columnGap: "var(--space-4)", position: "relative" }}>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                {i < chapters.length - 1 && <span style={{ position: "absolute", left: "13px", top: "14px", bottom: "calc(-1 * var(--space-8))", borderLeft: "1px dotted var(--rule)" }} />}
                <span style={{ position: "absolute", left: c.kind === "inquiry" ? "9px" : "10px", top: "6px",
                  width: c.kind === "inquiry" ? "9px" : "7px", height: c.kind === "inquiry" ? "9px" : "7px", borderRadius: "50%",
                  background: c.kind === "inquiry" ? "var(--sage-bright)" : "var(--node-idle)",
                  boxShadow: c.kind === "inquiry" ? "var(--glow-node)" : "none" }} />
              </div>
              <div style={{ paddingBottom: "var(--space-8)" }}><Chapter ch={c} /></div>
            </div>
          ))}

          {/* stills & diagrams — images to come */}
          <section style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-6)", marginBottom: "var(--space-8)" }}>
            <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Stills &amp; diagrams</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1fr 1fr", gap: "var(--space-5)" }}>
              <Plate label="system architecture" ratio="4 / 3" caption="System architecture (diagram to come)" />
              <Plate label="two-track flow" ratio="4 / 3" caption="Two-track flow: input → two outputs (diagram to come)" />
              <Plate label="projection still" ratio="4 / 3" caption="Track 2 — projected monologue over Delhi–Bombay footage (still to come)" />
              <Plate label="input → outputs sample" ratio="4 / 3" caption="One message, two readings (sample to come)" />
            </div>
          </section>

          {/* references */}
          <section>
            <RefList title="References · selected" refs={[
              "Dewey, J. — Art as Experience (1934)", "Greene, M. — Releasing the Imagination (1995)",
              "Eisner, E. — The Arts and the Creation of Mind (2002)", "Merleau-Ponty, M. — Phenomenology of Perception (1945)",
              "Danto, A. C. — The Transfiguration of the Commonplace (1981)", "Ahmed, S. — affect & orientation"]} />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-ghost)", fontStyle: "italic", marginTop: "var(--space-6)" }}>
              This is a working overview of the project — it is evolving, and more will follow as the research develops.
            </p>
          </section>
          <WipNote>A fuller, more detailed account of the Archive — stills, system diagrams and the full research frame — is coming soon.</WipNote>

          {/* credit */}
          <section style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-6)", marginTop: "var(--space-7)" }}>
            <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Credit</Eyebrow>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", maxWidth: "60ch", margin: 0 }}>
              Tech &amp; Automation Wizard for The Hallucinating Archive —{" "}
              <span style={{ color: "var(--text)" }}>Prashant Solanki</span>, my brother.{" "}
              <a href="https://www.instagram.com/borderline.incriminating" target="_blank" rel="noopener noreferrer"
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--link-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sage)")}
                style={{ color: "var(--sage)", whiteSpace: "nowrap", textDecoration: "none", transition: "color var(--dur)" }}>@borderline.incriminating&nbsp;↗</a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Archive });
