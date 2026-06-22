// Rope Drop — Park Data
// To add/edit attractions, modify the sections arrays below.
// badge options: 'thrill' | 'family' | 'show' | 'food' | 'character'
// must: true  →  shows a star and sorts to top of section

// Items that support a song/variant picker after being checked.
// Used for rides with randomized soundtracks like Cosmic Rewind.
// Typical showtimes for entertainment — these are common patterns, not
// live daily schedules (Disney doesn't publish a public API and times
// shift constantly). Always double-check the My Disney Experience app
// or park signage for the actual time on your visit day.
// Menu items for food & drink spots, with a simple cost tier instead of
// exact prices (Disney pricing changes often and isn't worth pretending
// to track live). $ = snack, $$ = quick-service meal, $$$ = table-service
// or specialty item.
const MENU_DATA = {
  'mk-22': {
    tier: '$',
    items: [
      { name: 'Pineapple Dole Whip Cup' },
      { name: 'Dole Whip Float (with pineapple juice)' },
      { name: 'Tropical Serenade Float' },
      { name: 'Coconut Cup (coconut or coconut-pineapple swirl)' },
      { name: 'Pineapple Upside-Down Cake with Dole Whip' },
    ]
  },
  'mk-23': {
    tier: '$$$',
    items: [
      { name: 'Breakfast entrées (table-service)' },
      { name: 'Lunch entrées (table-service)' },
      { name: 'The Grey Stuff (dessert)' },
    ]
  },
  'mk-24': {
    tier: '$$',
    items: [
      { name: 'Smoked Turkey Leg' },
    ]
  },
  'mk-25': {
    tier: '$$',
    items: [
      { name: 'All-Beef Hot Dog' },
      { name: 'Chipotle BBQ Foot-Long Hot Dog' },
      { name: 'Corn Dog Nuggets' },
      { name: 'Assorted Fountain Beverage' },
      { name: 'Pressed Penny Silk Pie' },
    ]
  },
  'mk-26': {
    tier: '$$',
    items: [
      { name: 'Sweet or savory waffle (seasonal flavors rotate)' },
      { name: 'Funnel cake (seasonal toppings)' },
    ]
  },
};

const TYPICAL_SHOWTIMES = {
  'mk-15': ['2:00 PM'],
  'mk-16': ['Varies — check app, usually one nightly show at park close'],
  'mk-17': ['Continuous — runs all day, just walk up'],
  'mk-18': ['11:30 AM', '4:00 PM'],
  'hs-09': ['9:30 AM', '11:30 AM', '2:00 PM', '4:00 PM'],
  'hs-10': ['Varies — typically 1–2 shows nightly, check app'],
  'hs-11': ['Varies — one nightly show, usually around park close'],
  'hs-12': ['Continuous throughout the day — just walk up'],
  'ep-15': ['9:00 PM (seasonal, check app for current schedule)'],
  'ak-08': ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
  'ak-09': ['Continuous throughout the day — just walk up'],
  'ak-12': ['After dark — short looping projections until close'],
  'dl-13': ['Varies — typically nightly, check app'],
  'dl-14': ['Varies — typically nightly at DCA, check app'],
  'dl-15': ['Seasonal — check app for current run dates and time'],
  'dl-16': ['Varies — usually one nightly show, check app'],
  'dca-05': ['Varies — typically nightly, check app'],
  'dca-14': ['Continuous cavalcades throughout the day'],
  'dca-15': ['Seasonal — check app for current showtimes'],
};

const SONG_PICKERS = {
  'ep-01': {
    label: 'Which song did you get?',
    options: [
      'September — Earth, Wind & Fire',
      'Disco Inferno — The Trammps',
      'Conga — Miami Sound Machine',
      'Everybody Wants to Rule the World — Tears for Fears',
      'I Ran — A Flock of Seagulls',
      'One Way or Another — Blondie',
    ]
  }
};

