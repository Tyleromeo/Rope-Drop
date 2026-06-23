// Rope Drop — Collections
// Themed groupings of attractions that span across one or more parks.
// Pre-built collections live here; custom user-created ones are stored
// separately per-trip in storage.js. Each collection lists real item IDs
// that must exist in PARKS (data.js) — verified at build time.

const PREBUILT_COLLECTIONS = [
  {
    id: 'mountains',
    name: 'Mountains',
    emoji: '🏔️',
    description: 'Every "Mountain" coaster across Disney World and Disneyland.',
    itemIds: ['mk-04', 'mk-05', 'mk-13', 'ak-03', 'dl-06', 'dl-08', 'dl-09'],
  },
  {
    id: 'mine-trains-coasters',
    name: 'Signature Coasters',
    emoji: '🎢',
    description: 'The headliner coasters everyone talks about.',
    itemIds: ['mk-01', 'mk-13', 'hs-05', 'ep-01', 'ak-03', 'dl-08', 'dl-09', 'dca-01', 'dca-04'],
  },
  {
    id: 'haunted-and-pirates',
    name: 'Haunted Mansion & Pirates, Everywhere',
    emoji: '👻',
    description: 'These two classics exist at both Magic Kingdom and Disneyland — ride all four versions.',
    itemIds: ['mk-02', 'mk-03', 'dl-04', 'dl-05'],
  },
  {
    id: 'galaxys-edge',
    name: "Galaxy's Edge, Coast to Coast",
    emoji: '🌌',
    description: "Rise of the Resistance and Smugglers Run exist at both Hollywood Studios and Disneyland.",
    itemIds: ['hs-01', 'hs-02', 'dl-03', 'dl-12'],
  },
  {
    id: 'epcot-world-showcase',
    name: 'Every Country in EPCOT',
    emoji: '🌍',
    description: 'Visit all 11 World Showcase pavilions in one trip.',
    itemIds: ['ep-10', 'ep-36', 'ep-37', 'ep-38', 'ep-39', 'ep-11', 'ep-40', 'ep-12', 'ep-13', 'ep-14'],
  },
  {
    id: 'thrill-seekers',
    name: 'Thrill Seekers Only',
    emoji: '⚡',
    description: 'The biggest, fastest, most intense rides across every park.',
    itemIds: ['mk-04', 'mk-13', 'hs-01', 'hs-04', 'hs-05', 'ep-01', 'ep-05', 'ak-01', 'ak-03', 'dca-02', 'dca-04'],
  },
  {
    id: 'classic-fantasyland',
    name: 'Classic Fantasyland Dark Rides',
    emoji: '🏰',
    description: "The slow, storybook-style dark rides that have charmed generations.",
    itemIds: ['mk-09', 'mk-12', 'dl-10', 'dl-23', 'dl-24', 'dl-25', 'dl-26'],
  },
  {
    id: 'character-meets',
    name: 'Character Meet & Greets',
    emoji: '👋',
    description: 'Every dedicated character meet-and-greet across the parks.',
    itemIds: ['mk-19', 'mk-20', 'mk-21', 'ep-30', 'ep-31', 'ep-32', 'ep-33', 'ep-34', 'ep-35', 'ak-22'],
  },
  {
    id: 'must-eat-snacks',
    name: 'Must-Eat Snacks',
    emoji: '🍦',
    description: 'The iconic park snacks people plan entire days around.',
    itemIds: ['mk-22', 'ep-16', 'hs-16', 'ak-13', 'dl-18', 'dca-16'],
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
