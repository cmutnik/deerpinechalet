# Deer Pine Chalet — GitHub Pages site

A static, no-build advertising site for Deer Pine Chalet in Jay, NY, on Airbnb.

- **index.html**: Home page. It has a live mountain scene where the sky, sun, moon, stars and lit windows follow the cabin's local time. It also has parallax on scroll and mouse movement, current weather from Open-Meteo (no API key), a trail-sign facts board, a photo strip with a lightbox, a season switcher with snow, petals, fireflies or leaves, the Airbnb rating summary, a map and an FAQ.
- **tree.html**: "Climb the tree." The page opens at the roots. Scrolling **up** climbs the trunk, and each branch holds part of the listing. The sky darkens to stars near the top, leaves rush past while you climb, and an altimeter tracks your height. The Airbnb button sits at the treetop.

## Make it yours

Almost everything is in **`assets/js/config.js`**:

| Field | What it changes |
|---|---|
| `name`, `tagline` | Title and hero text |
| `airbnbUrl` | Every "Book" button |
| `location` | Weather, local clock, sky colour, map pin |
| `facts` | Planks on the trail sign |
| `gallery` | Photos. These currently link to Airbnb's image servers. Downloading them into `assets/img/` and setting `src: "assets/img/porch.jpg"` is sturdier |
| `seasons` | The four season panels |
| `rating` | Airbnb score, review count and category scores. Refresh these now and then |
| `treeHeightFt` | Height shown on the tree page's altimeter |
| `faq` | Questions and answers |
| `tree` | Tree stops, from the roots (first) to the treetop (last). A stop with `cta: true` becomes the booking card |

Also update the `<title>` and meta description in both HTML files, and add an `assets/img/og.jpg` (1200×630) for link previews.

Colours and fonts are CSS variables at the top of `assets/css/style.css`.

## Preview tricks

- `index.html?hour=21`: preview the hero at any hour (0–24)
- `tree.html?top`: open the tree page at the treetop instead of the roots

## Deploy to GitHub Pages

```bash
git init && git add . && git commit -m "Cabin site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, and select `main` / `/ (root)`. The site goes live at `https://<you>.github.io/<repo>/`. All paths are relative, so it works from a project subfolder. `.nojekyll` is included so Jekyll does not process the files.

To run it locally: `python3 -m http.server` and open http://localhost:8000.

## Accessibility

The site respects `prefers-reduced-motion`. With that setting on, it turns off particles, parallax and the falling leaves, and shows tree cards without animation. The season tabs work with the arrow keys, and the altimeter labels are buttons that jump to each stop.
