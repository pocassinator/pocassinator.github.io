/* Shared ledger row + In Public (Exhibitions · Workshops · Teaching),
   Unmaking (Papers · Alternative) and About (intro · bio · contact). */

function LedgerRow({ year, title, note, meta, tags = [], lit, last }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "grid", gridTemplateColumns: "72px 1fr", columnGap: "var(--space-4)", position: "relative" }}>
      <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", paddingRight: "var(--space-3)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)", paddingTop: "2px", whiteSpace: "nowrap" }}>{year}</span>
        {!last && <span style={{ position: "absolute", right: "calc(-1 * var(--space-3))", top: "10px", bottom: "calc(-1 * var(--space-5))", borderLeft: "1px dotted var(--rule)" }} />}
        <span style={{ position: "absolute", right: "calc(-1 * var(--space-3) - 3px)", top: "6px",
          width: lit ? "8px" : "6px", height: lit ? "8px" : "6px", borderRadius: "50%",
          background: lit ? "var(--sage-bright)" : "var(--node-idle)", boxShadow: lit ? "var(--glow-node)" : "none" }} />
      </div>
      <div style={{ paddingBottom: "var(--space-6)", opacity: h ? 0.8 : 1, transition: "opacity var(--dur)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text)", lineHeight: "var(--lh-snug)" }}>{title}</span>
          {meta && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", whiteSpace: "nowrap" }}>{meta}</span>}
        </div>
        {note && <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)" }}>{note}</p>}
        {tags.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-1)" }}>{tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
      </div>
    </div>
  );
}

function PageHead({ kicker, title, lede, right }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: "var(--space-5)" }}>
        <div>
          <Eyebrow style={{ marginBottom: "var(--space-3)" }}>{kicker}</Eyebrow>
          <h1 style={{ fontSize: "var(--fs-3xl)", letterSpacing: "var(--ls-tight)" }}>{title}</h1>
        </div>
        {right}
      </div>
      {lede && <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-faint)", marginTop: "var(--space-4)", maxWidth: "56ch", lineHeight: "var(--lh-normal)" }}>{lede}</p>}
      <hr style={{ border: 0, borderTop: "1px dotted var(--rule)", margin: "var(--space-6) 0 var(--space-8)" }} />
    </div>
  );
}

const wrapStyle = { maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--gutter-wide)" };

function Subsection({ title, count, children }) {
  return (
    <div style={{ marginBottom: "var(--space-9)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--fs-lg)" }}>{title}</h2>
        <span style={{ flex: 1, borderTop: "1px dotted var(--rule)" }} />
        {count != null && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-ghost)" }}>{count}</span>}
      </div>
      {children}
    </div>
  );
}

/* a styled chronological exhibition line (many items — stays compact) */
function ExhibitionLine({ year, title, meta, last }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "grid", gridTemplateColumns: "56px 1fr", columnGap: "var(--space-4)", alignItems: "baseline",
        padding: "var(--space-3) 0", borderTop: "1px dotted var(--rule)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)" }}>{year}</span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", opacity: h ? 0.8 : 1, transition: "opacity var(--dur)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-base)", color: "var(--text)" }}>{title}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", textAlign: "right" }}>{meta}</span>
      </div>
    </div>
  );
}

