/* Making — Art (Abstraction · Semi-abstract) · Digital work · Design.
   Timeline (gallery by series) ⇄ Mycelium (the work web). Works show as
   greyscale placeholder plates until labelled image files are supplied. */

function Lightbox({ work, onClose, onNavigate }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!work) return null;
  const related = (work.related || []).map((id) => window.NODE_INDEX[id]).filter(Boolean);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: "var(--z-dialog)",
      background: "var(--bg-overlay)", backdropFilter: "blur(3px)", display: "grid", placeItems: "center", padding: phone ? "var(--space-4)" : "var(--space-7)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1.4fr 1fr", gap: phone ? "var(--space-4)" : "var(--space-7)",
        maxWidth: "1040px", width: "100%", maxHeight: "86vh", background: "var(--paper-800)",
        border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-pop)", overflow: "hidden" }}>
        <Plate label={work.title} ratio={phone ? "4 / 3" : "1 / 1"} style={{ minHeight: phone ? "240px" : "440px", height: "100%", borderRadius: 0, border: 0 }} />
        <div style={{ padding: phone ? "var(--space-5)" : "var(--space-7) var(--space-7) var(--space-7) 0", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <Eyebrow>{work.series}</Eyebrow>
            <button onClick={onClose} aria-label="Close" style={{ appearance: "none", background: "none", border: 0, color: "var(--text-faint)", cursor: "pointer" }}><Icon name="x" size={16} /></button>
          </div>
          <h2 style={{ fontSize: "var(--fs-xl)", margin: "var(--space-3) 0 var(--space-2)" }}>{work.title}{work.suffix ? <span style={{ color: "var(--text-faint)", fontWeight: 400 }}> · {work.suffix}</span> : null}</h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)" }}>
            {[work.medium, work.size, work.year].filter(Boolean).join(" · ")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", margin: "var(--space-5) 0" }}>
            {work.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          {related.length > 0 && (
            <div style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-4)" }}>
              <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Related threads</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {related.map((r) => (
                  <a key={r.id} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)" }}>{r.title} →</a>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: "var(--space-6)" }}>
            <Button variant="outline" size="sm" onClick={() => { onClose(); onNavigate("Contact"); }}>Write about this work</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryFigure({ work, onOpen }) {
  const [h, setH] = React.useState(false);
  return (
    <figure style={{ margin: 0, cursor: "pointer" }} onClick={() => onOpen(work)}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <Plate label={work.title} ratio="1 / 1"
        style={{ borderColor: h ? "var(--sage-deep)" : "var(--border)", transition: "border-color var(--dur)" }} />
      <figcaption style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-3)", gap: "var(--space-3)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)" }}>{work.title}{work.suffix ? <span style={{ color: "var(--text-ghost)" }}> · {work.suffix}</span> : null}</span>
        {work.year && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>{work.year}</span>}
      </figcaption>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginTop: "2px" }}>{[work.medium, work.size].filter(Boolean).join(" · ")}</div>
    </figure>
  );
}

function CaseStrip({ title, sub, items }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  return (
    <div style={{ marginBottom: "var(--space-9)" }}>
      <NetHeader slim title={title} intensity={0.6} keywords={[sub]}
        right={<span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-ghost)" }}>{sub}</span>} />
      <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "repeat(3, 1fr)", gap: "var(--space-6)", marginTop: "var(--space-6)" }}>
        {items.map((it) => (
          <article key={it.id}>
            <Plate label={it.title} ratio="4 / 3" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-3)", gap: "var(--space-3)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)" }}>{it.title}</span>
              {it.year && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>{it.year}</span>}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--sage)", marginTop: "2px" }}>{it.client || it.kind}</div>
            {it.note && <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginTop: "var(--space-2)", lineHeight: "var(--lh-normal)" }}>{it.note}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

function CaseGrid({ items }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  return (
    <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "repeat(3, 1fr)", gap: "var(--space-6)" }}>
      {items.map((it) => (
        <article key={it.id}>
          <Plate label={it.title} ratio="4 / 3" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-3)", gap: "var(--space-3)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)" }}>{it.title}</span>
            {it.year && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>{it.year}</span>}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--sage)", marginTop: "2px" }}>{it.client || it.kind}</div>
          {it.note && <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginTop: "var(--space-2)", lineHeight: "var(--lh-normal)" }}>{it.note}</p>}
        </article>
      ))}
    </div>
  );
}

