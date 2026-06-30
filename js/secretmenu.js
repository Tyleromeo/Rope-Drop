// Park Moments — Secret Menu: Coast to Coast
// A hidden bonus feature that unlocks once someone has ridden BOTH
// versions of the same iconic ride at BOTH resorts — e.g. Space Mountain
// at Magic Kingdom AND Space Mountain at Disneyland. Once unlocked for a
// given pair, they can cast a one-time vote for which version they liked
// better, and see a simple comparison tally.
//
// Scope is intentionally narrow: only the most exact, iconic ride
// matches are included here (same ride concept, both coasts). Loose
// thematic matches (e.g. Soarin' Around the World vs Soarin' Across
// America, or the two different Guardians of the Galaxy rides) are left
// out on purpose, since those aren't really "the same ride."

const COAST_TO_COAST_PAIRS = [
  {
    id: 'space-mountain',
    name: 'Space Mountain',
    emoji: '🚀',
    wdw: { itemId: 'mk-04', label: 'Magic Kingdom' },
    dlr: { itemId: 'dl-08', label: 'Disneyland' },
  },
  {
    id: 'big-thunder-mountain',
    name: 'Big Thunder Mountain Railroad',
    emoji: '⛏️',
    wdw: { itemId: 'mk-05', label: 'Magic Kingdom' },
    dlr: { itemId: 'dl-09', label: 'Disneyland' },
  },
  {
    id: 'haunted-mansion',
    name: 'Haunted Mansion',
    emoji: '👻',
    wdw: { itemId: 'mk-02', label: 'Magic Kingdom' },
    dlr: { itemId: 'dl-04', label: 'Disneyland' },
  },
  {
    id: 'pirates-of-the-caribbean',
    name: 'Pirates of the Caribbean',
    emoji: '🏴‍☠️',
    wdw: { itemId: 'mk-03', label: 'Magic Kingdom' },
    dlr: { itemId: 'dl-05', label: 'Disneyland' },
  },
  {
    id: 'peter-pans-flight',
    name: "Peter Pan's Flight",
    emoji: '🧚',
    wdw: { itemId: 'mk-46', label: 'Magic Kingdom' },
    dlr: { itemId: 'dl-10', label: 'Disneyland' },
  },
  {
    id: 'its-a-small-world',
    name: "It's a Small World",
    emoji: '🌎',
    wdw: { itemId: 'mk-06', label: 'Magic Kingdom' },
    dlr: { itemId: 'dl-02', label: 'Disneyland (the original)' },
  },
  {
    id: 'rise-of-the-resistance',
    name: 'Star Wars: Rise of the Resistance',
    emoji: '✨',
    wdw: { itemId: 'hs-01', label: 'Hollywood Studios' },
    dlr: { itemId: 'dl-03', label: 'Disneyland' },
  },
  {
    id: 'smugglers-run',
    name: 'Millennium Falcon: Smugglers Run',
    emoji: '🦅',
    wdw: { itemId: 'hs-02', label: 'Hollywood Studios' },
    dlr: { itemId: 'dl-12', label: 'Disneyland' },
  },
];

// A small fixed seed per ride pair so the comparison tally doesn't look
// empty/broken the very first time anyone opens it. This is clearly
// labeled in the UI as Park Moments users specifically — never implied to
// be a real, live, global Disney fan poll, since there's no shared
// backend behind it; each person's vote only updates their own local
// tally on their own device.
const COAST_TO_COAST_SEED_VOTES = {
  'space-mountain': { wdw: 58, dlr: 42 },
  'big-thunder-mountain': { wdw: 45, dlr: 55 },
  'haunted-mansion': { wdw: 40, dlr: 60 },
  'pirates-of-the-caribbean': { wdw: 35, dlr: 65 },
  'peter-pans-flight': { wdw: 38, dlr: 62 },
  'its-a-small-world': { wdw: 30, dlr: 70 },
  'rise-of-the-resistance': { wdw: 53, dlr: 47 },
  'smugglers-run': { wdw: 50, dlr: 50 },
};

const COAST_TO_COAST_VOTES_KEY = 'rd_coast_to_coast_votes_v1';

function getCoastToCoastVotes() {
  try {
    return JSON.parse(localStorage.getItem(COAST_TO_COAST_VOTES_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveCoastToCoastVotes(votes) {
  localStorage.setItem(COAST_TO_COAST_VOTES_KEY, JSON.stringify(votes));
}

// Has this device's person already voted on this pair? Votes are
// one-time and permanent (no changing your mind) to keep the tally
// meaningful rather than letting someone flip-flop endlessly.
function getMyCoastToCoastVote(pairId) {
  const votes = getCoastToCoastVotes();
  return votes[pairId] || null; // 'wdw' | 'dlr' | null
}

function castCoastToCoastVote(pairId, choice) {
  const votes = getCoastToCoastVotes();
  if (votes[pairId]) return false; // already voted, one-time only
  votes[pairId] = choice;
  saveCoastToCoastVotes(votes);
  return true;
}

// Builds the displayed tally for a pair: the seed numbers, plus this
// device's own vote layered on top if they've cast one. This is openly
// a small, local approximation — not a real synced poll — and the UI
// copy should make that clear (e.g. "Park Moments users" rather than
// "Disney fans everywhere").
function getCoastToCoastTally(pairId) {
  const seed = COAST_TO_COAST_SEED_VOTES[pairId] || { wdw: 50, dlr: 50 };
  const myVote = getMyCoastToCoastVote(pairId);
  const wdw = seed.wdw + (myVote === 'wdw' ? 1 : 0);
  const dlr = seed.dlr + (myVote === 'dlr' ? 1 : 0);
  const total = wdw + dlr;
  return {
    wdwPct: total > 0 ? Math.round((wdw / total) * 100) : 50,
    dlrPct: total > 0 ? Math.round((dlr / total) * 100) : 50,
    myVote,
  };
}

// Checks whether BOTH versions of a given pair have been ridden, across
// EVERY saved trip (lifetime, not just the active trip) — matching the
// spirit of "you've genuinely experienced both," however many visits
// that took.
function isCoastToCoastPairUnlocked(pair) {
  const allTripsData = Storage.getAllTripsData();
  let wdwDone = false;
  let dlrDone = false;
  Object.values(allTripsData).forEach(tripData => {
    const checks = tripData.checks || {};
    if (checks[pair.wdw.itemId]) wdwDone = true;
    if (checks[pair.dlr.itemId]) dlrDone = true;
  });
  return wdwDone && dlrDone;
}

function getUnlockedCoastToCoastPairs() {
  return COAST_TO_COAST_PAIRS.filter(isCoastToCoastPairUnlocked);
}

// The secret menu itself "unlocks" — becomes visible as an entry point
// at all — only once at least one pair has been completed. Before that,
// there's no visible hint it exists.
function isSecretMenuUnlocked() {
  return getUnlockedCoastToCoastPairs().length > 0;
}

// Tracks which pair-unlock celebrations have already been shown, so
// reopening the app or re-rendering never re-celebrates something the
// person already saw.
const COAST_TO_COAST_SEEN_KEY = 'rd_c2c_seen_unlocks_v1';

function getSeenSecretMenuUnlockIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(COAST_TO_COAST_SEEN_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function hasSeenSecretMenuUnlock(pairId) {
  return getSeenSecretMenuUnlockIds().has(pairId);
}

function markSecretMenuUnlocksSeen(pairIds) {
  const seen = getSeenSecretMenuUnlockIds();
  pairIds.forEach(id => seen.add(id));
  localStorage.setItem(COAST_TO_COAST_SEEN_KEY, JSON.stringify([...seen]));
}