function InPublic() {
  const byId = (id) => (window.PARTICIPATORY || []).find((p) => p.id === id);
  const aiPanel = {
    id: "ai-panel", title: "Reimagining Thinking in AI-Influenced Learning Landscapes",
    meta: "Panelist · national webinar · Smt. Kapila Khandvala College of Education · 18 March 2026",
    body: "Learners do not simply “use AI” — they are already learning within it. AI is no longer a tool; it is an environment: invisible, embedded, always-on, woven through the platforms, documents, search and creation we move through daily. The question is not whether to allow it, but how it shapes our modes of engagement — because the same tool produces opposite outcomes depending on how we meet it. As a cognitive partner it can expand thinking; used uncritically it becomes cognitive outsourcing. As a dialogic system it invites questioning and iteration; or it invites blind acceptance. As an assistive ecosystem it widens access; or it breeds dependency. The real work is learning to use AI in a way that enhances how learners continue to think, judge, and make meaning in the world.",
    tags: ["AI / algorithmic", "unlearning"],
  };

  // a simple editorial body for a single participatory/engagement entry
  const EntryBody = ({ item, extra }) => (
    <div>
      {item.meta && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginBottom: "var(--space-3)" }}>{item.meta}</div>}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: "var(--lh-normal)", maxWidth: "64ch", margin: 0 }}>{item.body || item.note}</p>
      {extra}
      {item.tags && item.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
          {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
    </div>
  );

  const collab = [byId("sifar-banner"), byId("in-language-of-abstraction"), byId("mind-mischief")].filter(Boolean);
  const unconf2025 = [byId("in-beyond-the-lines")].filter(Boolean);

  return (
    <main className="fade-in">
      <section style={wrapStyle}>
        <NetHeader kicker="Exhibitions · workshops · talks · teaching" title="In Public"
          keywords={["chaos", "aesthetic experience", "publics & participation", "unlearning", "collaboration", "AI / algorithmic"]}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "56ch", lineHeight: "var(--lh-normal)" }}>
            The many ways the work meets people — facilitated, made together, presented, taught and shown. Open a thread to read more.
          </p>
        </NetHeader>

        <div style={{ marginTop: "var(--space-6)" }}>
          <Collapsible title="Immersive Art Workshops" count="3 editions"
            summary="Sensory, nature-based making — SIFAR 2025 & 2024 (TISS) and the Creative Lab Festival.">
            <Workshops embedded />
          </Collapsible>

          <Collapsible title="Collaborative & participatory works" count={collab.length + " works"}
            summary="Public, co-created and live pieces — others invited onto the canvas and into the meaning.">
            {collab.map((p, i) => (
              <div key={p.id} style={{ paddingTop: i ? "var(--space-6)" : 0, marginTop: i ? "var(--space-6)" : 0, borderTop: i ? "1px dotted var(--rule)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                  <h3 style={{ fontSize: "var(--fs-lg)" }}>{p.title}</h3>
                  {p.year && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)" }}>{p.year}</span>}
                </div>
                <EntryBody item={p} />
              </div>
            ))}
          </Collapsible>

          <Collapsible title="Talks & Panels" count="3"
            summary="Presentations and panels — the ARISA Unconferences (Pune) and a national AI-in-learning webinar.">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                <h3 style={{ fontSize: "var(--fs-lg)" }}>Unconference 2026 — The Hallucinating Archive</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)" }}>28 Mar 2026 · launch</span>
              </div>
              <EntryBody item={{
                meta: "Unconference 2026 · ARISA Foundation · Goethe-Institut, Pune · 28 March 2026",
                body: "The first public activation of The Hallucinating Archive — the two-track prototype launched live, inviting visitors to text the system and watch its hallucinated inner monologue unfold over Delhi–Bombay footage and sound.",
                tags: ["archive", "AI / algorithmic", "publics & participation"],
              }} extra={
                <div style={{ marginTop: "var(--space-4)" }}>
                  <Button variant="outline" size="sm" onClick={() => window.__ssNav && window.__ssNav("The Hallucinating Archive")}>Read the research</Button>
                </div>
              } />
            </div>
            <div style={{ paddingTop: "var(--space-6)", marginTop: "var(--space-6)", borderTop: "1px dotted var(--rule)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                <h3 style={{ fontSize: "var(--fs-lg)" }}>{aiPanel.title}</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)" }}>18 Mar 2026</span>
              </div>
              <EntryBody item={aiPanel} />
            </div>
            {unconf2025.map((p) => (
              <div key={p.id} style={{ paddingTop: "var(--space-6)", marginTop: "var(--space-6)", borderTop: "1px dotted var(--rule)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                  <h3 style={{ fontSize: "var(--fs-lg)" }}>Beyond the Lines <span style={{ color: "var(--text-faint)", fontWeight: 400 }}>— Unconference 2025</span></h3>
                  {p.year && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)" }}>{p.year}</span>}
                </div>
                <EntryBody item={p} />
              </div>
            ))}
          </Collapsible>

          <Collapsible title="Pedagogical practice & learning" count="ongoing"
            summary="Teaching as another site of the same inquiry — learning built around each young person.">
            <div className="longread" style={{ maxWidth: "64ch" }}>
              <p>I work as an advisor at NEXT School, Mulund — India’s first Big Picture school, where learning is built around each young person rather than a fixed syllabus. As a Homeroom Advisor in the Middle Years I teach Visual Arts across the Middle and Primary Years (and, briefly, Language &amp; Literature).</p>
              <p style={{ color: "var(--ink-200)" }}>Much of the work is one-to-one: building individualised learning plans and walking with students through self-directed, real-world passion projects — from 3D modelling and illustration to chess and research in psychology. The classroom becomes another site of the same inquiry that drives the practice.</p>
            </div>
          </Collapsible>

          <Collapsible title="Exhibitions" count={window.EXHIBITIONS.length + " shows"}
            summary="Eighteen group shows across India and one international (Warsaw) — chronological.">
            <div>
              {window.EXHIBITIONS.map((e, i) => <ExhibitionLine key={i} {...e} last={i === window.EXHIBITIONS.length - 1} />)}
            </div>
          </Collapsible>
        </div>
        <WipNote>Each of these is an overview for now — fuller accounts, images and documentation are coming soon.</WipNote>
      </section>
    </main>
  );
}

function StateBadge({ state }) {
  const map = {
    published: { label: "published", color: "var(--sage)" },
    research: { label: "research", color: "var(--text-muted)" },
    pipeline: { label: "in pipeline", color: "var(--text-faint)" },
  };
  const s = map[state] || map.research;
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase",
      letterSpacing: "var(--ls-label)", color: s.color, border: "1px dotted currentColor",
      borderRadius: "var(--radius-sm)", padding: "2px 7px" }}>{s.label}</span>
  );
}

