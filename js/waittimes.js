// Rope Drop — Live Wait Times
// Pulls real-time standby wait times from the free, public ThemeParks.wiki
// API (https://api.themeparks.wiki). No API key required. We're required
// to credit them — see the attribution line wherever this data is shown.
//
// Strategy: rather than hardcoding entity IDs (which can silently drift if
// Disney or ThemeParks.wiki ever restructure), we discover each park's
// entity ID once at runtime via /v1/destinations, matched by park name,
// then cache it. This makes the integration resilient — if a lookup ever
// fails, we fail quietly and just don't show wait times rather than
// breaking the rest of the app.

const THEMEPARKS_API_BASE = 'https://api.themeparks.wiki/v1';

// Maps our internal park IDs to the official park name strings used by
// ThemeParks.wiki, so we can find the right entity in the /destinations
// response without hardcoding fragile UUIDs.
const THEMEPARKS_NAME_MAP = {
  mk: 'Magic Kingdom',
  ep: 'Epcot',
  hs: 'Hollywood Studios',
  ak: 'Animal Kingdom',
  dl: 'Disneyland Park',
  dca: 'Disney California Adventure',
};

const waitTimesCache = {}; // parkId -> { data: {name -> {waitTime, status}}, fetchedAt }
const WAIT_TIMES_CACHE_MS = 5 * 60 * 1000; // ThemeParks.wiki itself only updates every ~5 min

let destinationsCache = null; // cached /destinations response
let destinationsFetchPromise = null;

async function getThemeParksDestinations() {
  if (destinationsCache) return destinationsCache;
  if (destinationsFetchPromise) return destinationsFetchPromise;

  destinationsFetchPromise = fetch(`${THEMEPARKS_API_BASE}/destinations`)
    .then(res => {
      if (!res.ok) throw new Error('destinations fetch failed');
      return res.json();
    })
    .then(json => {
      destinationsCache = json;
      return json;
    })
    .catch(() => {
      destinationsFetchPromise = null;
      return null;
    });

  return destinationsFetchPromise;
}

// Finds the entity ID for a given internal park ID by matching park names
// inside the destinations directory. Returns null if not found.
async function findParkEntityId(parkId) {
  const targetName = THEMEPARKS_NAME_MAP[parkId];
  if (!targetName) return null;

  const destinations = await getThemeParksDestinations();
  if (!destinations || !destinations.destinations) return null;

  const targetLower = targetName.toLowerCase();
  for (const dest of destinations.destinations) {
    if (!dest.parks) continue;
    for (const park of dest.parks) {
      const nameLower = (park.name || '').toLowerCase();
      if (nameLower.includes(targetLower) || targetLower.includes(nameLower)) {
        return park.id;
      }
    }
  }
  return null;
}

// Fetches and caches live wait times for a park, returning a lookup map
// keyed by lowercased, trimmed attraction name -> { waitTime, status }.
// Matching by name (rather than ID) is what lets us connect ThemeParks.wiki
// data to Rope Drop's own ride list without maintaining a manual ID map
// for every single attraction.
async function getLiveWaitTimes(parkId) {
  const cached = waitTimesCache[parkId];
  if (cached && Date.now() - cached.fetchedAt < WAIT_TIMES_CACHE_MS) {
    return cached.data;
  }

  try {
    const entityId = await findParkEntityId(parkId);
    if (!entityId) return null;

    const res = await fetch(`${THEMEPARKS_API_BASE}/entity/${entityId}/live`);
    if (!res.ok) throw new Error('live fetch failed');
    const json = await res.json();

    const lookup = {};
    (json.liveData || []).forEach(entry => {
      if (entry.entityType !== 'ATTRACTION') return;
      const key = normalizeRideName(entry.name);
      const standby = entry.queue && entry.queue.STANDBY ? entry.queue.STANDBY.waitTime : null;
      lookup[key] = {
        waitTime: typeof standby === 'number' ? standby : null,
        status: entry.status || null, // OPERATING, DOWN, CLOSED, REFURBISHMENT
      };
    });

    waitTimesCache[parkId] = { data: lookup, fetchedAt: Date.now() };
    return lookup;
  } catch (e) {
    return null;
  }
}

// Normalizes a ride name for matching purposes — lowercase, strip curly
// quotes and punctuation, collapse whitespace. Disney's own naming is
// inconsistent between systems (e.g. "it's a small world" vs "It's a
// Small World"), so a forgiving match matters more than an exact one.
function normalizeRideName(name) {
  return (name || '')
    .toLowerCase()
    .replace(/['’‘\u2019]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Looks up the live wait time for a single Rope Drop item by matching its
// stored name against the live data lookup map. Returns null if no match
// or if the park's data wasn't available at all.
function matchWaitTime(liveLookup, itemName) {
  if (!liveLookup) return null;
  const key = normalizeRideName(itemName);
  if (liveLookup[key]) return liveLookup[key];

  // Fallback: try a substring match in both directions, since some Rope
  // Drop names include extra context (e.g. "TRON Lightcycle / Run" vs
  // ThemeParks.wiki's "TRON Lightcycle Run") that an exact match would miss.
  const keys = Object.keys(liveLookup);
  const found = keys.find(k => k.includes(key) || key.includes(k));
  return found ? liveLookup[found] : null;
}
