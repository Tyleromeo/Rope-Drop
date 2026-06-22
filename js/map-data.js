// Rope Drop — Map Data
// Real-world GPS coordinates for park map markers. WDW coordinates are
// sourced from crowd-collected GPS data (DISboards photography forum) and
// are accurate to the specific attraction. Disneyland/DCA coordinates are
// approximate placements within each land, based on the park's known
// general layout, since no equivalent per-ride GPS list was available —
// these are clearly marked `approx: true` and should be treated as
// "roughly here" rather than pinpoint accurate.
//
// This is real-world map data (like any maps app would show), not a
// reproduction of Disney's own map artwork.

const PARK_MAP_CENTERS = {
  mk:  { lat: 28.4181, lng: -81.5812, zoom: 16 },
  ep:  { lat: 28.3747, lng: -81.5494, zoom: 16 },
  hs:  { lat: 28.3575, lng: -81.5599, zoom: 16 },
  ak:  { lat: 28.3580, lng: -81.5904, zoom: 16 },
  dl:  { lat: 33.8121, lng: -117.9190, zoom: 16 }, // Disneyland
  dca: { lat: 33.8062, lng: -117.9200, zoom: 16 },
};

// Maps item IDs (from data.js) to real coordinates. Not every ride has an
// entry — only the ones we have solid location data for. Land/area markers
// (no itemId) are added separately per park for general orientation.
const MAP_MARKERS = {
  mk: [
    { itemId: 'mk-04', lat: 28.418833, lng: -81.578136 }, // Space Mountain
    { itemId: 'mk-05', lat: 28.419189, lng: -81.584606 }, // Big Thunder Mountain
    { itemId: 'mk-02', lat: 28.420458, lng: -81.583125 }, // Haunted Mansion
    { itemId: 'mk-03', lat: 28.418078, lng: -81.584319 }, // Pirates of the Caribbean
    { itemId: 'mk-06', lat: 28.420442, lng: -81.582119 }, // It's a Small World
    { itemId: 'mk-08', lat: 28.417967, lng: -81.583503 }, // Jungle Cruise
    { itemId: 'mk-10', lat: 28.420322, lng: -81.578847 }, // Dumbo
    { itemId: 'mk-09', lat: 28.420114, lng: -81.580242 }, // Winnie the Pooh
    { itemId: 'mk-12', lat: 28.421325, lng: -81.579661 }, // Under the Sea
    { itemId: 'mk-14', lat: 28.419189, lng: -81.584606 }, // Splash → Tiana's
    { itemId: 'mk-23', lat: 28.421383, lng: -81.580817 }, // Be Our Guest
    { itemId: 'mk-11', lat: 28.41945,  lng: -81.579458 }, // Tomorrowland Speedway
    { itemId: 'mk-19', lat: 28.418767, lng: -81.581186 }, // Mickey & Minnie meet (Town Sq, near hub)
    { itemId: 'mk-20', lat: 28.416925, lng: -81.580811 }, // Princess Fairytale Hall meet
    { itemId: 'mk-21', lat: 28.416925, lng: -81.580811 }, // Princess Fairytale Hall meet
    { itemId: 'mk-22', lat: 28.418433, lng: -81.583483 }, // Dole Whip at Aloha Isle (near Aladdin/Adventureland)
  ],
  ep: [
    { itemId: 'ep-04', lat: 28.373703, lng: -81.552439 }, // Soarin' Across America (correct: was mislabeled to ep-05)
    { itemId: 'ep-05', lat: 28.373236, lng: -81.547522 }, // Test Track
    { itemId: 'ep-06', lat: 28.373919, lng: -81.547253 }, // Mission: SPACE
    { itemId: 'ep-08', lat: 28.373942, lng: -81.551283 }, // Living with the Land
    { itemId: 'ep-07', lat: 28.3727,   lng: -81.551197 }, // Journey Into Imagination
    { itemId: 'ep-21', lat: 28.375542, lng: -81.549417 }, // Spaceship Earth
    { itemId: 'ep-10', lat: 28.371414, lng: -81.547586 }, // Mexico pavilion
    { itemId: 'ep-36', lat: 28.370517, lng: -81.5471 },   // Norway pavilion
    { itemId: 'ep-37', lat: 28.369944, lng: -81.546911 }, // China pavilion
    { itemId: 'ep-12', lat: 28.369067, lng: -81.552725 }, // France pavilion
    { itemId: 'ep-13', lat: 28.370228, lng: -81.551969 }, // UK pavilion
    { itemId: 'ep-14', lat: 28.371336, lng: -81.551375 }, // Canada pavilion
    { itemId: 'ep-11', lat: 28.368044, lng: -81.550511 }, // Japan pavilion
    { itemId: 'ep-40', lat: 28.368353, lng: -81.551653 }, // Morocco pavilion
    { itemId: 'ep-23', lat: 28.367928, lng: -81.549347 }, // The American Adventure
    { itemId: 'ep-17', lat: 28.369067, lng: -81.552725 }, // Crepes at Les Halles (France)
    { itemId: 'ep-19', lat: 28.370228, lng: -81.551969 }, // Rose & Crown (UK)
    { itemId: 'ep-20', lat: 28.371414, lng: -81.547586 }, // La Cava del Tequila (Mexico)
  ],
  hs: [
    { itemId: 'hs-04', lat: 28.359808, lng: -81.559978 }, // Tower of Terror
    { itemId: 'hs-06', lat: 28.356181, lng: -81.561028 }, // Toy Story Mania
    { itemId: 'hs-09', lat: 28.357164, lng: -81.559322 }, // Indiana Jones (Echo Lake)
    { itemId: 'hs-08', lat: 28.357794, lng: -81.560961 }, // Mickey & Minnie's Runaway Railway (Animation Bldg)
    { itemId: 'hs-12', lat: 28.357508, lng: -81.560739 }, // Frozen Sing-Along (Little Mermaid theater, Echo Lake)
    { itemId: 'hs-19', lat: 28.355825, lng: -81.559517 }, // Sci-Fi Dine-In
  ],
  ak: [
    { itemId: 'ak-02', lat: 28.363108, lng: -81.593531 }, // Kilimanjaro Safaris
    { itemId: 'ak-03', lat: 28.358192, lng: -81.587144 }, // Expedition Everest
    { itemId: 'ak-05', lat: 28.359397, lng: -81.588317 }, // Kali River Rapids
    { itemId: 'ak-13', lat: 28.357311, lng: -81.589589 }, // Flame Tree Barbecue
    { itemId: 'ak-17', lat: 28.357733, lng: -81.590458 }, // Zootopia: Better Zoogether! (Tree of Life Theater)
    { itemId: 'ak-11', lat: 28.359572, lng: -81.588622 }, // Maharajah Jungle Trek
    { itemId: 'ak-16', lat: 28.358794, lng: -81.592122 }, // Tusker House
    { itemId: 'ak-04', lat: 28.359800, lng: -81.594800 }, // Na'vi River Journey
    { itemId: 'ak-08', lat: 28.362500, lng: -81.591400 }, // Festival of the Lion King
  ],
  // Disneyland & DCA: approximate placements (no crowd-sourced per-ride
  // GPS list was available), positioned within their known general lands.
  dl: [
    { itemId: 'dl-01', lat: 33.8113, lng: -117.9213, approx: true }, // Indiana Jones (Adventureland)
    { itemId: 'dl-04', lat: 33.8118, lng: -117.9176, approx: true }, // Haunted Mansion (New Orleans Sq)
    { itemId: 'dl-05', lat: 33.8112, lng: -117.9183, approx: true }, // Pirates (New Orleans Sq)
    { itemId: 'dl-06', lat: 33.8133, lng: -117.9217, approx: true }, // Matterhorn (Fantasyland)
    { itemId: 'dl-03', lat: 33.8157, lng: -117.9228, approx: true }, // Rise of the Resistance (Galaxy's Edge)
    { itemId: 'dl-02', lat: 33.8133, lng: -117.9210, approx: true }, // It's a Small World (Fantasyland)
    { itemId: 'dl-08', lat: 33.8135, lng: -117.9185, approx: true }, // Space Mountain (Tomorrowland)
    { itemId: 'dl-09', lat: 33.8122, lng: -117.9220, approx: true }, // Big Thunder (Frontierland)
    { itemId: 'dl-11', lat: 33.8113, lng: -117.9213, approx: true }, // Jungle Cruise (Adventureland)
    { itemId: 'dl-12', lat: 33.8157, lng: -117.9228, approx: true }, // Smugglers Run (Galaxy's Edge)
    { itemId: 'dl-07', lat: 33.8108, lng: -117.9165, approx: true }, // Tiana's Bayou Adventure (Bayou Country)
    { itemId: 'dl-41', lat: 33.8148, lng: -117.9175, approx: true }, // Mickey & Minnie's Runaway Railway (Toontown)
    { itemId: 'dl-35', lat: 33.8108, lng: -117.9190, approx: true }, // Disneyland Railroad (Main Street)
  ],
  dca: [
    { itemId: 'dca-01', lat: 33.8045, lng: -117.9226, approx: true }, // Radiator Springs Racers (Cars Land)
    { itemId: 'dca-02', lat: 33.8081, lng: -117.9213, approx: true }, // Guardians (Avengers Campus)
    { itemId: 'dca-04', lat: 33.8059, lng: -117.9183, approx: true }, // Incredicoaster (Pixar Pier)
    { itemId: 'dca-06', lat: 33.8073, lng: -117.9209, approx: true }, // Soarin' (Grizzly Peak)
    { itemId: 'dca-05', lat: 33.8055, lng: -117.9188, approx: true }, // World of Color (Paradise Bay)
    { itemId: 'dca-03', lat: 33.8081, lng: -117.9213, approx: true }, // Web Slingers (Avengers Campus)
    { itemId: 'dca-07', lat: 33.8073, lng: -117.9209, approx: true }, // Grizzly River Run (Grizzly Peak)
    { itemId: 'dca-10', lat: 33.8059, lng: -117.9183, approx: true }, // Toy Story Mania (Pixar Pier)
    { itemId: 'dca-11', lat: 33.8068, lng: -117.9183, approx: true }, // Monsters Inc (Hollywood Land)
    { itemId: 'dca-16', lat: 33.8085, lng: -117.9190, approx: true }, // Carthay Circle (Buena Vista St)
    { itemId: 'dca-23', lat: 33.8062, lng: -117.9195, approx: true }, // Little Mermaid (Paradise Gardens Park)
    { itemId: 'dca-36', lat: 33.8073, lng: -117.9195, approx: true }, // Aunt Cass Cafe (San Fransokyo Square)
  ],
};

