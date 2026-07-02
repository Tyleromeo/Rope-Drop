// Park Moments — Collections
// Themed groupings of attractions that span across one or more parks.
// Pre-built collections live here; custom user-created ones are stored
// separately per-trip in storage.js. Each collection lists real item IDs
// that must exist in PARKS (data.js) — verified at build time.

const PREBUILT_COLLECTIONS = [
  // ── Disney World collections ──────────────────────────────────────────
  {
    id: 'wdw-nighttime-spectaculars',
    resortId: 'wdw',
    name: 'Nighttime Spectaculars',
    emoji: '🌙',
    description: "Walt Disney World's three regularly-scheduled nighttime shows — Wondrous Journeys with Fireworks, Luminous, and Fantasmic! Animal Kingdom doesn't run fireworks out of consideration for the animals.",
    itemIds: ['mk-16', 'ep-15', 'hs-10'],
  },
  {
    id: 'wdw-mountains',
    resortId: 'wdw',
    name: 'Disney World Mountains',
    emoji: '🏔️',
    description: 'The four Disney World mountain adventures: Space Mountain, Big Thunder, Tiana’s Bayou Adventure, and Expedition Everest.',
    itemIds: ['mk-04', 'mk-05', 'mk-14', 'ak-03'],
  },
  {
    id: 'wdw-thrill-rides',
    resortId: 'wdw',
    name: 'Disney World Thrill Rides',
    emoji: '⚡',
    description: 'The biggest, fastest, and most intense rides across Walt Disney World.',
    itemIds: ['mk-01', 'mk-04', 'mk-05', 'mk-13', 'mk-14', 'hs-01', 'hs-02', 'hs-03', 'hs-04', 'hs-05', 'ep-01', 'ep-05', 'ep-06', 'ak-01', 'ak-03', 'ak-05'],
  },
  {
    id: 'wdw-coasters',
    resortId: 'wdw',
    name: 'Disney World Coasters',
    emoji: '🎢',
    description: 'Every coaster-style ride currently tracked across Walt Disney World.',
    itemIds: ['mk-01', 'mk-04', 'mk-05', 'mk-13', 'mk-50', 'hs-03', 'hs-05', 'ep-01', 'ak-03'],
  },
  {
    id: 'cosmic-rewind-mixtape',
    name: 'Cosmic Rewind Mixtape',
    emoji: '🎵',
    resortId: 'wdw',
    type: 'song',
    itemId: 'ep-01',
    description: 'Collect all six randomized Guardians of the Galaxy: Cosmic Rewind songs.',
    songs: [
      'September — Earth, Wind & Fire',
      'Disco Inferno — The Trammps',
      'Conga — Miami Sound Machine',
      'Everybody Wants to Rule the World — Tears for Fears',
      'I Ran — A Flock of Seagulls',
      'One Way or Another — Blondie',
    ],
    itemIds: ['ep-01'],
  },
  {
    id: 'epcot-world-showcase',
    resortId: 'wdw',
    name: 'Every Country in EPCOT',
    emoji: '🌍',
    description: 'Visit all 11 World Showcase pavilions in one trip — starting in Mexico and heading clockwise around the lagoon.',
    itemIds: ['ep-10', 'ep-36', 'ep-37', 'ep-38', 'ep-39', 'ep-78', 'ep-11', 'ep-40', 'ep-12', 'ep-13', 'ep-14'],
  },

  // ── Disneyland Resort collections ─────────────────────────────────────
  {
    id: 'dlr-nighttime-spectaculars',
    resortId: 'dlr',
    name: 'Disneyland Nighttime Spectaculars',
    emoji: '🌙',
    description: 'The five big evening spectaculars across Disneyland Resort — Fantasmic!, Paint the Night, Disneyland Forever, Fire of the Rising Moons, and World of Color.',
    itemIds: ['dl-13', 'dl-15', 'dl-16', 'dl-88', 'dca-05'],
  },
  {
    id: 'dlr-mountains',
    resortId: 'dlr',
    name: 'Disneyland Mountains',
    emoji: '🏔️',
    description: 'The four Disneyland mountain adventures: Matterhorn, Space Mountain, Big Thunder, and Tiana’s Bayou Adventure.',
    itemIds: ['dl-06', 'dl-08', 'dl-09', 'dl-07'],
  },
  {
    id: 'dlr-thrill-rides',
    resortId: 'dlr',
    name: 'Disneyland Thrill Rides',
    emoji: '⚡',
    description: 'The biggest thrills across Disneyland Park and Disney California Adventure.',
    itemIds: ['dl-01', 'dl-03', 'dl-06', 'dl-08', 'dl-09', 'dl-12', 'dl-43', 'dca-01', 'dca-02', 'dca-04', 'dca-07', 'dca-08'],
  },
  {
    id: 'dlr-coasters',
    resortId: 'dlr',
    name: 'Disneyland Coasters',
    emoji: '🎢',
    description: 'Every coaster-style ride currently tracked across Disneyland Resort.',
    itemIds: ['dl-06', 'dl-08', 'dl-09', 'dl-43', 'dca-04', 'dca-08'],
  },
  {
    id: 'dlr-classic-fantasyland-dark-rides',
    resortId: 'dlr',
    name: 'Disneyland Fantasyland Dark Rides',
    emoji: '🏰',
    description: 'The classic storybook-style Fantasyland dark rides that make Disneyland feel like Disneyland.',
    itemIds: ['dl-02', 'dl-10', 'dl-23', 'dl-24', 'dl-25', 'dl-26'],
  },
  {
    id: 'dlr-disneyland-originals',
    resortId: 'dlr',
    name: 'Disneyland Originals',
    emoji: '⭐',
    description: 'Opening-day Disneyland attractions from 1955 that are still represented in the park today.',
    itemIds: ['dl-35', 'dl-11', 'dl-33', 'dl-27', 'dl-28', 'dl-23', 'dl-10', 'dl-24', 'dl-37', 'dl-36'],
  },
];

// Validates that every collection only references real items currently
// in PARKS. Call this in development to catch typos — silently filters
// out any bad IDs at runtime so a single bad reference doesn't break the
// whole collection.
function getValidatedCollection(collection) {
  const allIds = new Set();
  PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(i => allIds.add(i.id))));
  return {
    ...collection,
    itemIds: collection.itemIds.filter(id => allIds.has(id)),
  };
}
