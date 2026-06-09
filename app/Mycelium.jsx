/* Mycelium — the non-linear reading. Works as nodes joined by hand-drawn
   dotted hyphae along shared relations. Hovering a node grows tendrils to its
   kin and dims the rest (the fades-with-use mechanic). Driven by LineNetwork. */

function Mycelium({ nodes: input, height = 460, seed = 12, onOpen, compact = false }) {
  const svgRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const [active, setActive] = React.useState(null);
  const [w, setW] = React.useState(900);

  React.useEffect(() => {
    const measure = () => wrapRef.current && setW(wrapRef.current.clientWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // lay nodes out on a seeded scatter, then connect by `related`
  const layout = React.useMemo(() => {
    const rand = window.LineNetwork.rng(seed);
    const idIndex = {};
    const pts = input.map((n, i) => {
      idIndex[n.id] = i;
      // bias x by series/section for a touch of clustering
      return { ...n, x: 40 + rand() * (w - 80), y: 28 + rand() * (height - 56) };
    });
    const edges = [];
    pts.forEach((n, i) => {
      (n.related || []).forEach((rid) => {
        const j = idIndex[rid];
        if (j != null && j !== i && !edges.some((e) => (e[0] === i && e[1] === j) || (e[0] === j && e[1] === i)))
          edges.push([i, j]);
      });
    });
    return { pts, edges, idIndex };
  }, [input, w, height, seed]);

  React.useEffect(() => {
    if (!svgRef.current || !window.LineNetwork) return;
    const { pts, edges } = layout;
    let drawNodes = pts, drawEdges = edges;
    if (active != null) {
      const kin = new Set([active]);
      edges.forEach((e) => { if (e[0] === active) kin.add(e[1]); if (e[1] === active) kin.add(e[0]); });
      drawNodes = pts.map((n, i) => ({ ...n, dim: !kin.has(i), lit: i === active }));
      drawEdges = edges.filter((e) => e[0] === active || e[1] === active);
    }
    window.LineNetwork.draw(svgRef.current, {
      nodes: drawNodes.map((n) => ({ x: n.x, y: n.y, r: n.lit ? 5 : 3.4, lit: n.lit, dim: n.dim,
        label: compact ? undefined : n.title, labelSize: 11, labelLeft: n.x > w * 0.62 })),
      edges: drawEdges, seed, grow: active == null, wobble: 12,
    });
  }, [layout, active, w, compact]);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height }}>
      <svg ref={svgRef} viewBox={`0 0 ${w} ${height}`} width="100%" height={height} style={{ display: "block" }} />
      {/* interactive hotspots */}
      <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} style={{ position: "absolute", inset: 0 }}>
        {layout.pts.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="16" fill="transparent" style={{ cursor: onOpen ? "pointer" : "default" }}
            onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
            onPointerDown={() => setActive(i)}
            onClick={() => onOpen && onOpen(n)}>
            <title>{n.title}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}

Object.assign(window, { Mycelium });
