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
// Typical operating hours per park. Real daily hours vary by season and
// special events — these are common baselines, not a live schedule.
// Always confirm in the My Disney Experience app before your visit.
const TYPICAL_PARK_HOURS = {
  mk:  { early: '8:30 AM (Early Entry, resort guests)', open: '9:00 AM', close: '9:00 PM (later in busy season, often 10–11 PM)' },
  ep:  { early: '8:30 AM (Early Entry, resort guests)', open: '9:00 AM', close: '9:00 PM' },
  hs:  { early: '8:00 AM (Early Entry, resort guests)', open: '8:30 AM', close: '9:00 PM' },
  ak:  { early: '7:30 AM (Early Entry, resort guests)', open: '8:00 AM', close: '7:00 PM' },
  dl:  { early: '7:30 AM (Early Entry, resort guests)', open: '8:00 AM', close: '10:00 PM (varies seasonally)' },
  dca: { early: '7:30 AM (Early Entry, resort guests)', open: '8:00 AM', close: '9:00 PM (varies seasonally)' },
};

const MENU_DATA = {
  'mk-22': {
    tier: '$',
    items: [
      { name: 'Pineapple Dole Whip Cup' },
      { name: 'Vanilla Dole Whip Cup' },
      { name: 'Pineapple-Vanilla Swirl Cup' },
      { name: 'Dole Whip Float (with pineapple juice)' },
      { name: 'Tropical Serenade Float (pineapple-orange-guava juice, coconut soft-serve, cake pop)' },
      { name: 'Coconut Cup' },
      { name: 'Coconut-Pineapple Swirl Cup' },
      { name: 'Pineapple Upside-Down Cake with Dole Whip' },
      { name: 'Pineapple Juice (no soft-serve)' },
    ]
  },
  'mk-23': {
    tier: '$$$',
    items: [
      { name: 'Braised Pork Shank (lunch/dinner)' },
      { name: 'Pan-Seared Salmon (lunch/dinner)' },
      { name: 'Ratatouille Vegetable Tart (lunch/dinner)' },
      { name: 'French Onion Soup' },
      { name: 'Roasted Chicken (lunch/dinner)' },
      { name: 'Lobster & Shrimp Pasta Carbonara' },
      { name: 'Filet Mignon (dinner)' },
      { name: 'The Grey Stuff (signature dessert)' },
      { name: 'Master\'s Cupcake' },
      { name: 'Croque Monsieur (breakfast)' },
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
      { name: 'Classic All-Beef Hot Dog' },
      { name: 'Chipotle BBQ All-Beef Hot Dog (pulled pork, slaw, chipotle BBQ sauce)' },
      { name: 'Chipotle BBQ Foot-Long Hot Dog' },
      { name: 'Chili-Cheese Hot Dog' },
      { name: 'Bacon Mac & Cheese Hot Dog' },
      { name: 'Plant-Based Hot Dog' },
      { name: 'Corn Dog Nuggets' },
      { name: 'Loaded Fries' },
      { name: 'Pressed Penny Silk Pie (chocolate tart)' },
      { name: 'Assorted Fountain Beverages' },
    ]
  },
  'mk-26': {
    tier: '$$',
    items: [
      { name: 'Classic Belgian Waffle (sweet toppings rotate seasonally)' },
      { name: 'Savory Waffle (seasonal, often chicken or pulled pork)' },
      { name: 'Funnel Cake' },
      { name: 'Seasonal Pumpkin Funnel Cake Sundae (fall)' },
      { name: 'Nutella Waffle (when available)' },
      { name: 'Soft-Serve Sundae' },
      { name: 'Specialty Lemonade' },
      { name: 'Hot or Iced Coffee' },
    ]
  },
  'mk-27': {
    tier: '$$',
    items: [
      { name: 'Build-Your-Own Nacho Bowl' },
      { name: 'Southwest Salad' },
      { name: 'Pulled Pork Sandwich' },
      { name: 'Vegetarian Taco Salad' },
      { name: 'Tex-Mex Rice Bowl' },
      { name: 'Churros' },
      { name: 'Frozen Lemonade' },
    ]
  },
  'mk-28': {
    tier: '$',
    items: [
      { name: 'Turkey Leg (also sold here)' },
      { name: 'Chili Cheese Dog' },
      { name: 'Fried Pickles' },
    ]
  },
  'mk-29': {
    tier: '$',
    items: [
      { name: 'Frozen Lemonade' },
      { name: 'Frozen Lemon Slush' },
      { name: 'Soft Drinks' },
    ]
  },
  'mk-30': {
    tier: '$$$',
    items: [
      { name: 'All-You-Care-To-Enjoy Family-Style Turkey & Pot Roast' },
      { name: 'Seasonal Vegetables & Mashed Potatoes' },
      { name: 'Macaroni & Cheese' },
      { name: "Grandma's Chicken Pot Pie" },
      { name: 'Seasonal Cobbler' },
    ]
  },
  'mk-31': {
    tier: '$',
    items: [
      { name: 'Frozen Coca-Cola' },
      { name: 'Smoked Turkey Leg' },
      { name: 'Grab-and-go Sandwiches' },
      { name: 'Packaged Snacks' },
    ]
  },
  'mk-32': {
    tier: '$$$',
    items: [
      { name: 'Chilled Seafood Tower (lunch/dinner)' },
      { name: 'Pan-Seared Beef Tenderloin' },
      { name: 'Herb Roasted Chicken' },
      { name: 'Lobster & Pasta' },
      { name: "Gooey Toffee Cake" },
      { name: 'Character dining experience with Disney Princesses' },
    ]
  },
  'mk-33': {
    tier: '$$$',
    items: [
      { name: 'All-You-Care-To-Enjoy Buffet (breakfast, lunch, dinner)' },
      { name: 'Carved Meats (lunch/dinner)' },
      { name: 'Seasonal Salads' },
      { name: 'Kids\' Buffet Favorites' },
      { name: 'Character dining with Winnie the Pooh & friends' },
    ]
  },
  'mk-34': {
    tier: '$$$',
    items: [
      { name: "Tony's Spaghetti & Meatballs (Lady and the Tramp callback)" },
      { name: 'Chicken Parmesan' },
      { name: 'Lasagna' },
      { name: 'Italian-Style Salad' },
      { name: 'Tiramisu' },
    ]
  },
  'mk-35': {
    tier: '$$$',
    items: [
      { name: 'Specialty Burgers' },
      { name: 'Reuben Sandwich' },
      { name: 'Hand-Spun Milkshakes' },
      { name: 'Chicken Caesar Wrap' },
    ]
  },
  'mk-36': {
    tier: '$$$',
    items: [
      { name: 'Pork & Watermelon Bao Buns' },
      { name: "Falls Family Falafel" },
      { name: 'Grilled Beef Tenderloin' },
      { name: "S.E.A. Skewers" },
      { name: 'Schweitzer Falls Sundae' },
    ]
  },
  'mk-37': {
    tier: '$$$',
    items: [
      { name: 'Currently closed — reopening planned for Fall 2026' },
    ]
  },
  'mk-38': {
    tier: '$$',
    items: [
      { name: 'Grilled Salmon' },
      { name: 'Lighthouse Sandwich (lobster roll)' },
      { name: 'Fish & Chips' },
      { name: 'Shrimp & Lobster Salad' },
      { name: 'Clam Chowder' },
      { name: 'Vegetarian Chili' },
    ]
  },
  'mk-39': {
    tier: '$$',
    items: [
      { name: 'Bacon Cheeseburger' },
      { name: 'Plant-Based Burger' },
      { name: 'Rotisserie Chicken' },
      { name: 'Buffalo Chicken Sandwich' },
      { name: 'Kids\' Build-Your-Own Pasta' },
    ]
  },
  'mk-40': {
    tier: '$',
    items: [
      { name: 'Classic Ice Cream Scoops' },
      { name: 'Sundaes' },
      { name: 'Ice Cream Floats' },
      { name: 'Waffle Cone Sandwiches' },
    ]
  },
  'mk-41': {
    tier: '$',
    items: [
      { name: 'Cinnamon Roll' },
      { name: "LeFou's Brew (non-alcoholic specialty drink)" },
      { name: 'Caramel Apple' },
    ]
  },
  'mk-42': {
    tier: '$',
    items: [
      { name: 'Citrus Swirl (orange & vanilla soft-serve)' },
      { name: 'Orange Juice Slushy' },
      { name: 'Fresh Fruit' },
    ]
  },
  'mk-43': {
    tier: '$$',
    items: [
      { name: 'Starbucks Coffee & Espresso Drinks' },
      { name: 'Pastries & Croissants' },
      { name: 'Breakfast Sandwiches' },
      { name: 'Mickey-Shaped Treats' },
    ]
  },
  'mk-44': {
    tier: '$$',
    items: [
      { name: 'Flatbread Pizzas' },
      { name: 'Italian Sub Sandwich' },
      { name: 'Caesar Salad' },
      { name: 'Kids\' Pasta' },
    ]
  },
  'mk-45': {
    tier: '$',
    items: [
      { name: 'Loaded Tater Tots' },
      { name: 'Mac & Cheese' },
      { name: 'Hot Dog Bites' },
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
          { id: 'mk-05', name: 'Big Thunder Mountain Railroad', meta: 'Frontierland · 38" min height', badge: 'thrill', must: true, status: 'new' },
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
          { id: 'mk-46', name: "Peter Pan's Flight", meta: 'Fantasyland · all ages, flying galleon dark ride', badge: 'family' },
          { id: 'mk-47', name: 'The Magic Carpets of Aladdin', meta: 'Adventureland · all ages, spinning ride', badge: 'family' },
          { id: 'mk-48', name: 'Astro Orbiter', meta: 'Tomorrowland · all ages, elevated spinning rockets', badge: 'family' },
          { id: 'mk-49', name: 'Tomorrowland Transit Authority PeopleMover', meta: 'Tomorrowland · all ages, scenic elevated ride', badge: 'family' },
          { id: 'mk-50', name: 'The Barnstormer', meta: 'Storybook Circus · 35" min height, junior coaster', badge: 'family' },
          { id: 'mk-51', name: 'Walt Disney World Railroad', meta: 'Main Street USA · all ages — currently shuttle mode, not full loop (construction)', badge: 'family' },
          { id: 'mk-52', name: 'Main Street Vehicles', meta: 'Main Street USA · all ages, vintage cars', badge: 'family' },
          { id: 'mk-53', name: 'A Pirate\'s Adventure: Treasure of the Seven Seas', meta: 'Adventureland · all ages, interactive app-based treasure hunt', badge: 'family' },
          { id: 'mk-55', name: 'Swiss Family Treehouse', meta: 'Adventureland · all ages, walk-through treehouse', badge: 'family' },
          { id: 'mk-56', name: "Enchanted Tales with Belle", meta: 'Fantasyland · all ages, interactive storytelling', badge: 'family' },
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
          { id: 'mk-57', name: "Walt Disney's Enchanted Tiki Room", meta: 'Adventureland · audio-animatronic show, all ages', badge: 'show' },
          { id: 'mk-58', name: 'Monsters, Inc. Laugh Floor', meta: 'Tomorrowland · interactive comedy show', badge: 'show' },
          { id: 'mk-59', name: 'Carousel of Progress', meta: 'Tomorrowland · classic rotating theater show', badge: 'show' },
          { id: 'mk-60', name: 'The Hall of Presidents', meta: 'Liberty Square · audio-animatronic presidential show', badge: 'show' },
          { id: 'mk-61', name: 'Country Bear Musical Jamboree', meta: 'Frontierland · audio-animatronic musical show', badge: 'show' },
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
          { id: 'mk-27', name: 'Pecos Bill Tall Tale Inn & Café', meta: 'Frontierland · Tex-Mex quick-service', badge: 'food' },
          { id: 'mk-28', name: 'Golden Oak Outpost', meta: 'Frontierland · quick snacks', badge: 'food' },
          { id: 'mk-29', name: 'Westward Ho', meta: 'Frontierland · frozen lemonade & snacks', badge: 'food' },
          { id: 'mk-30', name: 'Liberty Tree Tavern', meta: 'Liberty Square · table-service American fare', badge: 'food' },
          { id: 'mk-31', name: 'Liberty Square Market', meta: 'Liberty Square · frozen drinks & snacks', badge: 'food' },
          { id: 'mk-32', name: "Cinderella's Royal Table", meta: 'Inside the castle · character dining, reservations essential', badge: 'food' },
          { id: 'mk-33', name: 'The Crystal Palace', meta: 'Main Street USA · Winnie the Pooh character buffet', badge: 'food' },
          { id: 'mk-34', name: "Tony's Town Square Restaurant", meta: 'Main Street USA · Lady and the Tramp Italian fare', badge: 'food' },
          { id: 'mk-35', name: 'The Plaza Restaurant', meta: 'Main Street USA · table-service sandwiches & shakes', badge: 'food' },
          { id: 'mk-36', name: 'Jungle Navigation Co. Ltd Skipper Canteen', meta: 'Adventureland · adventurous table-service menu', badge: 'food' },
          { id: 'mk-37', name: 'The Diamond Horseshoe', meta: 'Frontierland · seasonal quick-service', badge: 'food', status: 'closed' },
          { id: 'mk-38', name: 'Columbia Harbour House', meta: 'Liberty Square · seafood, quiet upstairs seating', badge: 'food' },
          { id: 'mk-39', name: "Cosmic Ray's Starlight Café", meta: 'Tomorrowland · burgers & live animatronic music', badge: 'food' },
          { id: 'mk-40', name: 'Plaza Ice Cream Parlor', meta: 'Main Street USA · classic ice cream', badge: 'food' },
          { id: 'mk-41', name: "Gaston's Tavern", meta: 'Fantasyland · cinnamon rolls & LeFou\'s Brew', badge: 'food' },
          { id: 'mk-42', name: 'Sunshine Tree Terrace', meta: 'Adventureland · Citrus Swirl soft-serve', badge: 'food' },
          { id: 'mk-43', name: 'Main Street Bakery (Starbucks)', meta: 'Main Street USA · pastries & coffee', badge: 'food' },
          { id: 'mk-44', name: 'Pinocchio Village Haus', meta: 'Fantasyland · flatbreads & pasta', badge: 'food' },
          { id: 'mk-45', name: "The Friar's Nook", meta: 'Fantasyland · loaded tots & mac and cheese', badge: 'food' },
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