function Unmaking({ onNavigate }) {
  const nav = onNavigate || window.__ssNav || (() => {});
  const essays = window.ESSAYS || [];
  return (
    <main className="fade-in">
      <section style={wrapStyle}>
        <NetHeader kicker="Research & Writing" title="Unmaking"
          keywords={["unlearning", "the sublime", "decolonising", "archive", "abstraction", "aesthetic experience"]}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", color: "var(--text-muted)", marginTop: "var(--space-4)", maxWidth: "58ch", lineHeight: "var(--lh-normal)" }}>
            Shorter, more personal versions of my academic writing — assignments and term papers reworked as essays, references kept at the end. The title is the work: learning, for me, has always meant unlearning first.
          </p>
        </NetHeader>
        <div style={{ marginTop: "var(--space-7)" }}>
          {essays.map((p, i) => (
            <article key={p.id}
              style={{ borderTop: "1px dotted var(--rule)", padding: "var(--space-6) 0", display: "grid",
                gridTemplateColumns: "1fr", gap: "var(--space-2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-4)", flexWrap: "wrap" }}>
                <a href={"#paper:" + p.id} onClick={(e) => { e.preventDefault(); nav("paper:" + p.id); }}
                  style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--fs-xl)", letterSpacing: "var(--ls-tight)", color: "var(--text)", textDecoration: "none", lineHeight: "var(--lh-snug)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}>{p.title}</a>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-ghost)", whiteSpace: "nowrap" }}>{p.kind}</span>
              </div>
              {p.lede && <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-md)", color: "var(--ink-200)", lineHeight: "var(--lh-relaxed)", margin: "var(--space-2) 0 0", maxWidth: "64ch" }}>{p.lede}</p>}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginTop: "var(--space-3)", flexWrap: "wrap" }}>
                <Button variant="link" icon="" onClick={() => nav("paper:" + p.id)}>Read more →</Button>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                  {(p.tags || []).slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <WipNote>More writing is on its way — curation as a pedagogical tool, reflective notes from the live sessions, and pieces still being edited. Fuller, more detailed versions of these essays are coming soon.</WipNote>
      </section>
    </main>
  );
}

function About() {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-8)" }}>
      <section style={{ ...wrapStyle, maxWidth: "var(--content-narrow)" }}>
        <PageHead kicker="Intro · bio · contact" title="About" />
        <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "200px 1fr", gap: phone ? "var(--space-5)" : "var(--space-7)", alignItems: "start" }}>
          <div style={{ width: phone ? "160px" : "auto" }}>
            <Plate label="portrait" tall />
          </div>
          <div className="longread">
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-lg)", color: "var(--ink-100)", lineHeight: "var(--lh-snug)", marginBottom: "var(--space-5)" }}>
              What do you do when there are no words? Why this need to express? To release? What does it mean to be me?
            </p>
            <p>Colour brings a synergy — a moment of intermingling and release, of unison with me and the world. Where does the world stop and I begin?</p>
            <p>I navigate the intersection of the personal and the pedagogical — as an individual, artist, facilitator and researcher. My immersive workshops, research, and facilitation stem from lived experience and philosophical inquiry. I explore art as a space of meaning-making: a dialogue with the world, as reflection, disruption, and transformation.</p>
            <p>Alongside the practice, I teach at NEXT School, Mulund — India’s first Big Picture school. I work as a Homeroom Advisor in the Middle Years and teach Visual Arts across the Middle and Primary Years (and, briefly, Language &amp; Literature). The Big Picture model means much of the work is one-to-one: building individualised learning plans and walking with young people through self-directed, real-world passion projects — from 3D modelling and illustration to chess and research in psychology.</p>
            <p style={{ color: "var(--text-muted)" }}>Based between Delhi and Mumbai, working through making, writing and teaching.</p>

            <div style={{ borderTop: "1px dotted var(--rule)", marginTop: "var(--space-6)", paddingTop: "var(--space-5)" }}>
              <Eyebrow style={{ marginBottom: "var(--space-4)" }}>Education</Eyebrow>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {[
                  { deg: "MA Education", inst: "Tata Institute of Social Sciences, Mumbai", yr: "2023–25" },
                  { deg: "B.Ed · Social Science Pedagogy", inst: "Maharshi Dayanand University, Haryana", yr: "2021–23" },
                  { deg: "BA · Political Science", inst: "IGNOU, New Delhi", yr: "2018–21" },
                  { deg: "D.El.Ed · Social Science & English Pedagogy", inst: "DIET / SCERT, New Delhi", yr: "2018–20" },
                  { deg: "Bachelor of Business Studies", inst: "Shaheed Sukhdev College of Business Studies, University of Delhi", yr: "2014–17" },
                ].map((e) => (
                  <li key={e.deg} style={{ display: "grid", gridTemplateColumns: "64px 1fr", columnGap: "var(--space-4)", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", color: "var(--text-faint)" }}>{e.yr}</span>
                    <span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-base)", color: "var(--text)", display: "block" }}>{e.deg}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)" }}>{e.inst}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
              <Button variant="link" icon="" href="mailto:shrutisolanki1226@gmail.com" onClick={(e) => e.preventDefault()}>shrutisolanki1226@gmail.com</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Contact() {
  const phone = window.useIsPhone ? window.useIsPhone() : false;
  const formRef = React.useRef(null);
  const { status, submit } = window.useFormSubmit(window.SS_FORMS.contact);
  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    await submit({ name: fd.get("name"), email: fd.get("email"), message: fd.get("message") });
  };
  const note = {
    sending: { c: "var(--text-faint)", t: "Sending…" },
    error: { c: "var(--text-muted)", t: "Something went wrong. Please email hi@shrutisolanki.com instead." },
    unconfigured: { c: "var(--text-faint)", t: "This form isn't connected yet — please write to me directly using the addresses on the left." },
  }[status];
  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-8)" }}>
      <section style={{ ...wrapStyle, maxWidth: "var(--content-narrow)" }}>
        <PageHead kicker="Write to me" title="Contact"
          lede="To reflect, share, ask, or start a conversation about the work — not just to enquire. I read everything." />
        <div style={{ display: "grid", gridTemplateColumns: phone ? "1fr" : "1fr 1fr", gap: phone ? "var(--space-6)" : "var(--space-8)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <div>
              <Eyebrow style={{ marginBottom: "var(--space-2)" }}>Write to me</Eyebrow>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", margin: "0 0 var(--space-3)", lineHeight: "var(--lh-normal)", maxWidth: "34ch" }}>
                To reflect, share, ask, or start a conversation — not just to enquire.
              </p>
              <a href="mailto:shrutisolanki1226@gmail.com" style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--fs-md)", marginBottom: "var(--space-2)" }}>shrutisolanki1226@gmail.com</a>
              <a href="mailto:hi@shrutisolanki.com" style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>hi@shrutisolanki.com</a>
            </div>
            <div>
              <Eyebrow style={{ marginBottom: "var(--space-3)" }}>Elsewhere</Eyebrow>
              <div style={{ display: "flex", gap: "var(--space-4)", color: "var(--text-muted)" }}>
                <a href="#" style={{ color: "inherit" }} aria-label="Instagram"><Icon name="instagram" /></a>
                <a href="#" style={{ color: "inherit" }} aria-label="LinkedIn"><Icon name="linkedin" /></a>
                <a href="#" style={{ color: "inherit" }} aria-label="GitHub"><Icon name="github" /></a>
              </div>
            </div>
          </div>
          {status === "sent" ? (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text)", lineHeight: "var(--lh-normal)", maxWidth: "44ch" }}>
              Thank you — your message is on its way. I read everything, and I'll write back.
            </p>
          ) : (
          <form ref={formRef} onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <ContactField label="Your name" name="name" placeholder="Name" required />
            <ContactField label="Your email" name="email" type="email" placeholder="you@example.com" required />
            <ContactField label="Message" name="message" textarea placeholder="A thought, a question, a thread you want to pull…" required />
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
              <Button variant="solid" disabled={status === "sending"}>Send</Button>
              {note && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: note.c, maxWidth: "40ch", lineHeight: "var(--lh-normal)" }}>{note.t}</span>}
            </div>
          </form>
          )}
        </div>
      </section>
    </main>
  );
}

