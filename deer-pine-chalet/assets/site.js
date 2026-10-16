// Deer Pine Chalet — small shared helpers. No build step, no dependencies.

// ---- 5-day forecast for the chalet (Open-Meteo, free, no API key) ----
(function weather() {
  const box = document.getElementById("weather");
  if (!box) return;
  const LAT = 44.43, LON = -73.73;
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + LAT + "&longitude=" + LON +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
    "&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=5";
  const CODES = {
    0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Cloudy", 45: "Fog", 48: "Freezing fog",
    51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 56: "Freezing drizzle", 57: "Freezing drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain", 66: "Freezing rain", 67: "Freezing rain",
    71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
    80: "Showers", 81: "Showers", 82: "Heavy showers", 85: "Snow showers", 86: "Heavy snow showers",
    95: "Thunderstorms", 96: "Thunderstorms", 99: "Thunderstorms"
  };
  fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    const days = d.daily;
    box.innerHTML = days.time.map((t, i) => {
      const date = new Date(t + "T12:00:00");
      const name = i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" });
      return '<div class="day"><span class="d">' + name + '</span>' +
        '<span class="t">' + Math.round(days.temperature_2m_max[i]) + '° <span>' + Math.round(days.temperature_2m_min[i]) + '°</span></span>' +
        '<span class="c">' + (CODES[days.weather_code[i]] || "—") + '</span>' +
        '<span class="p">' + (days.precipitation_probability_max[i] ?? 0) + '% precip</span></div>';
    }).join("");
  }).catch(() => {
    box.innerHTML = '<p class="weather-fallback">Forecast unavailable right now. Check <a href="https://forecast.weather.gov/MapClick.php?lat=44.43&lon=-73.73" target="_blank" rel="noopener">weather.gov for Jay, NY</a>.</p>';
  });
})();

// ---- Checkout checklist: remembers ticks on this device only ----
(function checklist() {
  const list = document.querySelector("[data-checklist]");
  if (!list) return;
  const KEY = "dpc-checkout-" + list.dataset.checklist;
  const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
  const out = document.getElementById("progress");
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
  boxes.forEach(b => { b.checked = !!saved[b.id]; });
  const update = () => {
    const done = boxes.filter(b => b.checked).length;
    if (out) out.textContent = done === boxes.length ? "All done. Safe travels!" : done + " of " + boxes.length + " done";
    try { localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(boxes.map(b => [b.id, b.checked])))); } catch (e) {}
  };
  boxes.forEach(b => b.addEventListener("change", update));
  const reset = document.getElementById("reset");
  if (reset) reset.addEventListener("click", () => { boxes.forEach(b => b.checked = false); update(); });
  update();
})();
