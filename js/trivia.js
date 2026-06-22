// Rope Drop — Trivia
// Multiple-choice trivia questions for the "Play" tab and quick-launch
// while waiting in line. Each question has 4 options, one correct index,
// and a short "did you know" explainer shown after answering.
// Content written in original phrasing, not copied from any single source.

const TRIVIA_GENERAL = [
  {
    q: 'How many "happy haunts" are said to live in the Haunted Mansion?',
    options: ['666', '999', '1,000', '1,313'],
    correct: 1,
    explain: 'The ghost host always claims you\'re the "1,000th" guest needed to complete the haunting — leaving room for exactly 999 haunts already inside.'
  },
  {
    q: 'What does EPCOT stand for?',
    options: ['Educational Park for Cultural Outreach Today', 'Experimental Prototype Community of Tomorrow', 'European Pavilion Center of Technology', 'Epic Park Created of Tomorrow'],
    correct: 1,
    explain: 'EPCOT began as Walt Disney\'s concept for an actual planned community before evolving into the theme park celebrating innovation and world culture that opened in 1982.'
  },
  {
    q: 'How many theme parks make up Walt Disney World?',
    options: ['Two', 'Three', 'Four', 'Five'],
    correct: 2,
    explain: 'Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom make up the four gated theme parks at Walt Disney World.'
  },
  {
    q: 'What was Mickey Mouse originally going to be named?',
    options: ['Morty', 'Mortimer', 'Marvin', 'Milton'],
    correct: 1,
    explain: 'Walt Disney\'s wife Lillian reportedly convinced him that "Mortimer Mouse" didn\'t quite have the right ring to it.'
  },
  {
    q: 'What is the secret underground network beneath Magic Kingdom called?',
    options: ['The Underground', 'The Utilidors', 'The Tunnels', 'The Substreet'],
    correct: 1,
    explain: 'Utilidors (short for "utility corridors") let cast members move between lands and backstage areas without walking through the park in costume.'
  },
  {
    q: 'Which ride at Magic Kingdom is the oldest, even older than the park itself?',
    options: ['Jungle Cruise', "It's a Small World", 'Prince Charming Regal Carrousel', 'Mad Tea Party'],
    correct: 2,
    explain: 'The carousel was originally built in 1917 for a park in Michigan, decades before Disney acquired and relocated it to Magic Kingdom.'
  },
  {
    q: 'What animal can be found inside the Tree of Life carvings at Animal Kingdom?',
    options: ['Just elephants', 'Over 300 different animal carvings', 'Only African animals', 'No animals, just patterns'],
    correct: 1,
    explain: 'The Tree of Life features more than 300 intricately carved animals spiraling around its trunk and roots.'
  },
  {
    q: "What's the name of the geodesic sphere that EPCOT's Spaceship Earth ride is built inside?",
    options: ['The Golf Ball', 'Spaceship Earth (the building itself)', 'The Dome', 'The Orb'],
    correct: 1,
    explain: 'The building and the ride share the same name — Spaceship Earth — even though fans often nickname the sphere "the golf ball."'
  },
  {
    q: 'What term do Disney employees who design rides and attractions go by?',
    options: ['Designers', 'Architects', 'Imagineers', 'Creators'],
    correct: 2,
    explain: 'Imagineering blends "imagination" and "engineering" — the team responsible for dreaming up and building Disney parks worldwide.'
  },
  {
    q: 'What is a Disney park employee officially called?',
    options: ['Associate', 'Cast Member', 'Team Member', 'Crew Member'],
    correct: 1,
    explain: 'Every employee at a Disney park, from ride operators to executives, is referred to as a "Cast Member" — reinforcing the idea that the park is one big show.'
  },
  {
    q: 'Which classic ride closed in 2023 to make way for Tiana\'s Bayou Adventure?',
    options: ['Pirates of the Caribbean', 'Splash Mountain', 'Big Thunder Mountain', "It's a Small World"],
    correct: 1,
    explain: 'Splash Mountain\'s ride track and drop stayed the same — only the theming changed when it became Tiana\'s Bayou Adventure.'
  },
  {
    q: 'What hidden shape do Imagineers love to sneak into park designs?',
    options: ['A star', "Mickey's silhouette (Hidden Mickey)", 'A castle outline', 'A pumpkin'],
    correct: 1,
    explain: 'Hidden Mickeys — three circles arranged like Mickey\'s head and ears — are tucked into rides, restaurants, and even pavement throughout Disney parks.'
  },
  {
    q: 'What candy is famously NOT sold anywhere in Disney parks?',
    options: ['Chocolate bars', 'Gum', 'Lollipops', 'Caramel apples'],
    correct: 1,
    explain: 'Disney has avoided selling gum in its parks for decades, largely to avoid the cleanup headache of gum stuck on walkways and attractions.'
  },
  {
    q: 'Which 1928 short film marked Mickey Mouse\'s breakout debut?',
    options: ['Plane Crazy', 'Steamboat Willie', 'The Gallopin\' Gaucho', 'Mickey\'s Follies'],
    correct: 1,
    explain: 'Steamboat Willie was the first Mickey cartoon released with synchronized sound, and it\'s the version most associated with his official debut.'
  },
  {
    q: 'What is the maximum possible score on Buzz Lightyear\'s Space Ranger Spin?',
    options: ['99,999', '500,000', '999,999', 'There is no maximum'],
    correct: 2,
    explain: 'Hitting every high-value target without missing a shot can theoretically push your score all the way to 999,999.'
  },
];