const RESORTS = [
  { id: 'wdw', name: 'Walt Disney World', shortName: 'Disney World', location: 'Orlando, FL', emoji: '🏰' },
  { id: 'dlr', name: 'Disneyland Resort', shortName: 'Disneyland', location: 'Anaheim, CA', emoji: '⭐' },
];

const PARKS = [
  {
    id: 'mk',
    resortId: 'wdw',
    name: 'Magic Kingdom',
    shortName: 'Magic Kingdom',
    resort: 'Walt Disney World · Orlando',
    emoji: '🏰',
    accentColor: '#1a6fd4',
    accentLight: '#e8f1fc',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'mk-01', name: 'Seven Dwarfs Mine Train', meta: 'Fantasyland · 38" min height', badge: 'thrill', must: true },
          { id: 'mk-02', name: 'Haunted Mansion', meta: 'Liberty Square · all ages', badge: 'family', must: true },
          { id: 'mk-03', name: 'Pirates of the Caribbean', meta: 'Adventureland · all ages', badge: 'family', must: true },
          { id: 'mk-04', name: 'Space Mountain', meta: 'Tomorrowland · 44" min height', badge: 'thrill', must: true },
          { id: 'mk-05', name: 'Big Thunder Mountain Railroad', meta: 'Frontierland · 40" min height', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'Family rides',
        items: [
          { id: 'mk-06', name: "It's a Small World", meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'mk-07', name: "Buzz Lightyear's Space Ranger Spin", meta: 'Tomorrowland · all ages', badge: 'family' },
          { id: 'mk-08', name: 'Jungle Cruise', meta: 'Adventureland · all ages', badge: 'family' },
          { id: 'mk-09', name: 'The Many Adventures of Winnie the Pooh', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'mk-10', name: 'Dumbo the Flying Elephant', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'mk-11', name: 'Tomorrowland Speedway', meta: 'Tomorrowland · 32" to ride, 54" to drive alone', badge: 'family' },
          { id: 'mk-12', name: 'Under the Sea — Journey of the Little Mermaid', meta: 'Fantasyland · all ages', badge: 'family' },
        ]
      },
      {
        name: 'Thrills',
        items: [
          { id: 'mk-13', name: 'TRON Lightcycle / Run', meta: 'Tomorrowland · 48" min height', badge: 'thrill' },
          { id: 'mk-14', name: 'Splash Mountain → Tiana\'s Bayou Adventure', meta: 'Frontierland · 40" min height', badge: 'thrill' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'mk-15', name: 'Festival of Fantasy Parade', meta: 'Check My Disney Experience for times', badge: 'show' },
          { id: 'mk-16', name: 'Happily Ever After Fireworks', meta: 'Evenings — check schedule', badge: 'show' },
          { id: 'mk-17', name: "Mickey's PhilharMagic", meta: 'Fantasyland · 4D film, all ages', badge: 'show' },
          { id: 'mk-18', name: 'Move It! Shake It! MousekeDance It! Street Party', meta: 'Main Street USA · check times', badge: 'show' },
        ]
      },
      {
        name: 'Character meets',
        items: [
          { id: 'mk-19', name: 'Mickey & Minnie at Town Square Theater', meta: 'Main Street USA · Lightning Lane available', badge: 'character' },
          { id: 'mk-20', name: 'Cinderella & Elena at Princess Fairytale Hall', meta: 'Fantasyland · Lightning Lane available', badge: 'character' },
          { id: 'mk-21', name: 'Rapunzel & Tiana at Princess Fairytale Hall', meta: 'Fantasyland · Lightning Lane available', badge: 'character' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'mk-22', name: 'Dole Whip at Aloha Isle', meta: 'Adventureland · classic must-eat', badge: 'food', must: true },
          { id: 'mk-23', name: 'Be Our Guest Restaurant', meta: 'Fantasyland · reservations required', badge: 'food' },
          { id: 'mk-24', name: 'Smoked turkey leg', meta: 'Carts near Fantasyland & Frontierland', badge: 'food' },
          { id: 'mk-25', name: "Casey's Corner hot dog", meta: 'Main Street USA', badge: 'food' },
          { id: 'mk-26', name: 'Sleepy Hollow waffles', meta: 'Liberty Square · sweet & savory options', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'hs',
    resortId: 'wdw',
    name: 'Hollywood Studios',
    shortName: 'Hollywood Studios',
    resort: 'Walt Disney World · Orlando',
    emoji: '🎬',
    accentColor: '#b83230',
    accentLight: '#faeaea',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'hs-01', name: 'Star Wars: Rise of the Resistance', meta: "Galaxy's Edge · 40\" min height", badge: 'thrill', must: true },
          { id: 'hs-02', name: 'Millennium Falcon: Smugglers Run', meta: "Galaxy's Edge · 38\" min height", badge: 'thrill', must: true },
          { id: 'hs-03', name: 'Slinky Dog Dash', meta: 'Toy Story Land · 38" min height', badge: 'thrill', must: true },
          { id: 'hs-04', name: 'Tower of Terror', meta: 'Sunset Blvd · 40" min height', badge: 'thrill', must: true },
          { id: 'hs-05', name: "Rock 'n' Roller Coaster", meta: 'Sunset Blvd · 48" min height', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'Family rides & shows',
        items: [
          { id: 'hs-06', name: 'Toy Story Mania!', meta: 'Toy Story Land · all ages', badge: 'family' },
          { id: 'hs-07', name: 'Alien Swirling Saucers', meta: 'Toy Story Land · 32" min height', badge: 'family' },
          { id: 'hs-08', name: 'Mickey & Minnie\'s Runaway Railway', meta: 'Hollywood · all ages', badge: 'family' },
          { id: 'hs-09', name: 'Indiana Jones Epic Stunt Spectacular', meta: 'Echo Lake · live show, check times', badge: 'show' },
          { id: 'hs-10', name: 'Fantasmic!', meta: 'Hollywood Hills Amphitheater · evenings', badge: 'show' },
          { id: 'hs-11', name: 'Star Wars: A Galactic Spectacular', meta: 'Fireworks show · evenings', badge: 'show' },
          { id: 'hs-12', name: 'For the First Time in Forever: A Frozen Sing-Along', meta: 'Echo Lake · all ages', badge: 'show' },
        ]
      },
      {
        name: "Galaxy's Edge",
        items: [
          { id: 'hs-13', name: 'Build a lightsaber at Savi\'s Workshop', meta: '$259.99 · reservations required', badge: 'character' },
          { id: 'hs-14', name: 'Build a droid at Droid Depot', meta: '$119.99 · walk-up or reservations', badge: 'character' },
          { id: 'hs-15', name: 'Blue or green milk at Milk Stand', meta: "Galaxy's Edge · plant-based drinks", badge: 'food' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'hs-16', name: 'Ronto Wrap at Ronto Roasters', meta: "Galaxy's Edge · must-eat", badge: 'food', must: true },
          { id: 'hs-17', name: 'Tater tot nachos at Woody\'s Lunch Box', meta: 'Toy Story Land', badge: 'food' },
          { id: 'hs-18', name: "Oga's Cantina", meta: "Galaxy's Edge · reservations required, 21+ after 9pm", badge: 'food' },
          { id: 'hs-19', name: '50\'s Prime Time Café', meta: 'Hollywood · reservations suggested', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'ep',
    resortId: 'wdw',
    name: 'EPCOT',
    shortName: 'EPCOT',
    resort: 'Walt Disney World · Orlando',
    emoji: '🌍',
    accentColor: '#1a7a5e',
    accentLight: '#e4f5ef',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'ep-01', name: 'Guardians of the Galaxy: Cosmic Rewind', meta: 'World Discovery · 42" min height', badge: 'thrill', must: true },
          { id: 'ep-02', name: "Remy's Ratatouille Adventure", meta: 'World Showcase · all ages', badge: 'family', must: true },
          { id: 'ep-03', name: 'Frozen Ever After', meta: 'World Showcase · all ages', badge: 'family', must: true },
          { id: 'ep-04', name: 'Soarin\' Around the World', meta: 'World Nature · 40" min height', badge: 'family', must: true },
          { id: 'ep-05', name: 'Test Track', meta: 'World Discovery · 40" min height', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'More rides',
        items: [
          { id: 'ep-06', name: 'Mission: SPACE', meta: 'World Discovery · 40" min height · choose Orange or Green', badge: 'thrill' },
          { id: 'ep-07', name: 'Journey Into Imagination with Figment', meta: 'World Discovery · all ages', badge: 'family' },
          { id: 'ep-08', name: 'Living with the Land', meta: 'World Nature · all ages', badge: 'family' },
          { id: 'ep-09', name: 'Gran Fiesta Tour (Mexico)', meta: 'World Showcase · all ages', badge: 'family' },
        ]
      },
      {
        name: 'World Showcase',
        items: [
          { id: 'ep-10', name: 'Mexico pavilion', meta: 'Pyramid, Gran Fiesta Tour & La Hacienda', badge: 'family' },
          { id: 'ep-11', name: 'Japan pavilion', meta: 'Shopping, Mitsukoshi store & sake bar', badge: 'family' },
          { id: 'ep-12', name: 'France pavilion', meta: 'Crepes, wine & Impressions de France film', badge: 'family' },
          { id: 'ep-13', name: 'UK pavilion', meta: 'Rose & Crown Pub, fish & chips', badge: 'family' },
          { id: 'ep-14', name: 'Canada pavilion', meta: 'Le Cellier steakhouse, O Canada! film', badge: 'family' },
          { id: 'ep-15', name: 'EPCOT Forever / Harmonious', meta: 'Lagoon fireworks show · evenings', badge: 'show' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'ep-16', name: 'School bread at Kringla Bakeri (Norway)', meta: 'World Showcase · a EPCOT classic', badge: 'food', must: true },
          { id: 'ep-17', name: 'Crepes at Les Halles (France)', meta: 'World Showcase', badge: 'food' },
          { id: 'ep-18', name: 'Croissant donut at Refreshment Port', meta: 'Near Canada pavilion', badge: 'food' },
          { id: 'ep-19', name: 'Rose & Crown Pub (UK)', meta: 'Fish & chips & Guinness', badge: 'food' },
          { id: 'ep-20', name: 'Frozen margarita at La Cava del Tequila (Mexico)', meta: 'World Showcase · no reservation needed', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'ak',
    resortId: 'wdw',
    name: 'Animal Kingdom',
    shortName: 'Animal Kingdom',
    resort: 'Walt Disney World · Orlando',
    emoji: '🦁',
    accentColor: '#4a7c2f',
    accentLight: '#eaf4e2',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'ak-01', name: 'Avatar Flight of Passage', meta: 'Pandora · 44" min height', badge: 'thrill', must: true },
          { id: 'ak-02', name: 'Kilimanjaro Safaris', meta: 'Africa · all ages · go early for best animal sightings', badge: 'family', must: true },
          { id: 'ak-03', name: 'Expedition Everest', meta: 'Asia · 44" min height', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'More rides',
        items: [
          { id: 'ak-04', name: "Na'vi River Journey", meta: 'Pandora · all ages', badge: 'family' },
          { id: 'ak-05', name: 'Kali River Rapids', meta: 'Asia · 38" min height · you will get soaked', badge: 'thrill' },
          { id: 'ak-06', name: 'DINOSAUR', meta: 'DinoLand U.S.A. · 40" min height', badge: 'thrill' },
          { id: 'ak-07', name: 'TriceraTop Spin', meta: 'DinoLand U.S.A. · all ages', badge: 'family' },
        ]
      },
      {
        name: 'Shows & trails',
        items: [
          { id: 'ak-08', name: 'Festival of the Lion King', meta: 'Africa · live show, all ages', badge: 'show' },
          { id: 'ak-09', name: 'Finding Nemo: The Big Blue… and Beyond!', meta: 'DinoLand · live show', badge: 'show' },
          { id: 'ak-10', name: 'Gorilla Falls Exploration Trail', meta: 'Africa · walk-through, all ages', badge: 'family' },
          { id: 'ak-11', name: 'Maharajah Jungle Trek', meta: 'Asia · tigers, bats & birds', badge: 'family' },
          { id: 'ak-12', name: 'Tree of Life Awakenings', meta: 'Discovery Island · evening projections', badge: 'show' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'ak-13', name: 'Flame Tree Barbecue', meta: 'Discovery Island · best views in the park', badge: 'food', must: true },
          { id: 'ak-14', name: "Satu'li Canteen", meta: 'Pandora · healthy bowls & great theming', badge: 'food' },
          { id: 'ak-15', name: 'Night Blossom at Pongu Pongu', meta: 'Pandora · passionfruit & lemonade slush', badge: 'food' },
          { id: 'ak-16', name: 'Tiffins Restaurant', meta: 'Discovery Island · signature dining, reservations required', badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'dl',
    resortId: 'dlr',
    name: 'Disneyland',
    shortName: 'Disneyland',
    resort: 'Disneyland Resort · Anaheim',
    emoji: '⭐',
    accentColor: '#5a3fa0',
    accentLight: '#eeebf8',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'dl-01', name: 'Indiana Jones Adventure', meta: 'Adventureland · 46" min height', badge: 'thrill', must: true },
          { id: 'dl-02', name: "It's a Small World (the original)", meta: 'Fantasyland · all ages — the one that started it all', badge: 'family', must: true },
          { id: 'dl-03', name: 'Star Wars: Rise of the Resistance', meta: "Galaxy's Edge · 40\" min height", badge: 'thrill', must: true },
          { id: 'dl-04', name: 'Haunted Mansion', meta: 'New Orleans Square · all ages', badge: 'family', must: true },
          { id: 'dl-05', name: 'Pirates of the Caribbean', meta: 'New Orleans Square · all ages — the original!', badge: 'family', must: true },
          { id: 'dl-06', name: 'Matterhorn Bobsleds', meta: 'Fantasyland · 35" min height', badge: 'thrill', must: true },
        ]
      },
      {
        name: 'Classic Disneyland',
        items: [
          { id: 'dl-07', name: 'Splash Mountain → Tiana\'s Bayou Adventure', meta: 'Critter Country · 40" min height · you will get wet', badge: 'family' },
          { id: 'dl-08', name: 'Space Mountain', meta: 'Tomorrowland · 40" min height', badge: 'thrill' },
          { id: 'dl-09', name: 'Big Thunder Mountain Railroad', meta: 'Frontierland · 40" min height', badge: 'thrill' },
          { id: 'dl-10', name: 'Peter Pan\'s Flight', meta: 'Fantasyland · all ages', badge: 'family' },
          { id: 'dl-11', name: 'Jungle Cruise', meta: 'Adventureland · all ages', badge: 'family' },
          { id: 'dl-12', name: 'Millennium Falcon: Smugglers Run', meta: "Galaxy's Edge · 38\" min height", badge: 'thrill' },
        ]
      },
      {
        name: 'Shows & experiences',
        items: [
          { id: 'dl-13', name: 'Fantasmic!', meta: 'Rivers of America · evenings, check schedule', badge: 'show' },
          { id: 'dl-14', name: 'World of Color', meta: 'Paradise Bay, DCA · evenings', badge: 'show' },
          { id: 'dl-15', name: 'Main Street Electrical Parade', meta: 'Check schedule — seasonal', badge: 'show' },
          { id: 'dl-16', name: 'Disneyland Forever Fireworks', meta: 'Check schedule', badge: 'show' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'dl-17', name: 'Monte Cristo at Blue Bayou', meta: 'New Orleans Square · reservations suggested', badge: 'food', must: true },
          { id: 'dl-18', name: 'Dole Whip at Tiki Juice Bar', meta: 'Adventureland · the original Disneyland Dole Whip', badge: 'food', must: true },
          { id: 'dl-19', name: 'Mint julep at Royal St. Verandah', meta: 'New Orleans Square · non-alcoholic', badge: 'food' },
          { id: 'dl-20', name: 'Corn dog at Little Red Wagon', meta: 'Main Street USA · Disneyland institution', badge: 'food' },
          { id: 'dl-21', name: 'Churro from a cart', meta: 'Available throughout the park', badge: 'food' },
          { id: 'dl-22', name: 'Ronto Wrap at Ronto Roasters', meta: "Galaxy's Edge", badge: 'food' },
        ]
      }
    ]
  },

  {
    id: 'dca',
    resortId: 'dlr',
    name: 'Disney California Adventure',
    shortName: 'California Adventure',
    resort: 'Disneyland Resort · Anaheim',
    emoji: '🎡',
    accentColor: '#d4651a',
    accentLight: '#fbeee2',
    sections: [
      {
        name: 'Must-dos',
        items: [
          { id: 'dca-01', name: 'Radiator Springs Racers', meta: 'Cars Land · 40" min height', badge: 'thrill', must: true },
          { id: 'dca-02', name: 'Guardians of the Galaxy – Mission: BREAKOUT!', meta: 'Avengers Campus · 40" min height', badge: 'thrill', must: true },
          { id: 'dca-03', name: 'Web Slingers: A Spider-Man Adventure', meta: 'Avengers Campus · all ages', badge: 'family', must: true },
          { id: 'dca-04', name: 'Incredicoaster', meta: 'Pixar Pier · 48" min height', badge: 'thrill', must: true },
          { id: 'dca-05', name: 'World of Color', meta: 'Paradise Bay · evenings', badge: 'show', must: true },
        ]
      },
      {
        name: 'More rides',
        items: [
          { id: 'dca-06', name: 'Soarin\' Around the World', meta: 'Grizzly Peak · 40" min height', badge: 'family' },
          { id: 'dca-07', name: 'Grizzly River Run', meta: 'Grizzly Peak · 42" min height · you will get wet', badge: 'thrill' },
          { id: 'dca-08', name: 'Goofy\'s Sky School', meta: 'Paradise Gardens Park · 42" min height', badge: 'thrill' },
          { id: 'dca-09', name: 'Pixar Pal-A-Round (swinging gondola)', meta: 'Pixar Pier · 40" min height', badge: 'family' },
          { id: 'dca-10', name: 'Toy Story Midway Mania!', meta: 'Pixar Pier · all ages', badge: 'family' },
          { id: 'dca-11', name: 'Monsters, Inc. Mike & Sulley to the Rescue!', meta: 'Hollywood Land · all ages', badge: 'family' },
        ]
      },
      {
        name: 'Avengers Campus',
        items: [
          { id: 'dca-12', name: 'Avengers Headquarters meet-and-greets', meta: 'Spider-Man, Black Panther & more', badge: 'character' },
          { id: 'dca-13', name: 'WEB Suppliers shopping', meta: 'Avengers Campus · merch & props', badge: 'family' },
        ]
      },
      {
        name: 'Shows & entertainment',
        items: [
          { id: 'dca-14', name: 'Pixar Fest cavalcades', meta: 'Seasonal — check schedule', badge: 'show' },
          { id: 'dca-15', name: 'Frozen – Live at the Hyperion', meta: 'Hollywood Land · seasonal, check schedule', badge: 'show' },
        ]
      },
      {
        name: 'Food & drink',
        items: [
          { id: 'dca-16', name: 'Cherry Cola Float at Carthay Circle', meta: 'Buena Vista Street', badge: 'food', must: true },
          { id: 'dca-17', name: 'Churro Toffee Sundae', meta: 'Available seasonally', badge: 'food' },
          { id: 'dca-18', name: 'Ghirardelli ice cream', meta: 'Buena Vista Street', badge: 'food' },
          { id: 'dca-19', name: 'Award Wieners hot dogs', meta: 'Hollywood Land', badge: 'food' },
          { id: 'dca-20', name: 'Lamplight Lounge', meta: 'Pixar Pier · waterfront dining, reservations suggested', badge: 'food' },
        ]
      }
    ]
  }
];
