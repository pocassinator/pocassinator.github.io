/* Home — the single scrolling page: hero, statement, featured Archive,
   areas of work, a live Mycelium preview, latest Field Notes. */

function HeroNet() {
  const ref = React.useRef(null);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const draw = () => {
      if (!ref.current || !wrapRef.current || !window.LineNetwork) return;
      const w = wrapRef.current.clientWidth, h = wrapRef.current.clientHeight;
      ref.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      window.LineNetwork.auto(ref.current, { width: w, height: h, count: 16, seed: 21, grow: true, wobble: 16 });
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);
  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
      <svg ref={ref} width="100%" height="100%" preserveAspectRatio="none" />
    </div>
  );
}

function Home({ onNavigate }) {
  const wrap = { maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const areas = [
    ["Making", "What I make — painting, thread, digital work, design."],
    ["Unmaking", "What I question — research, writing, the undoing of received ideas."],
    ["In Public", "The work meeting people — exhibitions, workshops, the classroom."],
  ];
  return (
    <main className="fade-in">
      {/* hero */}
      <section style={{ position: "relative", minHeight: "78vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <HeroNet />
        <div style={{ ...wrap, position: "relative" }}>
          <Eyebrow spacing="loose" style={{ marginBottom: "var(--space-5)" }}>Learner · Artist · Educator</Eyebrow>
          <h1 style={{ fontSize: "clamp(2.6rem, 6vw, var(--fs-4xl))", fontWeight: 700, letterSpacing: "var(--ls-tight)",
            lineHeight: "var(--lh-tight)", maxWidth: "18ch" }}>
            My work lives in a dynamic blend of <span style={{ color: "var(--sage)" }}>control</span> and <span style={{ color: "var(--sage)" }}>chaos</span>.
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)",
            maxWidth: "52ch", marginTop: "var(--space-6)", lineHeight: "var(--lh-normal)" }}>
            Painting, writing, teaching — held together by one question about how we come to know.
            Everything here is organised by what it is, not by which hat I wear.
          </p>
          <div style={{ display: "flex", gap: "var(--space-5)", marginTop: "var(--space-7)" }}>
            <Button variant="solid" onClick={() => onNavigate("The Hallucinating Archive")}>Enter the Archive</Button>
            <Button variant="link" icon="" onClick={() => onNavigate("Making")}>See the work →</Button>
          </div>
        </div>
      </section>

      {/* featured: The Hallucinating Archive */}
      <section style={{ ...wrap, marginTop: "var(--space-9)" }}>
        <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1.1fr 1fr", gap: phone ? 0 : "var(--space-8)", alignItems: "center",
          border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--paper-800)" }}>
          <div style={{ padding: phone ? "var(--space-6)" : "var(--space-8)", order: phone ? 2 : 0 }}>
            <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Interactive installation · research</Eyebrow>
            <h2 style={{ fontSize: "var(--fs-2xl)", marginBottom: "var(--space-4)" }}>The Hallucinating Archive</h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-base)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", maxWidth: "46ch" }}>
              It treats AI hallucination not as an error but as a way of knowing — a two-track system
              where a private reply and a public, projected inner monologue meet. The current centre of my research.
            </p>
            <div style={{ marginTop: "var(--space-6)" }}>
              <Button variant="outline" onClick={() => onNavigate("The Hallucinating Archive")}>Read the research</Button>
            </div>
          </div>
          <div style={{ alignSelf: "stretch", minHeight: phone ? "200px" : "320px", order: phone ? 1 : 0,
            background: "var(--paper-850)", borderBottom: phone ? "1px solid var(--border)" : "none", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(236,236,236,0.04) 0 1px, transparent 1px 11px)" }} />
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--text-ghost)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)" }}>image</div>
          </div>
        </div>
      </section>

      {/* areas of work */}
      <section style={{ ...wrap, marginTop: "var(--space-9)" }}>
        <Eyebrow style={{ marginBottom: "var(--space-6)" }}>Areas of work</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          {areas.map(([title, line]) => (
            <button key={title} onClick={() => onNavigate(title === "Unmaking" ? "Unmaking" : title === "In Public" ? "In Public" : "Making")}
              className="area" style={{ appearance: "none", textAlign: "left", background: "none", border: 0, padding: 0, cursor: "pointer" }}>
              <Plate label={title} ratio="4 / 3" />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-3)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-lg)", color: "var(--text)" }}>{title}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--sage)" }}>View →</span>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", marginTop: "var(--space-2)", lineHeight: "var(--lh-normal)" }}>{line}</p>
            </button>
          ))}
        </div>
      </section>

      {/* mycelium preview */}
      <section style={{ ...wrap, marginTop: "var(--space-10)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-2)" }}>
          <Eyebrow>See how the work connects</Eyebrow>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)" }}>hover a node</span>
        </div>
        <div style={{ border: "1px dotted var(--rule)", borderRadius: "var(--radius-sm)", padding: "var(--space-4)" }}>
          <Mycelium nodes={[...window.WORKS.slice(0, 6), ...(window.ESSAYS || []).slice(0, 3), window.NODE_INDEX["archive"]]}
            height={300} seed={9} compact />
        </div>
      </section>

      {/* latest field notes */}
      <section style={{ ...wrap, marginTop: "var(--space-10)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-5)" }}>
          <Eyebrow>Latest from Field Notes</Eyebrow>
          <button onClick={() => onNavigate("Field Notes")}
            style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--sage)" }}>All notes →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          {window.FIELD_NOTES.map((p) => <FieldNoteCard key={p.id} post={p} onNavigate={onNavigate} />)}
        </div>
      </section>
    </main>
  );
}

function FieldNoteCard({ post, onNavigate }) {
  const [h, setH] = React.useState(false);
  return (
    <article role="link" tabIndex={0}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={() => onNavigate("note:" + post.id)}
      onKeyDown={(e) => { if (e.key === "Enter") onNavigate("note:" + post.id); }}
      style={{ borderTop: "1px solid", borderColor: h ? "var(--sage-deep)" : "var(--border-strong)",
        paddingTop: "var(--space-4)", cursor: "pointer", transition: "border-color var(--dur) var(--ease-out)" }}>
      <div style={{ display: "flex", gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)" }}>
        <span style={{ color: "var(--sage)" }}>{post.tag}</span><span>{post.date}</span><span>· {post.read}</span>
      </div>
      <h3 style={{ fontSize: "var(--fs-md)", margin: "var(--space-3) 0 var(--space-2)", color: h ? "var(--sage)" : "var(--text)", transition: "color var(--dur)" }}>{post.title}</h3>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", lineHeight: "var(--lh-normal)" }}>{post.note}</p>
      <span style={{ display: "inline-block", marginTop: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: h ? "var(--sage)" : "var(--text-faint)", transition: "color var(--dur)" }}>Read →</span>
    </article>
  );
}

Object.assign(window, { Home });