function ContactField({ label, placeholder, textarea, name, type = "text", required }) {
  const [f, setF] = React.useState(false);
  const s = { width: "100%", boxSizing: "border-box", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)",
    color: "var(--text)", background: "var(--surface-input)", border: "1px solid",
    borderColor: f ? "var(--sage-deep)" : "var(--border)", borderRadius: "var(--radius-sm)",
    padding: "0.6rem 0.75rem", outline: "none", boxShadow: f ? "var(--glow-sage)" : "none", resize: "vertical" };
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", marginBottom: "var(--space-2)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>{label}</span>
      {textarea
        ? <textarea rows={4} name={name} required={required} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={s} />
        : <input type={type} name={name} required={required} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={s} />}
    </label>
  );
}

function Wares() {
  return (
    <main className="fade-in" style={{ paddingTop: "var(--space-8)" }}>
      <section style={{ ...wrapStyle, maxWidth: "var(--content-narrow)" }}>
        <PageHead kicker="Take home" title="Wares"
          lede="Prints and small things live on a separate shop. This page is a single quiet door out." />
        <Button variant="outline" icon="↗">Visit the shop</Button>
      </section>
    </main>
  );
}

Object.assign(window, { InPublic, Unmaking, About, Contact, Wares, LedgerRow, StateBadge });
