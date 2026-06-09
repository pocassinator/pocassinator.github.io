/* PaperPage.jsx — a proper, routed reading page for an Unmaking essay
   (NOT an overlay). Full essay body in the serif reading voice, references,
   related threads, and a Reflections section. Reached via navigate("paper:<id>").
   Reflections persist in localStorage (per-essay) for this preview. */

function reflectionsKey(id) { return "ss-reflections:" + id; }
function loadReflections(id) {
  try { return JSON.parse(localStorage.getItem(reflectionsKey(id)) || "[]"); } catch (e) { return []; }
}
function saveReflections(id, list) {
  try { localStorage.setItem(reflectionsKey(id), JSON.stringify(list)); } catch (e) {}
}
function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60); if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60); if (h < 24) return h + "h ago";
  const d = Math.floor(h / 24); return d + "d ago";
}

function Reflections({ paperId }) {
  const [list, setList] = React.useState(() => loadReflections(paperId));
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const [focus, setFocus] = React.useState(null);
  React.useEffect(() => { setList(loadReflections(paperId)); }, [paperId]);

  const submit = (e) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    const entry = { id: Date.now(), name: name.trim() || "Anonymous", body, ts: Date.now() };
    const next = [entry, ...list];
    setList(next); saveReflections(paperId, next);
    setText(""); setName("");
  };

  const field = (which) => ({
    width: "100%", boxSizing: "border-box", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)",
    color: "var(--text)", background: "var(--surface-input)", border: "1px solid",
    borderColor: which === focus ? "var(--sage-deep)" : "var(--border)", borderRadius: "var(--radius-sm)",
    padding: "0.6rem 0.75rem", outline: "none", boxShadow: which === focus ? "var(--glow-sage)" : "none", resize: "vertical",
    transition: "border-color var(--dur), box-shadow var(--dur)",
  });

  return (
    <div style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-6)", marginTop: "var(--space-8)" }}>
      <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Reflections</Eyebrow>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", maxWidth: "60ch", lineHeight: "var(--lh-normal)", marginBottom: "var(--space-5)" }}>
        A thinking-in-public space. If the piece stirred something — a question, a disagreement, a memory — leave it here. I read every one.
      </p>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-7)" }}>
        <input value={name} placeholder="Your name (optional)" onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocus("name")} onBlur={() => setFocus(null)} style={field("name")} />
        <textarea value={text} rows={4} placeholder="A thought, a question, a thread you want to pull…"
          onChange={(e) => setText(e.target.value)} onFocus={() => setFocus("text")} onBlur={() => setFocus(null)} style={field("text")} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>Reflections are kept on your device for this preview.</span>
          <Button variant="solid" icon="">Share a reflection</Button>
        </div>
      </form>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>
          {list.length === 0 ? "No reflections yet — be the first." : list.length + (list.length === 1 ? " reflection" : " reflections")}
        </span>
        <span style={{ flex: 1, borderTop: "1px dotted var(--rule)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {list.map((r) => (
          <div key={r.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-3)", alignItems: "start" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--paper-750)", border: "1px solid var(--border)",
              display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--sage)" }}>
              {(r.name || "A").trim().charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)" }}>{r.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)" }}>{timeAgo(r.ts)}</span>
              </div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-base)", color: "var(--ink-200)", lineHeight: "var(--lh-relaxed)", margin: "var(--space-1) 0 0" }}>{r.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* where a "related thread" should link: an essay → its paper page, a field note
   → its note page, the archive node → the Archive, anything else → its theme. */
function relatedNavTarget(node) {
  if (!node) return null;
  if ((window.ESSAY_INDEX || {})[node.id]) return "paper:" + node.id;
  if ((window.FIELD_NOTE_INDEX || {})[node.id]) return "note:" + node.id;
  if (node.id === "archive") return "The Hallucinating Archive";
  if (node.tags && node.tags.length) return "theme:" + node.tags[0];
  return null;
}

