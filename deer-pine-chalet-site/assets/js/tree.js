/* Tree page: start at the roots, scroll up to climb */
(function () {
  const C = window.CABIN;
  const U = window.CabinUtil;
  const RM = window.REDUCED_MOTION;
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;

  /* ---------- Build stops ---------- */
  // Pine bough: an upward-curving limb with layered needle clumps
  const needles = (cx, cy, k) => `<g transform="translate(${cx} ${cy}) scale(${k})">
      <path d="M-46 8 Q-20 -30 0 -34 Q22 -30 48 6 Q20 -4 0 -2 Q-22 -4 -46 8Z" fill="#24472f"/>
      <path d="M-34 0 Q-14 -24 2 -26 Q18 -22 36 -2 Q14 -10 0 -10 Q-16 -10 -34 0Z" fill="#2f5a3c"/>
    </g>`;
  const BOUGH = (cls) => `<svg class="branch ${cls}" viewBox="0 0 300 150" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 108 C90 102 170 86 292 54 L296 64 C176 100 92 122 0 128Z" fill="#5a3f2c"/>
      <path d="M150 92 C180 70 200 58 226 46" stroke="#5a3f2c" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${needles(110, 98, .8)}${needles(196, 78, .95)}${needles(232, 52, .8)}${needles(282, 60, 1.1)}
    </svg>`;
  const BRANCH = BOUGH("") + BOUGH("twig");

  function stopHTML(s, i, side) {
    const list = s.list ? `<ul>${s.list.map((l) => `<li>${U.escape(l)}</li>`).join("")}</ul>` : "";
    const cta = s.cta ? `<a class="btn" style="background:var(--fir);color:var(--birch);margin-top:.5rem" href="${U.escape(C.airbnbUrl)}" target="_blank" rel="noopener">Check dates on Airbnb</a>` : "";
    return `<section class="stop ${side} ${s.cta ? "cta" : ""}" data-i="${i}" aria-labelledby="stop-${i}">
      ${s.cta || i === 0 ? "" : BRANCH}
      <article class="card">
        <span class="height">${U.escape(s.height)}</span>
        <h2 id="stop-${i}">${U.escape(s.title)}</h2>
        <p>${U.escape(s.text)}</p>${list}${cta}
      </article></section>`;
  }

  const stops = C.tree;
  const last = stops.length - 1;
  $("rootStop").innerHTML = stopHTML(stops[0], 0, "right");
  $("topStops").innerHTML = stops[last].cta ? stopHTML(stops[last], last, "center") : "";
  const middle = stops.slice(1, stops[last].cta ? last : last + 1);
  // Rendered top-down (highest branch first), alternating sides
  $("branchStops").innerHTML = middle.map((s, k) => {
    const i = k + 1;
    return stopHTML(s, i, i % 2 ? "left" : "right");
  }).reverse().join("");

  const stopEls = [...document.querySelectorAll(".stop")];
  const crown = document.querySelector(".crown");
  const trunk = $("trunk");
  const ground = $("ground");

  /* ---------- Layout ---------- */
  let maxScroll = 1;
  const stopP = new Map();
  function layout() {
    trunk.style.top = crown.offsetTop + crown.offsetHeight * 0.75 + "px";
    trunk.style.bottom = ground.offsetHeight * 0.85 + "px";
    maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    stopEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const center = r.top + scrollY + r.height / 2 - innerHeight / 2;
      stopP.set(el, U.clamp(center, 0, maxScroll));
    });
    buildLabels();
  }

  /* ---------- Altimeter ---------- */
  function buildLabels() {
    $("altLabels").innerHTML = stopEls.map((el) => {
      const s = stops[+el.dataset.i];
      const p = 1 - stopP.get(el) / maxScroll;
      return `<li style="bottom:${(p * 100).toFixed(1)}%"><button data-i="${el.dataset.i}">${U.escape(s.height)}</button></li>`;
    }).join("");
  }
  $("altLabels").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const el = stopEls.find((s) => s.dataset.i === b.dataset.i);
    scrollTo({ top: stopP.get(el), behavior: RM ? "auto" : "smooth" });
  });

  /* ---------- Sky by height ---------- */
  const SKY = [[0, "#3d4f3f"], [0.15, "#7f9e86"], [0.4, "#8db3d6"], [0.68, "#5f86b8"], [0.86, "#2b3a6a"], [1, "#0d1430"]];
  function skyAt(p) {
    let i = 0; while (i < SKY.length - 2 && SKY[i + 1][0] <= p) i++;
    const [a, ca] = SKY[i], [b, cb] = SKY[i + 1];
    return U.mix(ca, cb, U.clamp((p - a) / (b - a), 0, 1));
  }

  let current = -1;
  const readout = $("readout"), hint = $("hint");
  function update() {
    const p = U.clamp(1 - scrollY / maxScroll, 0, 1);
    root.style.setProperty("--p", p.toFixed(4));
    document.body.style.setProperty("--sky-now", skyAt(p));
    $("stars").style.setProperty("--star-op", U.clamp((p - 0.72) / 0.25, 0, 1).toFixed(3));
    hint.style.opacity = p > 0.04 ? 0 : 1;

    // Nearest stop
    let best = null, bestD = Infinity;
    stopEls.forEach((el) => { const d = Math.abs(stopP.get(el) - scrollY); if (d < bestD) { bestD = d; best = el; } });
    const i = +best.dataset.i;
    if (i !== current) {
      current = i;
      document.querySelectorAll(".alt-labels button").forEach((b) => b.classList.toggle("on", +b.dataset.i === i));
    }
    const ft = Math.round(p * (C.treeHeightFt || 110));
    readout.textContent = `${stops[i].height}, ${ft} ft up`;
  }

  /* ---------- Reveal cards as they come into view ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("is-in"); });
  }, { threshold: 0.35 });
  stopEls.forEach((el) => io.observe(el));

  /* ---------- Stars ---------- */
  const sc = $("stars"), sctx = sc.getContext("2d");
  function drawStars() {
    sc.width = innerWidth * devicePixelRatio; sc.height = innerHeight * devicePixelRatio;
    let seed = 11; const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    sctx.fillStyle = "#fff";
    for (let i = 0; i < 160; i++) {
      sctx.globalAlpha = 0.4 + r() * 0.6;
      sctx.beginPath(); sctx.arc(r() * sc.width, r() * sc.height * 0.8, (r() * 1.3 + 0.3) * devicePixelRatio, 0, 6.28); sctx.fill();
    }
  }

  /* ---------- Falling needles and leaves ---------- */
  const lc = $("leaves"), lctx = lc.getContext("2d");
  let leaves = [];
  function sizeLeaves() {
    lc.width = innerWidth * devicePixelRatio; lc.height = innerHeight * devicePixelRatio;
    leaves = Array.from({ length: 14 }, () => ({
      x: Math.random() * lc.width, y: Math.random() * lc.height, a: Math.random() * 6.28,
      s: Math.random() * 0.02 + 0.01, v: Math.random() * 0.6 + 0.4, r: (Math.random() * 3 + 3) * devicePixelRatio
    }));
  }
  let lastY = scrollY;
  function leafFrame() {
    const dy = scrollY - lastY; lastY = scrollY; // climbing makes leaves rush past
    lctx.clearRect(0, 0, lc.width, lc.height);
    leaves.forEach((l) => {
      l.a += l.s; l.x += Math.sin(l.a) * 0.7 * devicePixelRatio;
      l.y += (l.v - dy * 0.35) * devicePixelRatio;
      if (l.y > lc.height + 20) { l.y = -20; l.x = Math.random() * lc.width; }
      if (l.y < -20) { l.y = lc.height + 20; l.x = Math.random() * lc.width; }
      lctx.save(); lctx.translate(l.x, l.y); lctx.rotate(l.a * 2);
      lctx.fillStyle = "rgba(47, 90, 60, .8)";
      lctx.beginPath(); lctx.ellipse(0, 0, l.r * 1.6, l.r * 0.6, 0, 0, 6.28); lctx.fill(); lctx.restore();
    });
    requestAnimationFrame(leafFrame);
  }

  /* ---------- Start at the bottom ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function init() {
    layout();
    const startTop = new URLSearchParams(location.search).has("top");
    scrollTo(0, startTop ? 0 : maxScroll);
    update(); drawStars();
    if (!RM) { sizeLeaves(); requestAnimationFrame(leafFrame); }
  }
  let ticking = false;
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); }
  }, { passive: true });
  addEventListener("resize", () => { layout(); update(); drawStars(); if (!RM) sizeLeaves(); });

  if (document.readyState === "complete") init();
  else addEventListener("load", init);
  if (document.fonts) document.fonts.ready.then(() => { layout(); update(); });
})();
