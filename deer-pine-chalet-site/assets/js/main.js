/* Shared behaviour for every page */
(function () {
  const C = window.CABIN;
  window.REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fill [data-bind] elements from config
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (key === "airbnb") {
      el.href = C.airbnbUrl;
      el.target = "_blank";
      el.rel = "noopener";
    } else if (key === "name") el.textContent = C.name;
    else if (key === "tagline") el.textContent = C.tagline;
    else if (key === "locationLabel") el.textContent = C.location.label;
  });
  document.title = document.title.replace("Larchwood Cabin", C.name);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Solid header once you scroll past the hero
  const header = document.querySelector(".site-header");
  if (header && document.body.classList.contains("home")) {
    const onScroll = () => header.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Small helpers other scripts use
  window.CabinUtil = {
    lerp: (a, b, t) => a + (b - a) * t,
    clamp: (v, a, b) => Math.min(b, Math.max(a, v)),
    hexToRgb(hex) {
      const n = parseInt(hex.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    },
    mix(h1, h2, t) {
      const a = this.hexToRgb(h1), b = this.hexToRgb(h2);
      return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
    },
    escape(s) {
      return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    }
  };
})();
