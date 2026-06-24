/* App — simple state router tying nav, screens, the Cortex and footer together.
   Page state persists to localStorage so refreshes keep your place. */

function App() {
  const [page, setPage] = React.useState(() => {
    if (location.hash && location.hash.length > 1) { try { return decodeURIComponent(location.hash.slice(1)); } catch (e) {} }
    return localStorage.getItem("ss-page") || "Home";
  });
  const navigate = (p) => {
    setPage((prev) => { if (!String(p).startsWith("theme:")) localStorage.setItem("ss-prev", prev); return p; });
    localStorage.setItem("ss-page", p);
    // remember what gets visited — the network fires brighter for it over time
    if (window.SSUsage) {
      if (String(p).startsWith("theme:")) window.SSUsage.bump(p.slice(6));
      else window.SSUsage.bump(p);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  window.__ssNav = navigate; // let theme tags anywhere navigate

  const screens = {
    "Home": () => <Home onNavigate={navigate} />,
    "Projects": () => <Projects onNavigate={navigate} />,
    "Making": () => <Making onNavigate={navigate} />,
    "The Hallucinating Archive": () => <Archive />,
    "Unmaking": () => <Unmaking onNavigate={navigate} />,
    "In Public": () => <InPublic />,
    "About": () => <About />,
    "Contact": () => <Contact />,
    "Wares": () => <Wares />,
    "Words": () => <Words onNavigate={navigate} />,
    "Field Notes": () => <FieldNotes onNavigate={navigate} />,
    "Loose Threads": () => <LooseThreads />,
  };
  let Screen;
  if (String(page).startsWith("theme:")) {
    const theme = page.slice(6);
    Screen = () => <Theme theme={theme} onNavigate={navigate} />;
  } else if (String(page).startsWith("paper:")) {
    const id = page.slice(6);
    Screen = () => <PaperPage paperId={id} onNavigate={navigate} />;
  } else if (String(page).startsWith("note:")) {
    const id = page.slice(5);
    Screen = () => <FieldNotePage noteId={id} onNavigate={navigate} />;
  } else {
    Screen = screens[page] || screens["Home"];
  }

  const chromeCurrent = (String(page).startsWith("theme:") || String(page).startsWith("paper:") || String(page).startsWith("note:")) ? "" : page;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav current={chromeCurrent} onNavigate={navigate} />
      <div style={{ flex: 1 }} key={page}>
        <Screen />
      </div>
      {/* global work-in-progress note — appears under every page */}
      <div style={{ borderTop: "1px dotted var(--rule)", padding: "var(--space-5) var(--gutter-wide)", textAlign: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-2xs)", textTransform: "uppercase",
          letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>✦&nbsp; This website is a work in progress &nbsp;✦</span>
      </div>
      <Footer onNavigate={navigate} />
      <Cortex current={chromeCurrent} onNavigate={navigate} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
