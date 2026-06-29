// Rope Drop — Achievements / Badges
// Two badge families:
//   1. Park RIDE completion tiers (Bronze 50%, Silver 75%, Gold 100% of
//      a park's rides only — food and shows don't count toward this)
//   2. Collection completion (100% of any pre-built or custom collection)
// Badges are derived from existing checklist data, but the *date earned*
// is persisted separately (see BADGE_DATES_KEY below) since that's a
// genuine point-in-time fact that can't be recomputed later.

const PARK_BADGE_TIERS = [
  { id: 'bronze', label: 'Bronze', threshold: 50, emoji: '🥉' },
  { id: 'silver', label: 'Silver', threshold: 75, emoji: '🥈' },
  { id: 'gold', label: 'Gold', threshold: 100, emoji: '🏆' },
];

// A distinctive badge icon per park — separate from the park's everyday
// emoji used elsewhere in the app, so a badge reads as its own specific
// achievement rather than just a repeated park icon with a ribbon color.
const PARK_BADGE_ICONS = {
  mk: '🏰',
  ep: '🌐',
  hs: '🎬',
  ak: '🌴',
  dl: '✨',
  dca: '🎡',
};

const BADGE_DATES_KEY = 'rd_badge_dates_v1';

function getBadgeDates() {
  try {
    return JSON.parse(localStorage.getItem(BADGE_DATES_KEY) || '{}');
  } catch {
    return {};
  }
}

// Records the first-earned timestamp for a badge ID, if not already
// recorded. Safe to call repeatedly — only ever writes a date once per
// badge, so re-checking an already-earned badge never overwrites the
// original earned date.
function recordBadgeDateIfNew(badgeId) {
  const dates = getBadgeDates();
  if (!dates[badgeId]) {
    dates[badgeId] = Date.now();
    localStorage.setItem(BADGE_DATES_KEY, JSON.stringify(dates));
  }
}

function getBadgeDate(badgeId) {
  const dates = getBadgeDates();
  return dates[badgeId] || null;
}

// Returns every park RIDE-completion badge currently earned for the
// active trip. Only the Rides tab (thrill + family attractions) counts
// toward these tiers — food and shows are intentionally excluded.
function getEarnedParkBadges() {
  const earned = [];
  PARKS.forEach(park => {
    const stats = Storage.getParkStatsForCategory(park.id, 'rides');
    if (stats.total === 0) return;
    PARK_BADGE_TIERS.forEach(tier => {
      if (stats.pct >= tier.threshold) {
        const id = `park_${park.id}_${tier.id}`;
        recordBadgeDateIfNew(id);
        earned.push({
          id,
          type: 'park',
          parkId: park.id,
          parkName: park.shortName,
          parkEmoji: park.emoji,
          badgeIcon: PARK_BADGE_ICONS[park.id] || park.emoji,
          tier: tier.id,
          tierLabel: tier.label,
          tierEmoji: tier.emoji,
          pct: stats.pct,
          earnedAt: getBadgeDate(id),
        });
      }
    });
  });
  return earned;
}

// Returns every collection badge currently earned for the active trip —
// any pre-built or custom collection sitting at 100% completion.
function getEarnedCollectionBadges() {
  const earned = [];
  const collections = getAllCollections();
  collections.forEach(col => {
    if (!col.itemIds || col.itemIds.length === 0) return;
    const progress = Storage.getCollectionProgress(col.itemIds);
    if (progress.pct === 100) {
      const id = `collection_${col.id}`;
      recordBadgeDateIfNew(id);
      earned.push({
        id,
        type: 'collection',
        collectionId: col.id,
        collectionName: col.name,
        collectionEmoji: col.emoji,
        earnedAt: getBadgeDate(id),
      });
    }
  });
  return earned;
}

function getAllEarnedBadges() {
  return [...getEarnedParkBadges(), ...getEarnedCollectionBadges()];
}

// Compares current badges against the set of badge IDs we've already
// shown a celebration for (stored in localStorage, per browser/device —
// intentionally not part of trip data since it's a "have I seen this"
// flag, not trip progress itself). Returns any badges that are newly
// earned since the last check, so the caller can pop a celebration.
const SEEN_BADGES_KEY = 'rd_seen_badges_v1';

function getSeenBadgeIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_BADGES_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function markBadgesSeen(badgeIds) {
  const seen = getSeenBadgeIds();
  badgeIds.forEach(id => seen.add(id));
  localStorage.setItem(SEEN_BADGES_KEY, JSON.stringify([...seen]));
}

function getNewlyEarnedBadges() {
  const seen = getSeenBadgeIds();
  const current = getAllEarnedBadges();
  return current.filter(b => !seen.has(b.id));
}

// Formats a badge's earnedAt timestamp for display, e.g. "Jun 29, 2026".
function formatBadgeDate(earnedAt) {
  if (!earnedAt) return '';
  return new Date(earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
