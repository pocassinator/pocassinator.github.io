/* Words.jsx — the writing rooms.
   - Words        : a landing page that introduces the two registers and links in
   - FieldNotes   : essays for a general reader (expanded from the formal work)
   - LooseThreads : notes, process, WIP, reflective-journal scraps & poems
   All three carry the living cursor-net behind their headers. */

const wWrap = { maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter-wide)" };
const wRead = { maxWidth: "var(--content-narrow)", margin: "0 auto", padding: "0 var(--gutter-wide)" };

/* ----------------------------- Words landing ----------------------------- */
function Words({ onNavigate }) {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const rooms = [
    { key: "Field Notes", sub: "essays · art · aesthetics · learning",
      blurb: "Longer reads for a general reader — the dissertation and term papers reworked warmer and shorter, each linking back to its formal source.",
      count: (window.FIELD_NOTES || []).length, kw: ["aesthetic experience", "unlearning", "the sublime"] },
    { key: "Loose Threads", sub: "notes · process · WIP",
      blurb: "The workshop floor of the writing — fragments, reflective-journal scraps, half-formed questions, poems, and work still in pipeline.",
      count: (window.LOOSE_THREADS || []).length, kw: ["chaos", "process", "reflection"] },
  ];
  return (
    <main className="fade-in">
      <section style={wWrap}>
        <NetHeader kicker="Writing" title="Words"
          keywords={["aesthetic experience", "unlearning", "chaos", "the sublime", "reflection", "process"]}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "54ch", lineHeight: "var(--lh-normal)" }}>
            Two registers of one practice of thinking-on-the-page. Move your cursor through the field.
          </p>
        </NetHeader>
        <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1fr 1fr", gap: "var(--space-6)", marginTop: "var(--space-7)" }}>
          {rooms.map((r) => (
            <button key={r.key} onClick={() => onNavigate(r.key)}
              style={{ appearance: "none", textAlign: "left", cursor: "pointer",
                background: "var(--paper-800)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)",
                transition: "border-color var(--dur) var(--ease-out)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--sage-deep)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h2 style={{ fontSize: "var(--fs-xl)" }}>{r.key}</h2>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--sage)" }}>{r.count} →</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>{r.sub}</div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: 0 }}>{r.blurb}</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ------------------------------ Field Notes ------------------------------ */
function FieldNotes({ onNavigate }) {
  const notes = window.FIELD_NOTES || [];
  return (
    <main className="fade-in">
      <section style={wWrap}>
        <NetHeader kicker="Words · blog" title="Field Notes"
          keywords={["aesthetic experience", "unlearning", "the sublime", "neuroaesthetics", "abstraction"]}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "54ch", lineHeight: "var(--lh-normal)" }}>
            Essays for a general reader. The same inquiries as Unmaking, told warmer and shorter.
          </p>
        </NetHeader>
        <div style={{ marginTop: "var(--space-7)", borderTop: "1px dotted var(--rule)" }}>
          {notes.map((p, i) => <NoteRow key={i} post={p} onNavigate={onNavigate} />)}
        </div>
        <WipNote>More posts in progress — drawn from the dissertation, the Pedagogy of Chaos work, and the Beyond the Lines notes. Fuller, more detailed versions are coming soon.</WipNote>
      </section>
    </main>
  );
}

function NoteRow({ post, onNavigate }) {
  const [h, setH] = React.useState(false);
  return (
    <article onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      role="link" tabIndex={0}
      onClick={() => onNavigate && onNavigate("note:" + post.id)}
      onKeyDown={(e) => { if (e.key === "Enter") onNavigate && onNavigate("note:" + post.id); }}
      style={{ padding: "var(--space-5) 0", borderBottom: "1px dotted var(--rule)", cursor: "pointer" }}>
      <div style={{ display: "flex", gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", marginBottom: "var(--space-2)" }}>
        <span style={{ color: "var(--sage)" }}>{post.tag}</span><span>{post.date}</span><span>· {post.read}</span>
      </div>
      <h3 style={{ fontSize: "var(--fs-lg)", color: h ? "var(--sage)" : "var(--text)", transition: "color var(--dur)" }}>{post.title}</h3>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginTop: "var(--space-2)", maxWidth: "62ch", lineHeight: "var(--lh-normal)" }}>{post.note}</p>
      <span style={{ display: "inline-block", marginTop: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: h ? "var(--sage)" : "var(--text-faint)", transition: "color var(--dur)" }}>Read the note →</span>
    </article>
  );
}

/* ----------------------------- Loose Threads ----------------------------- */
function LooseThreads() {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const items = window.LOOSE_THREADS || [];
  return (
    <main className="fade-in">
      <section style={wWrap}>
        <NetHeader kicker="Words · notes, process, WIP" title="Loose Threads"
          keywords={["chaos", "process", "reflection", "unlearning", "play"]}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "54ch", lineHeight: "var(--lh-normal)" }}>
            Unfinished by design — fragments, journal scraps, poems and questions still being pulled.
          </p>
        </NetHeader>
        <div style={{ marginTop: "var(--space-7)", columnGap: "var(--space-6)", columns: phone ? 1 : 2 }}>
          {items.map((it, i) => <ThreadCard key={i} item={it} />)}
        </div>
        <WipNote>These are fragments by nature — but more notes, drafts and scraps are coming soon.</WipNote>
      </section>
    </main>
  );
}

function ThreadCard({ item }) {
  const isPoem = item.kind === "poem";
  return (
    <div style={{ breakInside: "avoid", marginBottom: "var(--space-6)",
      background: "var(--paper-800)", border: "1px solid var(--border)", borderLeft: "2px solid var(--sage-deep)",
      borderRadius: "var(--radius-sm)", padding: "var(--space-5)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-3)", gap: "var(--space-3)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>{item.kind}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--sage)" }}>· {item.tag}</span>
      </div>
      <h3 style={{ fontSize: "var(--fs-md)", marginBottom: "var(--space-3)", fontStyle: isPoem ? "italic" : "normal" }}>{item.title}</h3>
      {isPoem ? (
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-md)", color: "var(--ink-200)", lineHeight: "var(--lh-relaxed)" }}>
          {item.body.map((line, i) => <div key={i} style={{ minHeight: line === "" ? "0.8em" : undefined }}>{line}</div>)}
        </div>
      ) : (
        item.body.map((para, i) => (
          <p key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", margin: "0 0 var(--space-2)" }}>{para}</p>
        ))
      )}
    </div>
  );
}

Object.assign(window, { Words, FieldNotes, LooseThreads });
