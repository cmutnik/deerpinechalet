/* Home page: live sky, parallax, weather, signpost, gallery, seasons */
(function () {
  const C = window.CABIN;
  const U = window.CabinUtil;
  const RM = window.REDUCED_MOTION;
  const $ = (id) => document.getElementById(id);
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- Cabin local time ---------- */
  function cabinNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: C.location.timeZone, hour: "numeric", minute: "numeric", month: "numeric", hourCycle: "h23"
    }).formatToParts(new Date());
    const get = (t) => +parts.find((p) => p.type === t).value;
    const override = new URLSearchParams(location.search).get("hour"); // preview: index.html?hour=21
    const hour = override !== null ? +override : get("hour") + get("minute") / 60;
    return { hour, month: get("month") };
  }
  function clockLabel() {
    const o = new URLSearchParams(location.search).get("hour");
    if (o !== null) { const h = Math.floor(+o) % 24; return `${h % 12 || 12}:00 ${h < 12 ? "am" : "pm"}`; }
    return new Intl.DateTimeFormat("en-US", { timeZone: C.location.timeZone, hour: "numeric", minute: "2-digit" })
      .format(new Date()).toLowerCase();
  }

  /* ---------- Sky by time of day ---------- */
  const SKY = [ // [hour, top, bottom, night 0..1]
    [0, "#0a1326", "#1d2b48", 1],
    [5, "#18213c", "#4d4366", .85],
    [6.5, "#5f7fae", "#f4b98a", .25],
    [9, "#4f86c0", "#bcd6ea", 0],
    [16, "#4a82bd", "#c9dceb", 0],
    [18.5, "#3b4e7a", "#f29a6a", .3],
    [20, "#1c2342", "#5d4466", .8],
    [21.5, "#0a1326", "#1d2b48", 1],
    [24, "#0a1326", "#1d2b48", 1]
  ];
  function paintSky(h) {
    let i = 0;
    while (i < SKY.length - 2 && SKY[i + 1][0] <= h) i++;
    const [h0, t0, b0, n0] = SKY[i], [h1, t1, b1, n1] = SKY[i + 1];
    const t = (h - h0) / (h1 - h0 || 1);
    $("skyTop").setAttribute("stop-color", U.mix(t0, t1, t));
    $("skyBot").setAttribute("stop-color", U.mix(b0, b1, t));
    document.querySelector(".hero").style.setProperty("--sky-top", U.mix(t0, t1, t));
    const night = U.lerp(n0, n1, t);

    $("stars").setAttribute("opacity", night);
    $("nightTint").setAttribute("opacity", night * 0.5);
    $("windowGlow").setAttribute("opacity", night * 0.55);
    $("windows").setAttribute("fill", night > 0.4 ? "#ffcf6b" : "#3b4048");

    // Sun arcs 6:00–19:00, moon arcs 19:00–6:00
    const arc = (p) => ({ x: 120 + p * 1200, y: 470 - Math.sin(Math.PI * p) * 360 });
    const sunP = (h - 6) / 13;
    const sun = arc(U.clamp(sunP, 0, 1));
    $("sun").setAttribute("transform", `translate(${sun.x} ${sun.y})`);
    $("sun").setAttribute("opacity", sunP > -0.03 && sunP < 1.03 ? 1 : 0);
    const moonP = ((h + 24 - 19) % 24) / 11;
    const moon = arc(U.clamp(moonP, 0, 1));
    $("moon").setAttribute("transform", `translate(${moon.x} ${moon.y})`);
    $("moon").setAttribute("opacity", moonP <= 1 ? 1 : 0);
    $("moonShadow").setAttribute("fill", U.mix(t0, t1, t));
  }

  /* ---------- Procedural stars and pines ---------- */
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  for (let i = 0; i < 120; i++) {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", rand() * 1440);
    c.setAttribute("cy", rand() * 460);
    c.setAttribute("r", rand() * 1.6 + 0.8);
    c.setAttribute("fill", "#fff");
    if (!RM && i % 3 === 0) { c.classList.add("star"); c.style.animationDelay = `${rand() * 3}s`; }
    $("stars").appendChild(c);
  }

  function pinePath(x, y, h) {
    const w = h * 0.5;
    const p = [[0, -h], [-.35, -.62], [-.17, -.62], [-.5, -.3], [-.26, -.3], [-.62, 0], [.62, 0], [.26, -.3], [.5, -.3], [.17, -.62], [.35, -.62]];
    return "M" + p.map(([a, b], i) => `${(x + a * w).toFixed(1)} ${(y + (i ? b * h : -h)).toFixed(1)}`).join(" L") + "Z";
  }
  function ridgeY(x) {
    if (x <= 720) { const t = x / 720; return (1 - t) ** 2 * 720 + 2 * (1 - t) * t * 640 + t * t * 690; }
    const t = (x - 720) / 720; return (1 - t) ** 2 * 690 + 2 * (1 - t) * t * 740 + t * t * 670;
  }
  let d = "";
  for (let x = 0; x < 1460; x += 14 + rand() * 18) d += pinePath(x, ridgeY(x) + 6, 26 + rand() * 34);
  const ridge = document.createElementNS(NS, "path"); ridge.setAttribute("d", d); $("ridgePines").appendChild(ridge);

  d = "";
  [[-10, 300], [60, 240], [140, 330], [210, 200], [1270, 230], [1340, 330], [1420, 260]].forEach(([x, h]) => {
    d += pinePath(x, 870, h);
  });
  const front = document.createElementNS(NS, "path"); front.setAttribute("d", d); $("frontPines").appendChild(front);

  const now = cabinNow();
  paintSky(now.hour);
  setInterval(() => paintSky(cabinNow().hour), 60000);

  /* ---------- Parallax ---------- */
  if (!RM) {
    const layers = [...document.querySelectorAll(".hero-scene .layer")];
    let mx = 0, ticking = false;
    const render = () => {
      const y = window.scrollY;
      layers.forEach((l) => {
        const dpt = +l.dataset.depth;
        l.setAttribute("transform", `translate(${(mx * dpt * 60).toFixed(1)} ${(-y * dpt * 0.6).toFixed(1)})`);
      });
      ticking = false;
    };
    const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; queue(); }, { passive: true });
  }

  /* ---------- Live conditions (Open-Meteo, no API key) ---------- */
  const WX = { 0: "clear skies", 1: "mostly clear", 2: "partly cloudy", 3: "overcast", 45: "fog", 48: "freezing fog",
    51: "light drizzle", 53: "drizzle", 55: "heavy drizzle", 61: "light rain", 63: "rain", 65: "heavy rain",
    66: "freezing rain", 67: "freezing rain", 71: "light snow", 73: "snow", 75: "heavy snow", 77: "snow grains",
    80: "rain showers", 81: "rain showers", 82: "heavy showers", 85: "snow showers", 86: "heavy snow showers",
    95: "a thunderstorm", 96: "a thunderstorm with hail", 99: "a thunderstorm with hail" };
  const condText = $("conditionsText");
  condText.textContent = `It's ${clockLabel()} at ${C.name}`;
  const { lat, lon } = C.location;
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((j) => {
      const t = Math.round(j.current.temperature_2m);
      const w = WX[j.current.weather_code] || "";
      condText.textContent = `It's ${clockLabel()} at ${C.name}, ${t}°F${w ? " and " + w : ""}`;
    })
    .catch(() => {}); // keep the clock-only line if offline

  /* ---------- Signpost ---------- */
  $("signpost").innerHTML = C.facts.map((f) =>
    `<div class="plank"><span class="k">${U.escape(f.label)}</span><span class="v">${U.escape(f.value)}</span></div>`).join("");

  /* ---------- Gallery + lightbox ---------- */
  const tones = [["#2c5440", "#11231a"], ["#5b4a3a", "#2a1f17"], ["#3d5a73", "#1a2a38"], ["#6b5a2a", "#2e2612"]];
  const media = (g, i) => g.src
    ? `<img src="${U.escape(g.src)}" alt="${U.escape(g.caption)}" loading="lazy">`
    : `<div class="placeholder" style="--p1:${tones[i % 4][0]};--p2:${tones[i % 4][1]}">Add a photo:<br>assets/img/…</div>`;
  const strip = $("strip");
  strip.innerHTML = C.gallery.map((g, i) =>
    `<button class="shot" data-i="${i}"><span class="frame">${media(g, i)}</span><span class="cap">${U.escape(g.caption)}</span></button>`).join("");
  // If a hotlinked photo fails, swap in a placeholder tile
  const fallback = (img) => { img.outerHTML = `<div class="placeholder">Photo unavailable.<br>Save it to assets/img/</div>`; };
  strip.querySelectorAll("img").forEach((img) => img.addEventListener("error", () => fallback(img), { once: true }));
  document.querySelectorAll(".strip-controls .round").forEach((b) =>
    b.addEventListener("click", () => strip.scrollBy({ left: +b.dataset.dir * strip.clientWidth * 0.8, behavior: RM ? "auto" : "smooth" })));
  const lb = $("lightbox");
  strip.addEventListener("click", (e) => {
    const shot = e.target.closest(".shot"); if (!shot) return;
    const g = C.gallery[+shot.dataset.i];
    $("lightboxBody").innerHTML = media(g, +shot.dataset.i) + `<p>${U.escape(g.caption)}</p>`;
    lb.showModal();
  });
  lb.querySelector(".close").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });

  /* ---------- Seasons with particles ---------- */
  const SEASON_BG = { winter: "#3f5f7d", spring: "#46704f", summer: "#1d3526", autumn: "#7a4a24" };
  const canvas = $("seasonCanvas"), ctx = canvas.getContext("2d");
  let season = [12, 1, 2].includes(now.month) ? "winter" : now.month <= 5 ? "spring" : now.month <= 8 ? "summer" : "autumn";
  let parts = [], running = false;

  function size() { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio; }
  function spawn() {
    const W = canvas.width, H = canvas.height, n = season === "summer" ? 40 : 70;
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 3 + 1.5) * devicePixelRatio,
      vx: (Math.random() - .5) * .6, vy: Math.random() * .8 + .4, a: Math.random() * 6.28, s: Math.random() * .04 + .01
    }));
  }
  function frame() {
    if (!running) return;
    const W = canvas.width, H = canvas.height, dpr = devicePixelRatio;
    ctx.clearRect(0, 0, W, H);
    parts.forEach((p) => {
      p.a += p.s;
      if (season === "winter") { p.x += Math.sin(p.a) * .5 * dpr; p.y += p.vy * dpr; ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill(); }
      else if (season === "summer") {
        p.x += Math.cos(p.a) * .6 * dpr; p.y += Math.sin(p.a * .7) * .5 * dpr;
        const glow = (Math.sin(p.a * 3) + 1) / 2;
        ctx.fillStyle = `rgba(242,220,90,${.2 + glow * .7})`; ctx.shadowColor = "#f2dc5a"; ctx.shadowBlur = 12 * dpr;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * .7, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0;
      } else {
        p.x += (Math.sin(p.a) * .8 + p.vx) * dpr; p.y += p.vy * .8 * dpr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a * 2);
        ctx.fillStyle = season === "spring" ? "rgba(246,200,214,.85)" : ["#e8a33a", "#c9601e", "#f2c94c"][Math.floor(p.r) % 3];
        ctx.beginPath(); ctx.ellipse(0, 0, p.r * 1.6, p.r * .8, 0, 0, 6.28); ctx.fill(); ctx.restore();
      }
      if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
    });
    requestAnimationFrame(frame);
  }
  function setSeason(s) {
    season = s;
    const data = C.seasons[s];
    document.querySelectorAll(".season-tabs button").forEach((b) => b.setAttribute("aria-selected", b.dataset.season === s));
    $("seasons").style.setProperty("--season-bg", SEASON_BG[s]);
    $("seasonTitle").textContent = data.title;
    $("seasonText").textContent = data.text;
    $("seasonList").innerHTML = data.list.map((l) => `<li>${U.escape(l)}</li>`).join("");
    spawn();
  }
  document.querySelector(".season-tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (b) setSeason(b.dataset.season);
  });
  document.querySelector(".season-tabs").addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const tabs = [...document.querySelectorAll(".season-tabs button")];
    const i = tabs.findIndex((t) => t.dataset.season === season);
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : 3)) % 4];
    next.focus(); setSeason(next.dataset.season);
  });
  size(); setSeason(season);
  addEventListener("resize", () => { size(); spawn(); });
  if (!RM) {
    new IntersectionObserver(([en]) => {
      const was = running; running = en.isIntersecting;
      if (running && !was) requestAnimationFrame(frame);
    }).observe($("seasons"));
  }

  /* ---------- Reviews, map, FAQ ---------- */
  const R = C.rating;
  $("ratingScore").textContent = R.score;
  $("ratingMeta").textContent = `${R.badge}, from ${R.count} reviews`;
  $("ratingHost").textContent = `Hosted by ${R.host}`;
  $("ratingThemes").textContent = R.themes;
  $("ratingBars").innerHTML = R.categories.map(([k, v]) =>
    `<li><span>${U.escape(k)}</span><span class="bar"><span style="width:${(+v / 5) * 100}%"></span></span><b>${U.escape(v)}</b></li>`).join("");

  const pad = 0.06;
  $("map").src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - pad},${lat - pad * .6},${lon + pad},${lat + pad * .6}&layer=mapnik&marker=${lat},${lon}`;

  $("faqList").innerHTML = C.faq.map((f) =>
    `<details><summary>${U.escape(f.q)}</summary><p>${U.escape(f.a)}</p></details>`).join("");
})();
