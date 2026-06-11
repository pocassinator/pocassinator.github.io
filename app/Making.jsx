/* Making — Art (Abstraction · Semi-abstract) · Digital work · Design.
   Timeline (gallery by series) ⇄ Mycelium (the work web). Works show as
   greyscale placeholder plates until labelled image files are supplied. */

/* a viewport-fitting image panel: the whole artwork shows at once (object-fit
   contain), with a hatch placeholder until a real image is supplied. */
function LightboxImage({ work, phone }) {
  return (
    <div style={{ position: "relative", flex: phone ? "0 0 auto" : "1 1 58%", minWidth: 0, minHeight: 0,
      height: phone ? "42vh" : "auto", background: "var(--paper-850)", display: "grid", placeItems: "center", overflow: "hidden" }}>
      {work.image ? (
        <img src={work.image} alt={work.title}
          style={{ maxWidth: "100%", maxHeight: phone ? "42vh" : "92vh", objectFit: "contain", display: "block" }} />
      ) : (
        <React.Fragment>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(236,236,236,0.04) 0 1px, transparent 1px 11px)" }} />
          <div style={{ textAlign: "center", color: "var(--text-ghost)", fontFamily: "var(--font-mono)", position: "relative" }}>
            <div style={{ fontSize: "var(--fs-2xl)", opacity: 0.5 }}>▦</div>
            <div style={{ fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", marginTop: "var(--space-2)" }}>{work.title}</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function NavArrow({ side, onClick, label }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }} aria-label={label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: "10px", zIndex: 2,
        appearance: "none", cursor: "pointer", width: "40px", height: "40px", borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-strong)", background: h ? "var(--sage)" : "color-mix(in srgb, var(--paper-900) 80%, transparent)",
        color: h ? "var(--text-on-sage)" : "var(--text)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-lg)", lineHeight: 1,
        display: "grid", placeItems: "center", transition: "background var(--dur), color var(--dur)" }}>
      {side === "left" ? "‹" : "›"}
    </button>
  );
}

function Lightbox({ work, works, onSelect, onClose, onNavigate }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const list = works || [];
  const idx = work ? list.findIndex((w) => w.id === work.id) : -1;
  const hasNav = idx >= 0 && list.length > 1;
  const go = (dir) => { if (idx < 0) return; const n = (idx + dir + list.length) % list.length; onSelect(list[n]); };
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (hasNav && e.key === "ArrowRight") go(1);
      else if (hasNav && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, hasNav, idx, list]);
  if (!work) return null;
  const related = (work.related || []).map((id) => window.NODE_INDEX[id]).filter(Boolean);
  const meta = [work.medium, work.size, work.year].filter(Boolean).join(" · ");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: "var(--z-dialog)",
      background: "var(--bg-overlay)", backdropFilter: "blur(3px)", display: "grid", placeItems: "center", padding: phone ? "var(--space-3)" : "var(--space-6)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", flexDirection: phone ? "column" : "row",
        width: "100%", maxWidth: "1100px", maxHeight: "92vh", background: "var(--paper-800)",
        border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-pop)", overflow: "hidden" }}>

        <div style={{ position: "relative", display: "flex", flex: phone ? "0 0 auto" : "1 1 58%", minHeight: 0 }}>
          <LightboxImage work={work} phone={phone} />
          {hasNav && <NavArrow side="left" onClick={() => go(-1)} label="Previous work" />}
          {hasNav && <NavArrow side="right" onClick={() => go(1)} label="Next work" />}
        </div>

        <div style={{ flex: phone ? "1 1 auto" : "0 0 42%", padding: phone ? "var(--space-5)" : "var(--space-7)",
          overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "var(--space-3)" }}>
            <Eyebrow>{work.series || "Work"}{hasNav ? "  ·  " + (idx + 1) + " / " + list.length : ""}</Eyebrow>
            <button onClick={onClose} aria-label="Close" style={{ appearance: "none", background: "none", border: 0, color: "var(--text-faint)", cursor: "pointer" }}><Icon name="x" size={16} /></button>
          </div>
          <h2 style={{ fontSize: "var(--fs-xl)", margin: "var(--space-3) 0 var(--space-2)" }}>{work.title}{work.suffix ? <span style={{ color: "var(--text-faint)", fontWeight: 400 }}> · {work.suffix}</span> : null}</h2>
          {meta && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)" }}>{meta}</div>}
          {work.tags && work.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", margin: "var(--space-5) 0" }}>
              {work.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          )}
          {related.length > 0 && (
            <div style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-4)" }}>
              <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Related threads</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", alignItems: "flex-start" }}>
                {related.map((r) => {
                  const target = window.relatedNavTarget ? window.relatedNavTarget(r) : null;
                  return (
                    <a key={r.id} href={target ? "#" + target : undefined}
                      onClick={(e) => { if (target) { e.preventDefault(); onClose(); onNavigate(target); } }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--link-hover)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sage)")}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--sage)",
                        textDecoration: "none", borderBottom: "1px dotted currentColor", cursor: "pointer", transition: "color var(--dur)" }}>{r.title} →</a>
                  );
                })}
              </div>
            </div>
          )}

          {/* prev / next + write */}
          <div style={{ marginTop: "auto", paddingTop: "var(--space-6)" }}>
            {hasNav && (
              <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                <button onClick={() => go(-1)} style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer",
                  fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", textAlign: "left", maxWidth: "48%" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                  ← {list[(idx - 1 + list.length) % list.length].title}
                </button>
                <button onClick={() => go(1)} style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer",
                  fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", textAlign: "right", maxWidth: "48%" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                  {list[(idx + 1) % list.length].title} →
                </button>
              </div>
            )}
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
      <Plate src={work.image} label={work.title} ratio="1 / 1"
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
            <Plate src={it.image} label={it.title} ratio="4 / 3" />
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
      <Lightbox work={box} works={window.WORKS} onSelect={setBox} onClose={() => setBox(null)} onNavigate={onNavigate} />
    </main>
  );
}

Object.assign(window, { Making, Lightbox });
