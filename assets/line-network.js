/* ============================================================
   line-network.js — the one signature gesture
   Hand-drawn, slightly irregular dotted "hyphae" connecting nodes.
   Two scales share this code:
     • Mycelium (micro) — works webbed by theme
     • Cortex   (macro) — the site map as a neural diagram
   Vanilla + dependency-free so it works in plain cards AND inside
   React (call LineNetwork.draw from a ref in useEffect).
   Honours prefers-reduced-motion (threads appear already drawn).
   Exposes: window.LineNetwork
   ============================================================ */
(function () {
  const SVGNS = "http://www.w3.org/2000/svg";
  const reduceMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // small deterministic PRNG so a given seed always draws the same web
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  // an irregular, hand-drawn path between two points (perpendicular jitter)
  function wobblePath(ax, ay, bx, by, rand, wob) {
    const dx = bx - ax, dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;          // perpendicular
    const segs = Math.max(2, Math.round(len / 60));
    let d = `M ${ax.toFixed(1)} ${ay.toFixed(1)}`;
    let px = ax, py = ay;
    for (let i = 1; i <= segs; i++) {
      const t = i / segs;
      const off = (rand() - 0.5) * (wob != null ? wob : 14) * Math.sin(t * Math.PI);
      const cxOff = (rand() - 0.5) * 10;
      const x = ax + dx * t + nx * off;
      const y = ay + dy * t + ny * off;
      const mx = (px + x) / 2 + nx * cxOff;
      const my = (py + y) / 2 + ny * cxOff;
      d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
      px = x; py = y;
    }
    return d;
  }

  function el(tag, attrs) {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* draw(svg, opts)
     opts.nodes : [{x, y, r?, label?, lit?, dim?}]
     opts.edges : [[i, j], ...]   (indices into nodes)
     opts.grow  : animate the threads growing (default true)
     opts.pulse : send faint signal pulses along edges (default false)
     opts.seed  : PRNG seed (default 7)
     opts.wobble: jitter amount in px (default 14)
  */
  function draw(svg, opts) {
    opts = opts || {};
    const nodes = opts.nodes || [];
    const edges = opts.edges || [];
    const rand = rng(opts.seed || 7);
    const grow = opts.grow !== false && !reduceMotion();
    const css = getComputedStyle(document.documentElement);
    const thread = (css.getPropertyValue("--thread") || "rgba(156,175,136,.55)").trim();
    const threadDim = (css.getPropertyValue("--thread-dim") || "rgba(156,175,136,.28)").trim();
    const nodeCol = (css.getPropertyValue("--node") || "#BFD0AC").trim();
    const nodeIdle = (css.getPropertyValue("--node-idle") || "#6E6C63").trim();

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const gEdges = el("g", {}); const gNodes = el("g", {});
    svg.appendChild(gEdges); svg.appendChild(gNodes);

    edges.forEach((e, idx) => {
      const a = nodes[e[0]], b = nodes[e[1]];
      if (!a || !b) return;
      const dimmed = a.dim || b.dim;
      const p = el("path", {
        d: wobblePath(a.x, a.y, b.x, b.y, rand, opts.wobble),
        fill: "none",
        stroke: dimmed ? threadDim : thread,
        "stroke-width": 1.25,
        "stroke-linecap": "round",
        "stroke-dasharray": "1 6",
      });
      gEdges.appendChild(p);
      if (grow) {
        const L = p.getTotalLength();
        p.style.strokeDasharray = L + " " + L;
        p.style.strokeDashoffset = String(L);
        p.style.transition = `stroke-dashoffset var(--dur-grow,900ms) var(--ease-thread,ease)`;
        // stagger, then settle back to the dotted hyphae pattern
        setTimeout(() => {
          p.style.strokeDashoffset = "0";
          setTimeout(() => { p.style.transition = "none"; p.style.strokeDasharray = "1 6"; }, 950);
        }, 60 + idx * 70);
      }
      if (opts.pulse && !reduceMotion() && !dimmed) {
        const dot = el("circle", { r: 1.8, fill: nodeCol });
        const mo = el("animateMotion", {
          dur: (2.6 + rand() * 1.8).toFixed(2) + "s",
          repeatCount: "indefinite",
          path: p.getAttribute("d"),
          begin: (rand() * 2).toFixed(2) + "s",
        });
        dot.appendChild(mo); gEdges.appendChild(dot);
      }
    });

    nodes.forEach((n) => {
      const r = n.r || (n.lit ? 4.5 : 3);
      const c = el("circle", {
        cx: n.x, cy: n.y, r: r,
        fill: n.lit ? nodeCol : (n.dim ? nodeIdle : nodeCol),
        opacity: n.dim ? 0.5 : 1,
      });
      if (n.lit) c.setAttribute("filter", "url(#ln-glow)");
      gNodes.appendChild(c);
      if (n.label) {
        const t = el("text", {
          x: n.x + (n.labelLeft ? -8 : 8),
          y: n.y + 3,
          fill: n.lit ? nodeCol : nodeIdle,
          "text-anchor": n.labelLeft ? "end" : "start",
          "font-family": "var(--font-mono, monospace)",
          "font-size": n.labelSize || 11,
        });
        t.textContent = n.label;
        gNodes.appendChild(t);
      }
    });

    // soft glow filter for lit nodes
    if (!svg.querySelector("#ln-glow")) {
      const defs = el("defs", {});
      defs.innerHTML =
        '<filter id="ln-glow" x="-200%" y="-200%" width="500%" height="500%">' +
        '<feGaussianBlur stdDeviation="2.4" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
      svg.insertBefore(defs, svg.firstChild);
    }
  }

  /* auto(svg, opts) — scatter `count` nodes in the viewBox and connect
     each to its nearest neighbours. Good for ambient hero / preview webs. */
  function auto(svg, opts) {
    opts = opts || {};
    const w = opts.width || 600, h = opts.height || 200;
    const count = opts.count || 10;
    const rand = rng(opts.seed || 3);
    const nodes = [];
    for (let i = 0; i < count; i++)
      nodes.push({ x: 20 + rand() * (w - 40), y: 16 + rand() * (h - 32), r: 2 + rand() * 1.5 });
    const edges = [];
    for (let i = 0; i < count; i++) {
      const dists = nodes.map((n, j) => [j, Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y)])
        .filter((d) => d[0] !== i).sort((a, b) => a[1] - b[1]);
      const links = 1 + Math.floor(rand() * 2);
      for (let k = 0; k < links && k < dists.length; k++) {
        const j = dists[k][0];
        if (!edges.some((e) => (e[0] === i && e[1] === j) || (e[0] === j && e[1] === i)))
          edges.push([i, j]);
      }
    }
    draw(svg, Object.assign({ nodes, edges }, opts));
    return { nodes, edges };
  }

  window.LineNetwork = { draw, auto, wobblePath, rng };
})();