const TRIVIA_BY_PARK = {
  mk: [
    {
      q: 'How many rides operated at Magic Kingdom on its opening day in 1971?',
      options: ['12', '18', '23', '30'],
      correct: 2,
      explain: 'Magic Kingdom opened with 23 attractions, including Haunted Mansion, It\'s a Small World, and Country Bear Jamboree — several of which are still running today.'
    },
    {
      q: 'Which statue stands directly in front of Cinderella Castle?',
      options: ['The Sharing the Magic statue', 'The Partners statue', 'The Spirit of America statue', 'The Storyteller statue'],
      correct: 1,
      explain: 'The Partners statue depicts Walt Disney holding hands with Mickey Mouse, looking out toward the castle and Main Street.'
    },
    {
      q: 'What is the height requirement for TRON Lightcycle / Run?',
      options: ['38 inches', '40 inches', '44 inches', '48 inches'],
      correct: 3,
      explain: 'At 48 inches, TRON has one of the higher height requirements in the park, putting it alongside Rock \'n\' Roller Coaster and Tower of Terror.'
    },
    {
      q: 'What classic attraction did The Many Adventures of Winnie the Pooh replace in 1999?',
      options: ['Snow White\'s Scary Adventures', 'Mr. Toad\'s Wild Ride', '20,000 Leagues Under the Sea', 'The Skyway'],
      correct: 1,
      explain: 'A small statue honoring Mr. Toad is hidden in the queue of Winnie the Pooh as a nod to the beloved ride it replaced.'
    },
    {
      q: 'How many "scenes" does the Jungle Cruise typically take guests through on its journey?',
      options: ['Just one continuous river', 'Several themed river bends with a comedic skipper narration', 'A timed video experience', 'A single animatronic showroom'],
      correct: 1,
      explain: 'The skippers guide guests through multiple themed scenes — including the famous "backside of water" — all narrated with deliberately corny puns.'
    },
    {
      q: 'What new feature did Big Thunder Mountain Railroad gain in its 2026 refurbishment?',
      options: ['A loop', 'A lower height requirement', 'Indoor-only track', 'A second train track'],
      correct: 1,
      explain: 'The height requirement dropped from 40 inches to 38 inches, letting younger riders experience the coaster sooner.'
    },
  ],
  ep: [
    {
      q: 'What ride did Frozen Ever After replace inside the Norway pavilion?',
      options: ['Gran Fiesta Tour', 'Maelstrom', 'Spaceship Earth', 'Living with the Land'],
      correct: 1,
      explain: 'A few small Norwegian troll statues from the original Maelstrom ride are still hidden in the queue of Frozen Ever After today.'
    },
    {
      q: 'How many countries are represented in EPCOT\'s World Showcase?',
      options: ['9', '11', '14', '18'],
      correct: 1,
      explain: 'World Showcase features 11 country pavilions arranged in a large loop around the lagoon, from Mexico to Canada.'
    },
    {
      q: 'What\'s unique about the ride vehicles on Guardians of the Galaxy: Cosmic Rewind?',
      options: ['They go underwater', 'They rotate to face the action', 'They are open-air only', 'They are operated by guests'],
      correct: 1,
      explain: 'It\'s Disney\'s first rotating-vehicle roller coaster, spinning riders to face whatever\'s happening around them as the story unfolds.'
    },
    {
      q: 'How many possible songs can play during your ride on Cosmic Rewind?',
      options: ['Just 1, always the same', '3', '6', '12'],
      correct: 2,
      explain: 'Six classic rock songs are in rotation, so the soundtrack of your ride is different almost every time.'
    },
    {
      q: 'Which EPCOT pavilion houses Soarin\' Around the World?',
      options: ['The Land', 'The Seas with Nemo & Friends', 'World Discovery', 'Journey Into Imagination'],
      correct: 0,
      explain: 'The Land pavilion is the largest in EPCOT, and Soarin\' uses subtle scent effects timed to the in-flight visuals overhead.'
    },
  ],
  hs: [
    {
      q: 'What movies are featured throughout Mickey\'s PhilharMagic-style attractions at Hollywood Studios? (Trick question — what is Hollywood Studios actually themed around?)',
      options: ['Theme parks around the world', 'The history of film, TV, and music', 'Space exploration', 'Wildlife conservation'],
      correct: 1,
      explain: 'Hollywood Studios was originally called Disney-MGM Studios, themed entirely around the entertainment industry\'s golden age.'
    },
    {
      q: 'What land did Star Wars: Galaxy\'s Edge bring to Hollywood Studios?',
      options: ['Tatooine', 'Batuu', 'Endor', 'Jakku'],
      correct: 1,
      explain: 'Black Spire Outpost on the planet Batuu is the setting for the entire Galaxy\'s Edge land, including Rise of the Resistance and Smugglers Run.'
    },
    {
      q: 'What ride system does Star Wars: Rise of the Resistance share with Remy\'s Ratatouille Adventure?',
      options: ['Trackless ride vehicles', 'Roller coaster track', 'Boat-based ride system', 'Dark ride omnimover'],
      correct: 0,
      explain: 'Both rides use trackless vehicle technology, letting each car move independently rather than following a fixed rail.'
    },
    {
      q: 'How fast does Rock \'n\' Roller Coaster launch riders in under 3 seconds?',
      options: ['0 to 35 mph', '0 to 45 mph', '0 to 57 mph', '0 to 70 mph'],
      correct: 2,
      explain: 'The launch accelerates riders to nearly 60 mph almost instantly, making it one of the fastest-launching coasters at Walt Disney World.'
    },
  ],
  ak: [
    {
      q: 'How many animal carvings are featured on the Tree of Life?',
      options: ['About 50', 'About 150', 'Over 300', 'Over 1,000'],
      correct: 2,
      explain: 'More than 300 detailed animal carvings spiral around the massive artificial tree at the heart of Discovery Island.'
    },
    {
      q: 'What mythical creature is themed throughout Expedition Everest?',
      options: ['Dragon', 'Yeti', 'Phoenix', 'Griffin'],
      correct: 1,
      explain: 'The Yeti figure inside the mountain is one of the largest Audio-Animatronics figures Disney has ever built.'
    },
    {
      q: 'What is the minimum height requirement to ride Avatar Flight of Passage?',
      options: ['40 inches', '42 inches', '44 inches', '46 inches'],
      correct: 2,
      explain: 'At 44 inches, Flight of Passage has one of the taller height requirements in the park, matching its intense flight-simulator sensation.'
    },
    {
      q: 'Which ride at Animal Kingdom lets you spot real animals along the route?',
      options: ['DINOSAUR', 'Kilimanjaro Safaris', 'Na\'vi River Journey', 'Expedition Everest'],
      correct: 1,
      explain: 'Kilimanjaro Safaris drives guests through a real, expansive savanna habitat — the animals you see are genuinely living there, not animatronic.'
    },
  ],
  dl: [
    {
      q: 'In what year did the original Disneyland open?',
      options: ['1950', '1955', '1961', '1971'],
      correct: 1,
      explain: 'Disneyland opened on July 17, 1955, in Anaheim, California — the only Disney park Walt himself oversaw construction of personally.'
    },
    {
      q: 'What\'s the name of the castle at the center of Disneyland?',
      options: ['Cinderella Castle', 'Sleeping Beauty Castle', 'Beast\'s Castle', 'Snow White\'s Castle'],
      correct: 1,
      explain: 'Sleeping Beauty Castle is the original Disney park centerpiece, and its design later inspired castles at other Disney parks worldwide.'
    },
    {
      q: 'Which land did Star Wars: Galaxy\'s Edge add to Disneyland?',
      options: ['A new standalone park', 'An expansion within the existing park footprint', 'A nighttime-only experience', 'A water park addition'],
      correct: 1,
      explain: 'Galaxy\'s Edge was built within Disneyland\'s existing boundaries, requiring a significant reshaping of the park\'s backstage areas to fit it in.'
    },
  ],
  dca: [
    {
      q: 'What real California road trip route inspired Cars Land\'s design?',
      options: ['Route 66', 'Pacific Coast Highway', 'Highway 1', 'The Pan-American Highway'],
      correct: 0,
      explain: 'Cars Land\'s Radiator Springs is themed after classic Route 66 roadside towns, complete with neon signs and vintage gas station theming.'
    },
    {
      q: 'What Marvel-themed land opened at Disney California Adventure in 2021?',
      options: ['Stark Tower', 'Avengers Campus', 'S.H.I.E.L.D. Base', 'X-Mansion'],
      correct: 1,
      explain: 'Avengers Campus replaced part of the former A Bug\'s Land, bringing Guardians of the Galaxy and Spider-Man attractions into the park.'
    },
    {
      q: 'What nightly show takes place on the water at Disney California Adventure?',
      options: ['Fantasmic!', 'World of Color', 'Happily Ever After', 'Symphony in the Stars'],
      correct: 1,
      explain: 'World of Color combines fountains, lights, and projections across Paradise Bay for a nightly spectacle unique to DCA.'
    },
  ],
};