// General land/area labels per park, for orientation even when a specific
// ride isn't pinned. These use real approximate centers of each themed
// land based on public park layout knowledge.
const MAP_LANDS = {
  mk: [
    { name: 'Main Street, U.S.A.', lat: 28.41805, lng: -81.58105 },
    { name: 'Adventureland', lat: 28.418392, lng: -81.582336 },
    { name: 'Frontierland', lat: 28.4192, lng: -81.5848 },
    { name: 'Liberty Square', lat: 28.4205, lng: -81.5832 },
    { name: 'Fantasyland', lat: 28.4205, lng: -81.5805 },
    { name: 'Tomorrowland', lat: 28.4192, lng: -81.5785 },
  ],
  ep: [
    { name: 'World Celebration', lat: 28.3755, lng: -81.5494 },
    { name: 'World Discovery', lat: 28.3735, lng: -81.5485 },
    { name: 'World Nature', lat: 28.3737, lng: -81.5524 },
    { name: 'World Showcase', lat: 28.3705, lng: -81.5500 },
  ],
  hs: [
    { name: 'Hollywood Boulevard', lat: 28.3585, lng: -81.5600 },
    { name: 'Sunset Boulevard', lat: 28.3598, lng: -81.5600 },
    { name: 'Toy Story Land', lat: 28.3562, lng: -81.5610 },
    { name: "Galaxy's Edge", lat: 28.3565, lng: -81.5640 },
    { name: 'Echo Lake', lat: 28.3572, lng: -81.5593 },
  ],
  ak: [
    { name: 'Discovery Island', lat: 28.357733, lng: -81.590458 },
    { name: 'Africa', lat: 28.3625, lng: -81.5935 },
    { name: 'Asia', lat: 28.3585, lng: -81.5875 },
    { name: 'DinoLand U.S.A.', lat: 28.3558, lng: -81.5885 },
    { name: 'Pandora', lat: 28.3595, lng: -81.5945 },
  ],
  dl: [
    { name: 'Main Street, U.S.A.', lat: 33.8108, lng: -117.9190 },
    { name: 'Adventureland', lat: 33.8113, lng: -117.9213 },
    { name: 'New Orleans Square', lat: 33.8115, lng: -117.9180 },
    { name: 'Frontierland', lat: 33.8122, lng: -117.9220 },
    { name: 'Fantasyland', lat: 33.8133, lng: -117.9210 },
    { name: 'Tomorrowland', lat: 33.8135, lng: -117.9185 },
    { name: "Galaxy's Edge", lat: 33.8157, lng: -117.9228 },
  ],
  dca: [
    { name: 'Buena Vista Street', lat: 33.8085, lng: -117.9190 },
    { name: 'Hollywood Land', lat: 33.8068, lng: -117.9183 },
    { name: 'Avengers Campus', lat: 33.8081, lng: -117.9213 },
    { name: 'Cars Land', lat: 33.8045, lng: -117.9226 },
    { name: 'Grizzly Peak', lat: 33.8073, lng: -117.9209 },
    { name: 'Pixar Pier', lat: 33.8059, lng: -117.9183 },
    { name: 'Paradise Gardens Park', lat: 33.8062, lng: -117.9195 },
  ],
};