function PaperPage({ paperId, onNavigate }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const paper = (window.ESSAY_INDEX || {})[paperId];
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [paperId]);

  const read = { maxWidth: "var(--content-narrow)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
  if (!paper) {
    return (
      <main className="fade-in" style={{ paddingTop: "var(--space-9)" }}>
        <section style={read}>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>That piece isn’t here.</p>
          <Button variant="link" icon="" onClick={() => onNavigate("Unmaking")}>← Back to Unmaking</Button>
        </section>
      </main>
    );
  }
  const related = (paper.related || []).map((id) => (window.ESSAY_INDEX || {})[id] || (window.NODE_INDEX || {})[id]).filter(Boolean);

  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-7)" }}>
      <article style={read}>
        <button onClick={() => onNavigate("Unmaking")}
          style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer",
            fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginBottom: "var(--space-6)" }}>
          ← Unmaking
        </button>

        <Eyebrow style={{ marginBottom: "var(--space-3)" }}>{paper.kind}</Eyebrow>
        <h1 style={{ fontSize: "clamp(1.9rem, 5vw, var(--fs-2xl))", letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-tight)", marginBottom: "var(--space-6)", textWrap: "balance" }}>{paper.title}</h1>

        {/* header image — image to come */}
        <div style={{ margin: "0 0 var(--space-7)" }}>
          <Plate src={paper.image} label="image" ratio="16 / 9" caption={paper.imageCaption || "image to come"} />
        </div>

        <div className="longread" style={{ maxWidth: "none" }}>
          {paper.body.map((para, i) => (
            <p key={i} style={i === 0 ? { fontFamily: "var(--font-serif)", fontSize: "var(--fs-lg)", color: "var(--ink-100)", lineHeight: "var(--lh-relaxed)" } : null}>{para}</p>
          ))}
          {paper.full === false && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", fontStyle: "italic", borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-4)", marginTop: "var(--space-5)" }}>
              This is an overview — a fuller version is coming soon.
            </p>
          )}
        </div>

        {paper.pdf && (
          <div style={{ marginTop: "var(--space-6)" }}>
            <Button variant="outline" size="sm" icon="↓" iconLeft>Download the PDF</Button>
          </div>
        )}

        {paper.tags && paper.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-6)" }}>
            {paper.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}

        <RefList refs={paper.refs} />

        {related.length > 0 && (
          <div style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-5)", marginTop: "var(--space-6)" }}>
            <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Related threads</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", alignItems: "flex-start" }}>
              {related.map((r) => {
                const target = relatedNavTarget(r);
                return (
                  <a key={r.id} href={target ? "#" + target : undefined}
                    onClick={(e) => { if (target) { e.preventDefault(); onNavigate(target); } }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--link-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sage)")}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--sage)",
                      textDecoration: "none", borderBottom: "1px dotted currentColor", cursor: "pointer",
                      transition: "color var(--dur)" }}>{r.title} →</a>
                );
              })}
            </div>
          </div>
        )}

        <Reflections paperId={paper.id} />
      </article>
    </main>
  );
}

/* FieldNotePage — a routed reader for a Field Notes post: the shorter, warmer
   blog version of an Unmaking essay, with a link back to its formal source.
   Reached via navigate("note:<id>"). */
function FieldNotePage({ noteId, onNavigate }) {
  const note = (window.FIELD_NOTE_INDEX || {})[noteId];
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [noteId]);

  const read = { maxWidth: "var(--content-narrow)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
  if (!note) {
    return (
      <main className="fade-in" style={{ paddingTop: "var(--space-9)" }}>
        <section style={read}>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>That note isn’t here.</p>
          <Button variant="link" icon="" onClick={() => onNavigate("Field Notes")}>← Back to Field Notes</Button>
        </section>
      </main>
    );
  }
  const source = note.source ? (window.ESSAY_INDEX || {})[note.source] : null;

  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-7)" }}>
      <article style={read}>
        <button onClick={() => onNavigate("Field Notes")}
          style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer",
            fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginBottom: "var(--space-6)" }}>
          ← Field Notes
        </button>

        <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Field Notes · {note.tag}</Eyebrow>
        <h1 style={{ fontSize: "clamp(1.9rem, 5vw, var(--fs-2xl))", letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-tight)", marginBottom: "var(--space-3)", textWrap: "balance" }}>{note.title}</h1>
        <div style={{ display: "flex", gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", marginBottom: "var(--space-6)" }}>
          <span>{note.date}</span><span>· {note.read} read</span>
        </div>

        {/* header image — image to come */}
        <div style={{ margin: "0 0 var(--space-7)" }}>
          <Plate src={note.image} label="image" ratio="16 / 9" caption={note.imageCaption || "image to come"} />
        </div>

        <div className="longread" style={{ maxWidth: "none" }}>
          {note.body.map((para, i) => (
            <p key={i} style={i === 0 ? { fontFamily: "var(--font-serif)", fontSize: "var(--fs-lg)", color: "var(--ink-100)", lineHeight: "var(--lh-relaxed)" } : null}>{para}</p>
          ))}
        </div>

        {source && (
          <div style={{ borderTop: "1px dotted var(--rule)", paddingTop: "var(--space-5)", marginTop: "var(--space-7)" }}>
            <Eyebrow style={{ marginBottom: "var(--space-2)" }}>The formal version</Eyebrow>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", maxWidth: "60ch", marginBottom: "var(--space-3)" }}>
              This is the shorter, warmer telling. The fuller argument — with its sources and citations — lives in Unmaking.
            </p>
            <Button variant="outline" size="sm" onClick={() => onNavigate("paper:" + source.id)}>Read “{source.title}” in Unmaking</Button>
          </div>
        )}

        {note.themes && note.themes.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-6)" }}>
            {note.themes.map((t) => (
              <button key={t} onClick={() => onNavigate("theme:" + t)}
                style={{ appearance: "none", background: "none", border: 0, padding: 0, cursor: "pointer" }}>
                <Tag>{t}</Tag>
              </button>
            ))}
          </div>
        )}

        <Reflections paperId={"note:" + note.id} />
      </article>
    </main>
  );
}

Object.assign(window, { PaperPage, FieldNotePage, Reflections });
