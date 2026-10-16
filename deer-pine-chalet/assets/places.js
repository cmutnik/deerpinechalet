// Places shown on the "Things to do" map.
// To add a spot: copy a line, change the fields, keep the category key (c) from CATEGORIES.
//   n = name, lat/lng = coordinates (right-click a spot in Google Maps to copy them),
//   a = address or where it is, d = description, ph = optional photo tip.
window.CATEGORIES = {
  lookout: { name: "Drive-up lookouts",       shape: "circle" },
  photo:   { name: "Photo spots",             shape: "square" },
  scenic:  { name: "Easy outdoors",           shape: "circle" },
  attract: { name: "Olympic sites & museums", shape: "circle" },
  food:    { name: "Food & drink",            shape: "circle" },
  shop:    { name: "Shops & farms",           shape: "circle" },
  orchard: { name: "Apple orchards (fall)",   shape: "circle" },
  travel:  { name: "Airport & hospitals",     shape: "circle" }
};

window.PLACES = [

  // Drive-up lookouts
  { c: "lookout", n: "Veterans Memorial Highway", lat: 44.4024, lng: -73.8773, a: "Toll house, Whiteface Memorial Hwy, Wilmington",
    d: "Toll road up the back of Whiteface with overlooks on the way and a stone castle at the top. An elevator inside the mountain goes to the summit, so you get the view with very little walking. It's very popular, so go early. The toll is charged per person and the road is open late spring to fall.",
    ph: "The pull-offs on the switchbacks frame layers of ridgelines. The summit is often windy and can be in the clouds." },
  { c: "lookout", n: "Whiteface summit castle", lat: 44.3637, lng: -73.9028, a: "Top of the Veterans Memorial Highway",
    d: "Gift shop and café at the end of the highway. Take the elevator to the summit to go easy on your knees." },
  { c: "lookout", n: "Cascade Lakes pull-off", lat: 44.2256, lng: -73.8733, a: "NY-73 between Keene and Lake Placid",
    d: "Picnic area on the strip of land between the two Cascade Lakes, under tall rock walls. Plenty of parking, benches and an outhouse. Traffic on 73 moves fast, so pull in and out carefully.",
    ph: "Calm mornings give the cleanest reflections. The cliffs turn gold near sunset." },
  { c: "lookout", n: "Chapel Pond", lat: 44.1398, lng: -73.7481, a: "NY-73, south of Keene Valley",
    d: "Pond right beside the road with cliffs rising above it. Quiet and easy to stop at." },
  { c: "lookout", n: "Mirror Lake Drive", lat: 44.2842, lng: -73.9823, a: "Mirror Lake, Lake Placid",
    d: "Loop around Mirror Lake in town, with pull-offs, fall color and Whiteface in the distance. It starts at the public beach." },
  { c: "lookout", n: "Franklin Falls Flow", lat: 44.4373, lng: -73.9743, a: "Franklin Falls Rd, Bloomingdale",
    d: "Small lot across from the dam, with steps down to a beach. Whiteface rises across the water.",
    ph: "Glassy at sunset, especially on weekdays. Trees grow right to the water at the outlet across the road." },
  { c: "lookout", n: "Lake Everest", lat: 44.3848, lng: -73.8234, a: "Town of Wilmington Beach",
    d: "Town park and beach with a mountain view across the lake, a few minutes from the Wilmington four-way stop." },
  { c: "lookout", n: "Adirondak Loj Road", lat: 44.1827, lng: -73.9662, a: "Off NY-73, ends at Heart Lake",
    d: "Tree-lined road with glimpses of the High Peaks, ending at Heart Lake. The parking lot fills with hikers very early." },
  { c: "lookout", n: "Ausable Chasm bridge", lat: 44.5239, lng: -73.4608, a: "US-9 bridge, Au Sable",
    d: "Free parking and a view of Rainbow Falls from the bridge. The chasm trails need a ticket. It pairs well with a trip to the orchards in Peru." },

  // Photo spots
  { c: "photo", n: "Monument Falls", lat: 44.3117, lng: -73.9151, a: "NY-86, North Elba",
    d: "Roadside cascades on the Ausable River with flat rock ledges and Whiteface upstream. Park in the north lot by the monuments.",
    ph: "Get low on the ledges with a wide lens for a river-to-mountain frame." },
  { c: "photo", n: "Marcy Field", lat: 44.2218, lng: -73.7873, a: "NY-73, Keene Valley",
    d: "Open field with the High Peaks behind it. It hosts a farmers market in season.",
    ph: "Room for a person in the foreground with the whole range behind. Morning light lands on the peaks." },
  { c: "photo", n: "Upper Cascade Lake shore", lat: 44.2235, lng: -73.8785, a: "NY-73, Keene",
    d: "Narrow lake between cliffs, just west of the Cascade Lakes pull-off.",
    ph: "From the shore, a wide angle fits the full height of the rock walls and their reflection." },
  { c: "photo", n: "John Brown Farm", lat: 44.2522, lng: -73.9712, a: "115 John Brown Rd, Lake Placid",
    d: "State historic site with a meadow, walking paths and High Peaks views. Closed Tuesdays.",
    ph: "Open meadow for portraits. Ask staff before any professional shoot." },

  // Easy outdoors
  { c: "scenic", n: "Jay Covered Bridge", lat: 44.3728, lng: -73.725, a: "Jay, NY",
    d: "Historic covered bridge over the East Branch of the Ausable. There are calm pools upstream.",
    ph: "The bridge and the rocky riverbed make a classic wide-angle frame." },
  { c: "scenic", n: "Cloudsplitter Gondola", lat: 44.3532, lng: -73.8612, a: "5021 NY-86, Wilmington",
    d: "Whiteface's gondola, ticketed year-round. Another easy way to get views without much walking." },
  { c: "scenic", n: "High Falls Gorge", lat: 44.3475, lng: -73.8769, a: "4761 NY-86, Wilmington",
    d: "Boardwalks and bridges over waterfalls in a river gorge, open in winter too. It's a short loop with an admission fee." },
  { c: "scenic", n: "Flume Trail", lat: 44.3662, lng: -73.8412, a: "NY-86, Wilmington, by the bridge",
    d: "Pull-off just before the bridge. The trail is fairly level, with a waterfall right at the entrance." },
  { c: "scenic", n: "Lake Flower park", lat: 44.3234, lng: -74.1255, a: "River St, Saranac Lake",
    d: "Small lakeside park you can pull into and walk around." },

  // Olympic sites & museums
  { c: "attract", n: "Olympic Ski Jumps", lat: 44.2599, lng: -73.9664, a: "5486 Cascade Rd, Lake Placid",
    d: "Ride up the jump tower. Seasonal extras include a zip line down the jump, speed tubing on the landing hill and an alpine coaster. Olympic-site packages on whiteface.com can cost less than separate tickets." },
  { c: "attract", n: "Mt Van Hoevenberg", lat: 44.2134, lng: -73.9247, a: "Olympic Sports Complex, Lake Placid",
    d: "The bobsled and luge center. You can pay for skeleton and bobsled rides year-round." },
  { c: "attract", n: "The Wild Center", lat: 44.2198, lng: -74.4385, a: "45 Museum Dr, Tupper Lake",
    d: "Natural history center with good trails, the Wild Walk and canoe rentals on the lake behind it. It runs a light show in winter. About an hour's drive." },
  { c: "attract", n: "Adirondack Sky Center", lat: 44.2550, lng: -74.4710, a: "178 Big Wolf Rd, Tupper Lake",
    d: "Roll-off-roof observatory with serious telescopes under some of the darkest skies in the East. The schedule changes with the seasons, so check it before you go." },
  { c: "attract", n: "Saranac Laboratory Museum", lat: 44.3271, lng: -74.1298, a: "Saranac Lake",
    d: "Small, interesting museum about the town's history as a tuberculosis treatment center." },

  // Food & drink
  { c: "food", n: "Adirondack Mountain Coffee", lat: 44.3358, lng: -73.7745, a: "8 Artos Way, Upper Jay",
    d: "Down the mountain. Good coffee, breakfast and lunch. Closed Monday and Tuesday." },
  { c: "food", n: "NewVida Preserve", lat: 44.3867, lng: -73.7592, a: "6394 NY-86, Jay",
    d: "Just up the road, with good food and a view of Whiteface. Dinner Wednesday through Sunday." },
  { c: "food", n: "Lance's Place", lat: 44.4402, lng: -73.6764, a: "14224 Main St, Au Sable Forks",
    d: "Pizza and wings. Cash only, and the posted hours aren't always reliable." },
  { c: "food", n: "Blue Line Brewery", lat: 44.3132, lng: -74.1163, a: "555 Lake Flower Ave, Saranac Lake",
    d: "Excellent thin-crust pizza." },
  { c: "food", n: "RiverTrail Beerworks", lat: 44.3293, lng: -74.1292, a: "79 Woodruff St, Saranac Lake",
    d: "Bigger brewery with a full kitchen on the river walk." },
  { c: "food", n: "Hungry Trout", lat: 44.3651, lng: -73.8417, a: "5239 NY-86, Wilmington",
    d: "Restaurant on the river, next to the Flume Trail pull-off." },

  // Shops & farms
  { c: "shop", n: "Moon Valley Farm", lat: 44.3994, lng: -73.6716, a: "750 Stickney Bridge Rd, Jay",
    d: "Highland cattle farm with a self-serve farm store. Head past the covered bridge onto Stickney Bridge Rd, then take the first right after the bridge for parking." },
  { c: "shop", n: "Owls Head Rustics", lat: 44.2571, lng: -73.8250, a: "3345 NY-73, Keene",
    d: "Handmade local furniture, soaps and more. Good for souvenirs that aren't Olympic-themed." },
  { c: "shop", n: "Lake Placid Main Street", lat: 44.2854, lng: -73.9841, a: "Main St, Lake Placid",
    d: "Plenty of shops and restaurants along Mirror Lake." },
  { c: "shop", n: "Elevate ADK", lat: 44.3115, lng: -74.1167, a: "622 Lake Flower Ave, Saranac Lake",
    d: "Licensed cannabis dispensary. Adults 21 and over; cannabis is legal in New York." },

  // Orchards
  { c: "orchard", n: "Rulfs Orchard", lat: 44.5783, lng: -73.4964, a: "531 Bear Swamp Rd, Peru",
    d: "Pick-your-own apples in fall, plus a corn maze, bakery and lunch counter. Call ahead to check that picking is open: 518-643-8636." },
  { c: "orchard", n: "Banker Orchards", lat: 44.7042, lng: -73.5442, a: "1037 State Rte 3, Plattsburgh",
    d: "Pick-your-own, cider donuts and a petting zoo. Busy with families on weekends. 518-561-5234." },
  { c: "orchard", n: "Northern Orchard Farm Stand", lat: 44.5563, lng: -73.5329, a: "470 Union Rd, Peru",
    d: "Pre-picked apples in many varieties. Closed Tuesdays." },

  // Travel & medical
  { c: "travel", n: "Plattsburgh Airport", lat: 44.6575, lng: -73.4670, a: "42 Airport Ln, Plattsburgh",
    d: "About an hour's drive from the chalet. Leave extra time in winter." },
  { c: "travel", n: "Elizabethtown Community Hospital", lat: 44.2158, lng: -73.5959, a: "75 Park St, Elizabethtown",
    d: "Emergency department open 24 hours. 518-873-6377. For emergencies, call 911." },
  { c: "travel", n: "Adirondack Health ER", lat: 44.3450, lng: -74.1427, a: "2233 NY-86, Saranac Lake",
    d: "Emergency room open 24 hours. 518-897-2557." }
];