function WorkGrid({ works, onOpen }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  return (
    <div style={{ display: "grid", gridTemplateColumns: phone ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: phone ? "var(--space-4)" : "var(--space-6)" }}>
      {works.map((w) => <GalleryFigure key={w.id} work={w} onOpen={onOpen} />)}
    </div>
  );
}

function Making({ onNavigate }) {
  const [mode, setMode] = React.useState("timeline");
  const [box, setBox] = React.useState(null);
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const wrap = { maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
  return (
    <main className="fade-in">
      <section style={wrap}>
        <NetHeader kicker="Painting · digital · illustration · design" title="Making"
          keywords={["abstraction", "chaos", "thread & material", "the sublime", "play", "rasa"]}
          right={<ModeToggle value={mode} onChange={setMode} />}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "54ch", lineHeight: "var(--lh-normal)" }}>
            Each piece is shown in true colour; the dark frame is what unifies the room. Open a thread to see the work. Commissions open.
          </p>
        </NetHeader>
        <div style={{ height: "var(--space-5)" }} />

        {mode === "mycelium" ? (
          <div>
            <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Across sections, by theme</Eyebrow>
            <Mycelium nodes={[...window.WORKS, ...(window.ESSAYS || []).slice(0, 3), ...window.PARTICIPATORY.slice(0, 2), window.NODE_INDEX["archive"]]}
              height={phone ? 380 : 520} seed={7} onOpen={(n) => window.NODE_INDEX[n.id] && n.series && setBox(n)} />
          </div>
        ) : (
          <div>
            <Collapsible title="Making A Mess" count={window.WORKS.length + " works"} defaultOpen
              summary="Paintings — acrylics, charcoal, thread, wood and resin on canvas.">
              <WorkGrid works={window.WORKS} onOpen={setBox} />
            </Collapsible>

            <Collapsible title="Digital Art & Illustrations" count={window.DIGITAL.length + " works"}
              summary="Made in Procreate, Adobe Illustrator & Fresco — vector illustration and digital art.">
              <CaseGrid items={window.DIGITAL} />
            </Collapsible>

            <Collapsible title="Design" count={window.DESIGN.length + " projects"}
              summary="Brand, print & identity — art-deco minimalism, type and image as the only ornament.">
              <CaseGrid items={window.DESIGN} />
              <div style={{ marginTop: "var(--space-6)", paddingTop: "var(--space-5)", borderTop: "1px dotted var(--rule)", display: "flex", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>The full design portfolio lives on Behance.</span>
                <Button variant="outline" size="sm" icon="↗" href="https://www.behance.net/shrutisolanki" onClick={(e) => e.preventDefault()}>View on Behance</Button>
              </div>
            </Collapsible>

            <Collapsible title="Explorations" count="ongoing"
              summary="Random small things I make to think — experiments, offcuts, studies.">
              <div style={{ border: "1px dotted var(--rule)", borderRadius: "var(--radius-sm)", padding: "var(--space-7)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--sage)", fontSize: "var(--fs-lg)", marginBottom: "var(--space-2)" }}>✦</div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", margin: 0, lineHeight: "var(--lh-normal)" }}>
                  A growing shelf of small experiments — to be filled as I make them.
                </p>
              </div>
            </Collapsible>
          </div>
        )}
      </section>
      <Lightbox work={box} onClose={() => setBox(null)} onNavigate={onNavigate} />
    </main>
  );
}

Object.assign(window, { Making, Lightbox });
