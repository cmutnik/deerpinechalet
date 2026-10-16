# Deer Pine Chalet — guest guide

This is a static welcome site for guests at Deer Pine Chalet in Jay, NY. It's plain HTML, CSS and JavaScript with no build step, so GitHub Pages can serve it as is.

## Pages

| File | What it covers |
|---|---|
| `index.html` | Welcome, the essentials (address, check-in/out, Wi-Fi), live 5-day forecast, house guide, local tips, emergency info |
| `activities.html` | Interactive map (OpenStreetMap) of lookouts, photo spots, Olympic sites, food, shops, orchards and hospitals |
| `trails.html` | The neighborhood trailhead and the Lake Trail |
| `thermostat.html` | How to set the heat, suggested temperatures, troubleshooting |
| `fireplace.html` | Lighting the fire, putting it out, safety |
| `checkout.html` | Tick-off checkout checklist (remembered on the guest's phone) |

## Deploy to GitHub Pages (free)

1. Create a new repository on GitHub, for example `deer-pine-chalet`.
2. Upload everything in this folder, including `.nojekyll`, to the repository root.
   - From a terminal:
     ```bash
     cd deer-pine-chalet
     git init && git add . && git commit -m "Guest guide"
     git branch -M main
     git remote add origin https://github.com/<you>/deer-pine-chalet.git
     git push -u origin main
     ```
3. In the repository, go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, then pick **main** and **/ (root)**, and save.
4. After a minute the site is live at `https://<you>.github.io/deer-pine-chalet/`.
5. Optional: turn that URL into a QR code and print it for the binder or the fridge.

## Fill in the placeholders

Anything highlighted in **yellow** on the site is a placeholder. Search the HTML files for `class="todo"` to find each one, type over the text, and delete the `<span class="todo">…</span>` wrapper.

- **index.html:** check-in and check-out times, how guests get in, Wi-Fi network name and where the password is posted, cell service, fire extinguisher location, water shut-off and breaker panel locations
- **thermostat.html:** brand and model, location, how to switch to Heat, schedule/hold behavior, checkout setting, battery location, other heat zones
- **fireplace.html:** fireplace type, firewood location, damper handle location, ash bucket location, detector and extinguisher locations. If the fireplace is **gas**, there's a commented-out note at the top of the file with replacement steps.
- **trails.html:** where the trail map is posted
- **checkout.html:** checkout time and the house-specific checklist items
- **Footer on every page:** host phone or email

## Add photos

Put images in `assets/img/` and replace each dashed photo box like this:

```html
<figure class="photo-slot">…</figure>
```

becomes

```html
<figure class="photo-slot"><img src="assets/img/thermostat.jpg" alt="The thermostat on the living room wall"></figure>
```

Phone photos are large, so resize them to about 1600 px wide before uploading.

## Add or change map places

Edit `assets/places.js`. Each place is one line with a category (`c`), name, coordinates, address and description. To get coordinates, right-click a spot in Google Maps and click the numbers to copy them.

## Privacy

- **The site is public.** Anyone with the link can open it, and GitHub Pages has no password option.
- **Search engines.** Every page includes `noindex`, which tells search engines not to list it, but that isn't access control.
- **Wi-Fi password.** It's intentionally left off the site. Keep it posted inside the chalet.
- **Never publish door codes, lockbox codes or alarm codes here.** Send those to guests privately.

## Notes

- **Weather:** the forecast comes from Open-Meteo, which is free and needs no API key. If it can't load, the page links to weather.gov instead.
- **Map:** the map uses Leaflet. It opens on a muted "Simple" basemap (CARTO Positron, or Dark Matter in dark mode) so the pins stand out, and a layer button in the corner switches to "Terrain" (Esri shaded relief with place names) or "Detailed" (full road map). If CARTO is unreachable, it falls back to OpenStreetMap's own tiles. OpenStreetMap's servers return 403 to pages they can't identify, including pages opened straight from disk (`file://`), so preview locally with `python3 -m http.server` rather than double-clicking the file. If the map can't load at all, the full list of places still works.
- **Dark mode:** the site follows the phone's dark mode setting automatically.
