/* cursor-net.js — the mycelial network as a LIVING background.
   A faint web of nodes + dotted hyphae sits behind a header or article.
   As the cursor moves, nearby nodes "fire" (brighten, swell, glow) and the
   threads between them light up; keyword labels woven into the mesh flare to
   sage when the cursor passes near. Idle, it is barely there.

   Canvas-based + self-contained. Honours prefers-reduced-motion (renders a
   static faint web, no firing). Use behind sub-section headers and blogs.

   window.CursorNet.mount(container, {
     keywords: ["chaos","abstraction",...],  // woven into the mesh
     density: 22,        // approx node count
     seed: 7,
     radius: 180,        // cursor influence radius (px)
     intensity: 1,       // 0..1 overall brightness
   }) -> returns destroy()
*/
(function () {
  /* ---- usage memory: themes & tabs you visit most fire brighter ----
     Keys are theme words ("chaos") and tab names ("Making"). Cached, so
     reading a weight each frame is O(1). Invalidated on bump(). */
  const SSUsage = (function () {
    const KEY = "ss-usage";
    let cache = null, max = 1;
    function load() {
      if (cache) return cache;
      try { cache = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { cache = {}; }
      max = 1; for (const k in cache) if (cache[k] > max) max = cache[k];
      return cache;
    }
    return {
      bump: function (k, n) {
        if (!k) return; const o = load(); o[k] = (o[k] || 0) + (n || 1);
        try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
        cache = null; // recompute max next read
        try { window.dispatchEvent(new CustomEvent("ss-usage")); } catch (e) {}
      },
      weight: function (k) { if (!k) return 0; const o = load(); return (o[k] || 0) / max; },
      all: function () { return load(); },
    };
  })();
  window.SSUsage = SSUsage;

  function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  // parse #rrggbb or rgb()/rgba() to [r,g,b]
  function toRGB(c) {
    c = (c || "").trim();
    if (c[0] === "#") {
      if (c.length === 4) c = "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
      return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    }
    const m = c.match(/(\d+\.?\d*)/g);
    return m ? [+m[0], +m[1], +m[2]] : [156, 175, 136];
  }
  const lerp = (a, b, t) => a + (b - a) * t;
  const mix = (c1, c2, t) => [Math.round(lerp(c1[0], c2[0], t)), Math.round(lerp(c1[1], c2[1], t)), Math.round(lerp(c1[2], c2[2], t))];
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  function mount(container, opts) {
    opts = opts || {};
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const density = opts.density || 22;
    const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const R = (opts.radius || 180) * (coarse ? 1.15 : 1);
    const intensity = opts.intensity == null ? 1 : opts.intensity;
    const keywords = opts.keywords || [];
    const rand = rng(opts.seed || 7);

    const COL = {
      idle: toRGB(cssVar("--node-idle", "#6B6B6B")),
      thread: toRGB(cssVar("--sage", "#9CAF88")),
      fire: toRGB(cssVar("--sage-bright", "#BFD0AC")),
      faint: toRGB(cssVar("--text-faint", "#6B6B6B")),
    };

    if (getComputedStyle(container).position === "static") container.style.position = "relative";
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, { position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "0" });
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [], edges = [];
    const mouse = { x: -9999, y: -9999, on: false };

    function build() {
      const rect = container.getBoundingClientRect();
      W = Math.max(1, rect.width); H = Math.max(1, rect.height);
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r2 = rng(opts.seed || 7);
      const n = Math.max(6, Math.round(density * (W / 900)));
      nodes = [];
      for (let i = 0; i < n; i++) {
        nodes.push({
          x: 20 + r2() * (W - 40), y: 16 + r2() * (H - 32),
          base: 1.2 + r2() * 1.6, phase: r2() * Math.PI * 2, sp: 0.6 + r2() * 0.9,
          word: null,
        });
      }
      // attach keyword labels to some nodes, spread out
      const slots = nodes.slice().sort(() => r2() - 0.5).slice(0, Math.min(keywords.length, nodes.length));
      keywords.forEach((w, i) => { if (slots[i]) slots[i].word = w; });
      // edges: each node to 1-2 nearest neighbours
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const d = nodes.map((m, j) => [j, Math.hypot(m.x - nodes[i].x, m.y - nodes[i].y)]).filter((x) => x[0] !== i).sort((a, b) => a[1] - b[1]);
        const links = 1 + Math.floor(r2() * 2);
        for (let k = 0; k < links && k < d.length; k++) {
          const j = d[k][0];
          if (!edges.some((e) => (e[0] === i && e[1] === j) || (e[0] === j && e[1] === i))) edges.push([i, j]);
        }
      }
    }

    function infl(nx, ny) {
      if (!mouse.on) return 0;
      const d = Math.hypot(nx - mouse.x, ny - mouse.y);
      return Math.max(0, 1 - d / R);
    }

    let t0 = performance.now();
    function draw(time) {
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      // per-frame popularity weight for each node (0..1), from usage memory
      for (const nd of nodes) nd._w = nd.word ? SSUsage.weight(nd.word) : 0;
      // edges
      for (const [a, b] of edges) {
        const na = nodes[a], nb = nodes[b];
        const ia = infl(na.x, na.y), ib = infl(nb.x, nb.y);
        const f = Math.max(ia, ib);
        const wE = Math.max(na._w || 0, nb._w || 0); // popularity of either endpoint
        const baseA = (0.06 + wE * 0.12) * intensity;
        const fire = Math.max(f, wE * 0.55);
        const alpha = baseA + f * 0.5 * intensity;
        if (alpha < 0.012) continue;
        ctx.strokeStyle = rgba(mix(COL.idle, COL.fire, fire), alpha);
        ctx.lineWidth = 1 + fire * 0.6;
        ctx.setLineDash([1, 6]);
        ctx.beginPath();
        // slight midpoint wobble for the hand-drawn feel
        const mx = (na.x + nb.x) / 2 + Math.sin(time * 0.5 + a) * 3 * (1 - f);
        const my = (na.y + nb.y) / 2 + Math.cos(time * 0.5 + b) * 3 * (1 - f);
        ctx.moveTo(na.x, na.y);
        ctx.quadraticCurveTo(mx, my, nb.x, nb.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      // nodes + words
      for (const nd of nodes) {
        const f = infl(nd.x, nd.y);
        const w = nd._w || 0; // popularity 0..1
        // popular nodes fire on their OWN — a slow autonomous pulse
        const self = reduce ? 0 : Math.max(0, w * (0.45 + 0.55 * Math.sin(time * 0.9 + nd.phase)));
        const tw = reduce ? 0 : (0.5 + 0.5 * Math.sin(time * nd.sp + nd.phase)); // ambient twinkle
        const heat = Math.max(f, self, w * 0.5); // overall “fire” level
        const r = nd.base + f * 3.2 + w * 1.6 + self * 1.2;
        const a = (0.14 + tw * 0.06 + w * 0.22) * intensity + f * 0.85 * intensity + self * 0.3;
        const col = mix(COL.idle, COL.fire, heat);
        if (heat > 0.3) { ctx.shadowColor = rgba(COL.fire, 0.6 * heat); ctx.shadowBlur = 10 * heat; }
        ctx.fillStyle = rgba(col, Math.min(1, a));
        ctx.beginPath(); ctx.arc(nd.x, nd.y, r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        if (nd.word) {
          const wa = (0.18 + w * 0.3) * intensity + f * 0.9 + self * 0.3;
          ctx.font = (10 + heat * 1.8).toFixed(1) + "px 'Courier Prime', monospace";
          ctx.fillStyle = rgba(mix(COL.faint, COL.fire, Math.max(f, w * 0.7)), Math.min(1, wa));
          ctx.textBaseline = "middle";
          ctx.fillText(nd.word, nd.x + r + 6, nd.y);
        }
      }
    }
    function loop(now) { draw((now - t0) / 1000); raf = requestAnimationFrame(loop); }

    let raf = null;
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; mouse.on = true;
      if (reduce) draw(0); // static mode still reacts to the cursor
    }
    function onLeave() { mouse.on = false; mouse.x = mouse.y = -9999; if (reduce) draw(0); }
    // touch: fire the web along the finger (pointer events cover most; add
    // explicit touch for reliability + let the page still scroll)
    function onTouch(e) {
      const t = e.touches && e.touches[0]; if (!t) return;
      const rect = canvas.getBoundingClientRect();
      const x = t.clientX - rect.left, y = t.clientY - rect.top;
      if (x < -R || y < -R || x > W + R || y > H + R) { mouse.on = false; return; }
      mouse.x = x; mouse.y = y; mouse.on = true;
      if (reduce) draw(0);
    }

    build();
    draw(0); // paint an initial static web immediately (don't wait for rAF)
    // track cursor across the whole window so the web reacts as you approach
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    container.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => { build(); draw(0); });
    ro.observe(container);

    // OPTIMISATION: only animate while the header is on-screen
    let visible = true;
    const io = new IntersectionObserver((ents) => {
      visible = ents[0] && ents[0].isIntersecting;
      if (!reduce) {
        if (visible && raf == null) { t0 = performance.now(); raf = requestAnimationFrame(loop); }
        else if (!visible && raf != null) { cancelAnimationFrame(raf); raf = null; }
      }
    }, { rootMargin: "120px" });
    io.observe(container);

    // live-update when usage memory changes (static/reduced headers redraw)
    const onUsage = () => { if (reduce || !visible) draw(0); };
    window.addEventListener("ss-usage", onUsage);

    if (!reduce) { t0 = performance.now(); raf = requestAnimationFrame(loop); }

    return function destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("ss-usage", onUsage);
      container.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      canvas.remove();
    };
  }

  window.CursorNet = { mount };
})();
