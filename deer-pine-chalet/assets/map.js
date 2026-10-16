// "Things to do" map: Leaflet + CARTO/OpenStreetMap tiles, filterable by category.
(function () {
  const CATS = window.CATEGORIES, P = window.PLACES;
  const visible = Object.fromEntries(Object.keys(CATS).map(k => [k, true]));
  let selected = 0, map = null;
  const markers = [];

  const shapeClass = k => CATS[k].shape === "circle" ? "" : " " + CATS[k].shape;
  const gmaps = p => "https://www.google.com/maps/dir/?api=1&destination=" + p.lat + "," + p.lng;
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  // Map
  if (window.L) {
    map = L.map("map", { scrollWheelZoom: false, zoomSnap: 0.5 });
    addBasemap(map);
    map.on("focus", () => map.scrollWheelZoom.enable());
    map.on("blur", () => map.scrollWheelZoom.disable());
    P.forEach((p, i) => {
      const icon = L.divIcon({ className: "", html: '<div class="pin c-' + p.c + shapeClass(p.c) + '"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
      const m = L.marker([p.lat, p.lng], { icon, title: p.n, keyboard: true, zIndexOffset: p.c === "home" ? 1000 : 0 })
        .on("click", () => select(i, false));
      m.bindTooltip(p.n, { direction: "top", offset: [0, -8] });
      m.addTo(map);
      markers.push(m);
    });
    fitVisible();
  } else {
    document.getElementById("map").innerHTML = '<p style="padding:16px">The map could not load. Every place is still listed below.</p>';
  }

  // Basemaps. "Simple" (the default) is CARTO Positron / Dark Matter: muted grey
  // roads and few lines, so the colored pins carry the information. Guests can
  // switch to "Terrain" (shaded mountains, no roads) or "Detailed" (full road map)
  // with the layer button in the corner.
  // tile.openstreetmap.org is only a backup: it answers 403 to pages it can't
  // identify (no Referer, file://, some privacy settings).
  function addBasemap(m) {
    const dark = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
    const mapEl = document.getElementById("map");
    const OSM = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const CARTO = OSM + ' &copy; <a href="https://carto.com/attributions">CARTO</a>';
    const carto = style => L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/" + style + "/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19, attribution: CARTO });

    const simple = carto(dark ? "dark_all" : "light_all");
    const terrain = L.layerGroup([
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
        { maxNativeZoom: 13, maxZoom: 19, attribution: "Relief &copy; Esri" }),
      carto("light_only_labels")
    ]);
    const detailed = carto(dark ? "dark_all" : "voyager");
    const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 19, attribution: OSM, referrerPolicy: "strict-origin-when-cross-origin" });

    const bases = { "Simple": simple, "Terrain": terrain, "Detailed": dark ? osm : detailed };
    simple.addTo(m);
    L.control.layers(bases, null, { position: "topright" }).addTo(m);

    // Only the OSM layer needs darkening; CARTO has a real dark style.
    m.on("baselayerchange", e => mapEl.classList.toggle("invert-tiles", dark && e.layer === osm));

    // If CARTO is blocked (several failures before any tile loads), fall back to OSM.
    let loaded = 0, failed = 0;
    simple.on("tileload", () => loaded++).on("tileerror", () => {
      if (++failed === 4 && !loaded) {
        m.removeLayer(simple); osm.addTo(m);
        mapEl.classList.toggle("invert-tiles", dark);
      }
    });
  }

  function fitVisible() {
    if (!map) return;
    const pts = P.filter(p => visible[p.c]).map(p => [p.lat, p.lng]);
    if (pts.length) map.fitBounds(pts, { padding: [24, 24], maxZoom: 13 });
  }

  // Legend
  const legend = document.getElementById("legend");
  Object.entries(CATS).forEach(([k, c]) => {
    const b = document.createElement("button");
    b.className = "chip"; b.type = "button"; b.setAttribute("aria-pressed", "true");
    b.innerHTML = '<span class="swatch c-' + k + shapeClass(k).replace("circle", "") + '"></span>' + esc(c.name) +
      ' <span class="n">' + P.filter(p => p.c === k).length + "</span>";
    b.addEventListener("click", () => {
      visible[k] = !visible[k];
      b.setAttribute("aria-pressed", String(visible[k]));
      P.forEach((p, i) => {
        if (p.c !== k || !map) return;
        visible[k] ? markers[i].addTo(map) : markers[i].remove();
      });
      document.querySelectorAll('[data-cat="' + k + '"]').forEach(g => g.hidden = !visible[k]);
      fitVisible();
    });
    legend.appendChild(b);
  });

  // Grouped list
  const list = document.getElementById("place-list"), listButtons = [];
  Object.entries(CATS).forEach(([k, c]) => {
    const group = document.createElement("div");
    group.dataset.cat = k;
    group.innerHTML = "<h3>" + esc(c.name) + "</h3>";
    const ul = document.createElement("ul");
    P.forEach((p, i) => {
      if (p.c !== k) return;
      const li = document.createElement("li"), b = document.createElement("button");
      b.type = "button";
      b.innerHTML = '<span class="swatch c-' + k + shapeClass(k) + '"></span>' + esc(p.n);
      b.addEventListener("click", () => select(i, true));
      listButtons[i] = b; li.appendChild(b); ul.appendChild(li);
    });
    group.appendChild(ul); list.appendChild(group);
  });

  // Detail card
  function select(i, pan) {
    selected = i;
    const p = P[i], c = CATS[p.c];
    document.getElementById("place-card").innerHTML =
      '<span class="cat t-' + p.c + '">' + esc(c.name) + "</span>" +
      "<h2>" + esc(p.n) + "</h2><p>" + esc(p.d) + "</p>" +
      (p.ph ? '<p class="photo-note"><strong>Photo tip:</strong> ' + esc(p.ph) + "</p>" : "") +
      '<p class="addr">' + esc(p.a) + "</p>" +
      '<a href="' + gmaps(p) + '" target="_blank" rel="noopener">Directions in Google Maps ↗</a>';
    listButtons.forEach((b, j) => b && b.setAttribute("aria-current", String(j === i)));
    document.querySelectorAll(".pin.sel").forEach(el => el.classList.remove("sel"));
    if (map) {
      const el = markers[i].getElement();
      if (el && el.firstChild) el.firstChild.classList.add("sel");
      if (pan) map.setView([p.lat, p.lng], Math.max(map.getZoom(), 12));
    }
  }
  select(0, false);
})();
