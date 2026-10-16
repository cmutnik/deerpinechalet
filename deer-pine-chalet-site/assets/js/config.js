/* ============================================================
   CABIN CONFIG — Deer Pine Chalet
   Everything on both pages reads from here.
   Source: the Airbnb and Vrbo/VacationCottage listings (Oct 2026).
   ============================================================ */
window.CABIN = {
  name: "Deer Pine Chalet",
  tagline: "A custom log chalet in the Adirondacks, with a hot tub, a sauna and Whiteface Mountain down the road.",
  airbnbUrl: "https://www.airbnb.com/rooms/42282289",

  // Weather, local clock, sky colour and map pin. Jay, NY (general area only).
  location: {
    label: "Jay, New York, in the Adirondack Park",
    lat: 44.3742,
    lon: -73.7254,
    timeZone: "America/New_York"
  },

  // How tall the tree is on the Climb page, for the altimeter readout
  treeHeightFt: 110,

  // Trail-sign facts on the home page
  facts: [
    { label: "Sleeps", value: "15" },
    { label: "Bedrooms", value: "4" },
    { label: "Beds", value: "9" },
    { label: "Baths", value: "3.5" },
    { label: "Hot tub", value: "7-person" },
    { label: "Sauna", value: "4-person" },
    { label: "Size", value: "3,600 sq ft" },
    { label: "Whiteface Mtn", value: "About 12 mi" }
  ],

  /* Gallery. These link straight to the listing's photos on Airbnb's servers.
     For a sturdier site, download them into assets/img/ and point src there.
     If a photo fails to load, a placeholder tile shows instead. */
  gallery: [
    { src: "assets/img/gallery-01.jpg", caption: "The chalet at dusk, lit up against fresh snow with the sauna barrel and wraparound deck" },
    { src: "assets/img/gallery-02.jpg", caption: "Log chalet in daylight with a dusting of snow, screened porch, upper deck and hot tub" },
    { src: "assets/img/gallery-03.jpg", caption: "Snow-covered deck with log railings, looking out into sunlit pine woods" },
    { src: "assets/img/gallery-04.jpg", caption: "Main-floor primary bedroom, king bed and balcony doors" },
    { src: "assets/img/gallery-05.jpg", caption: "Walkout-level primary bedroom with private bath" },
    { src: "assets/img/gallery-06.jpg", caption: "Bedroom 3: queen, single and bunk bed" },
    { src: "assets/img/gallery-07.jpg", caption: "Bedroom 4: queen and single" },
    { src: "assets/img/gallery-08.jpg", caption: "Living room with queen sofa bed" }
  ],

  seasons: {
    winter: {
      title: "Winter",
      text: "Ski Whiteface, which has hosted the Winter Olympics twice, then come back to the hot tub, the sauna and the gas fireplace.",
      list: ["Whiteface Mountain about 12 miles away", "Neighborhood trails for cross-country skiing and snowshoeing", "Mudroom with ski racks and boot dryers", "Backup generator"]
    },
    spring: {
      title: "Spring",
      text: "The trails go quiet and the wildlife comes out. Deer are regular visitors around the chalet.",
      list: ["Six neighborhood trails, about 10 miles in all", "Trail entrance steps from the door", "Au Sable River nearby for fishing"]
    },
    summer: {
      title: "Summer",
      text: "Grill on the screened porch, walk to the neighborhood lake, or paddle Mirror Lake in Lake Placid.",
      list: ["Neighborhood lake with a dock and covered picnic area", "Screened porch with a couch, grill and TV", "Lake Placid about 21 miles away", "Hiking, rock climbing and mountain biking nearby"]
    },
    autumn: {
      title: "Autumn",
      text: "Hike the neighborhood trails, then watch the stars from the wraparound balcony with the chalet's telescope.",
      list: ["Wraparound balcony with mountain views", "Telescope for stargazing", "Hot tub and sauna for after the hike"]
    }
  },

  // Rating summary from the Airbnb listing. Update these numbers from time to time.
  rating: {
    score: "4.95",
    count: 152,
    badge: "Airbnb Guest favorite",
    host: "Deborah, Superhost, hosting for 7 years",
    categories: [
      ["Cleanliness", "4.9"], ["Accuracy", "5.0"], ["Check-in", "5.0"],
      ["Communication", "5.0"], ["Location", "4.9"], ["Value", "4.9"]
    ],
    themes: "Guests mention the hospitality most often, followed by the kitchen, how clean it is, the indoor spaces and the location."
  },

  faq: [
    { q: "How far is Whiteface Mountain?", a: "About 12 miles. Lake Placid is about 21 miles away." },
    { q: "Check-in and check-out?", a: "Check-in from 4 pm, check-out by 10 am. Early check-in or late check-out may be possible for a fee if arranged in writing in advance." },
    { q: "Is there Wi-Fi and cell service?", a: "There's high-speed Wi-Fi. Cell coverage is minimal, so plan on Wi-Fi." },
    { q: "Are pets allowed?", a: "No. Pets, smoking, parties and events are not allowed." },
    { q: "Who can book?", a: "The renter must be 25 or older, or part of a family group. A signed rental agreement and photo ID are required." },
    { q: "Where do we park?", a: "In the driveway only, never on the street or off the gravel." }
  ],

  /* The Tree page. You start at the roots and scroll UP to climb.
     Stops are listed from the ground (first) to the treetop (last). */
  tree: [
    {
      height: "Roots",
      title: "Getting here",
      text: "The chalet is in Jay, New York, inside the Adirondack Park. The exact address arrives after you book.",
      list: ["Whiteface Mountain about 12 miles", "Lake Placid about 21 miles", "Park in the driveway only"]
    },
    {
      height: "Trunk",
      title: "The chalet",
      text: "A custom-built log home of about 3,600 square feet, with handmade woodwork from the Adirondack Park.",
      list: ["Open floor plan", "Double-sided gas fireplace", "Wraparound balcony", "A primary bedroom on each floor"]
    },
    {
      height: "First branch",
      title: "Bedrooms",
      text: "Four bedrooms and nine beds for up to 15 guests.",
      list: ["Main floor: king, 58\" 4K TV, balcony doors", "Walkout level: king, 58\" 4K TV, private bath", "Bedroom 3: queen, single and bunk bed", "Bedroom 4: queen and single", "Queen sofa bed"]
    },
    {
      height: "Second branch",
      title: "Kitchen and great room",
      text: "A gourmet kitchen with stainless appliances and granite counters, and a table big enough for everyone.",
      list: ["Dining table seats 10–12, peninsula seats 4", "Group coffee maker, Keurig, air fryer, waffle maker", "75\" 4K smart TV with cable and movie channels"]
    },
    {
      height: "Third branch",
      title: "Downstairs",
      text: "The walkout level has in-floor heat and is built for long evenings.",
      list: ["Bar with wine cooler", "Pool table and game table", "Library", "Mudroom: ski racks, boot dryers, two washers and dryers"]
    },
    {
      height: "Fourth branch",
      title: "Hot tub, sauna and outdoors",
      text: "Soak after the slopes, or head out the door onto the trails.",
      list: ["7-person hot tub", "4-person sauna", "Screened porch with grill and TV (summer)", "Trail entrance steps away", "Neighborhood lake with a dock"]
    },
    {
      height: "Upper branches",
      title: "House rules",
      text: "A few rules keep the chalet in good shape for the next guests.",
      list: ["Check-in 4 pm, check-out 10 am", "Quiet after 10 pm", "No pets, smoking, parties or open flames", "Renter 25+ or part of a family group", "Kids under 15 supervised in the hot tub and sauna"]
    },
    {
      height: "Crown",
      title: "The view",
      text: "Mountain views from the wraparound balcony by day. At night, take the telescope out.",
      list: ["Telescope for stargazing", "Deer and other wildlife are common", "A quiet, protected setting"]
    },
    {
      height: "Treetop",
      title: "Stay at Deer Pine Chalet",
      text: "Rated 4.95 from 152 guest reviews on Airbnb. Pick your dates there.",
      cta: true
    }
  ]
};
