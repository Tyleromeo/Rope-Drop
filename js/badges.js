// Park Moments — Achievements / Badges
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

// Most collections earn a single badge at 100% completion (handled by
// getEarnedCollectionBadges below). Collections listed here instead use
// fixed count-based tiers (Bronze/Silver/Gold at set item counts).
// Currently empty — anything not listed uses the standard 100%-only badge.
const TIERED_COLLECTION_CONFIG = {};

// ── Legacy badges (secret) ──────────────────────────────────────────
// Hidden until unlocked. Awarded per attraction for long-term dedication:
// do the SAME ride, show, or attraction 10 / 25 / 50 times across every
// saved trip (check-off + every extra on the ride counter). They never
// appear in the badge list until earned — a genuine surprise unlock.
const LEGACY_BADGE_TIERS = [
  { id: 'legacy1', label: 'Legacy I',   count: 10, emoji: '🥉' },
  { id: 'legacy2', label: 'Legacy II',  count: 25, emoji: '🥈' },
  { id: 'legacy3', label: 'Legacy III', count: 50, emoji: '🥇' },
];

// Every Legacy badge earned across all trips. Legacy badges are lifetime
// by nature (their whole point is long-term dedication), so their IDs are
// prefixed 'lifetime_' — the seen-badges self-heal treats them as
// permanent once celebrated.
function getEarnedLegacyBadges() {
  const earned = [];
  const times = Storage.getLifetimeItemTimes();
  const itemById = {};
  PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(i => {
    itemById[i.id] = { item: i, park };
  })));

  Object.entries(times).forEach(([itemId, count]) => {
    const entry = itemById[itemId];
    if (!entry) return;
    LEGACY_BADGE_TIERS.forEach(tier => {
      if (count >= tier.count) {
        const id = `lifetime_legacy_${itemId}_${tier.id}`;
        recordBadgeDateIfNew(id);
        earned.push({
          id,
          type: 'legacy',
          scope: 'lifetime',
          itemId,
          itemName: entry.item.name,
          parkEmoji: entry.park.emoji,
          tier: tier.id,
          tierLabel: tier.label,
          tierEmoji: tier.emoji,
          count,
          targetCount: tier.count,
          earnedAt: getBadgeDate(id),
        });
      }
    });
  });
  return earned;
}

// Note: park badges use each park's own emoji (the same one shown on
// the main page and park nav), not a separate badge-specific icon set —
// this keeps a badge instantly recognizable as "that park" at a glance.

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
          badgeIcon: park.emoji,
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

// Returns every collection badge currently earned for the active trip.
// Most collections earn one badge at 100% completion. A few (configured
// in TIERED_COLLECTION_CONFIG) instead earn Bronze/Silver/Gold based on
// a fixed count of items checked off, regardless of the collection's
// total size — e.g. Show Lover's Bronze just needs 5 shows watched,
// not 5/27.
function getEarnedCollectionBadges() {
  const earned = [];
  const collections = getAllCollections();
  collections.forEach(col => {
    if (!col.itemIds || col.itemIds.length === 0) return;
    const progress = (typeof getCollectionProgressForCollection === 'function')
      ? getCollectionProgressForCollection(col)
      : Storage.getCollectionProgress(col.itemIds);
    const tiers = TIERED_COLLECTION_CONFIG[col.id];

    if (tiers) {
      tiers.forEach(tier => {
        const target = tier.count === null ? col.itemIds.length : tier.count;
        if (progress.doneCount >= target) {
          const id = `collection_${col.id}_${tier.id}`;
          recordBadgeDateIfNew(id);
          earned.push({
            id,
            type: 'collection-tier',
            collectionId: col.id,
            collectionName: col.name,
            collectionEmoji: col.emoji,
            tier: tier.id,
            tierLabel: tier.label,
            tierEmoji: tier.emoji,
            doneCount: progress.doneCount,
            targetCount: target,
            earnedAt: getBadgeDate(id),
          });
        }
      });
    } else if (progress.pct === 100) {
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

// Returns every park RIDE-completion badge earned across all saved trips.
// These are intentionally separate from trip badges: a family can finish
// a park over years of visits and still earn the lifetime version.
function getEarnedLifetimeParkBadges() {
  const earned = [];
  PARKS.forEach(park => {
    const stats = Storage.getLifetimeParkStatsForCategory(park.id, 'rides');
    if (stats.total === 0) return;
    PARK_BADGE_TIERS.forEach(tier => {
      if (stats.pct >= tier.threshold) {
        const id = `lifetime_park_${park.id}_${tier.id}`;
        recordBadgeDateIfNew(id);
        earned.push({
          id,
          type: 'lifetime-park',
          scope: 'lifetime',
          parkId: park.id,
          parkName: park.shortName,
          parkEmoji: park.emoji,
          badgeIcon: park.emoji,
          tier: tier.id,
          tierLabel: tier.label,
          tierEmoji: tier.emoji,
          pct: stats.pct,
          doneCount: stats.done,
          totalCount: stats.total,
          earnedAt: getBadgeDate(id),
        });
      }
    });
  });
  return earned;
}

function getEarnedLifetimeCollectionBadges() {
  const earned = [];
  const collections = getAllCollections();
  collections.forEach(col => {
    if (!col.itemIds || col.itemIds.length === 0) return;
    const progress = (typeof getLifetimeCollectionProgressForCollection === 'function')
      ? getLifetimeCollectionProgressForCollection(col)
      : Storage.getLifetimeCollectionProgress(col.itemIds);
    const tiers = TIERED_COLLECTION_CONFIG[col.id];

    if (tiers) {
      tiers.forEach(tier => {
        const target = tier.count === null ? col.itemIds.length : tier.count;
        if (progress.doneCount >= target) {
          const id = `lifetime_collection_${col.id}_${tier.id}`;
          recordBadgeDateIfNew(id);
          earned.push({
            id,
            type: 'lifetime-collection-tier',
            scope: 'lifetime',
            collectionId: col.id,
            collectionName: col.name,
            collectionEmoji: col.emoji,
            tier: tier.id,
            tierLabel: tier.label,
            tierEmoji: tier.emoji,
            doneCount: progress.doneCount,
            targetCount: target,
            earnedAt: getBadgeDate(id),
          });
        }
      });
    } else if (progress.pct === 100) {
      const id = `lifetime_collection_${col.id}`;
      recordBadgeDateIfNew(id);
      earned.push({
        id,
        type: 'lifetime-collection',
        scope: 'lifetime',
        collectionId: col.id,
        collectionName: col.name,
        collectionEmoji: col.emoji,
        doneCount: progress.doneCount,
        totalCount: progress.total,
        earnedAt: getBadgeDate(id),
      });
    }
  });
  return earned;
}

function getAllEarnedBadges() {
  return [
    ...getEarnedParkBadges(),
    ...getEarnedCollectionBadges(),
    ...getEarnedLifetimeParkBadges(),
    ...getEarnedLifetimeCollectionBadges(),
    ...getEarnedLegacyBadges(),
  ];
}

// Compares current badges against the set of badge IDs we've already
// shown a celebration for (stored in localStorage, per browser/device —
// intentionally not part of trip data since it's a "have I seen this"
// flag, not trip progress itself). Returns any badges that are newly
// earned since the last check, so the caller can pop a celebration.
const SEEN_BADGES_KEY = 'rd_seen_badges_v2';

function getSeenBadgeIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_BADGES_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

// Trip badges are scoped to the trip that earned them ("tripId|badgeId"),
// so earning the same badge on a different trip celebrates again. Lifetime
// badges are global by nature and keep their plain ID.
function scopedSeenKey(badge) {
  const isLifetime = badge.scope === 'lifetime' || (badge.type || '').startsWith('lifetime');
  return isLifetime ? badge.id : `${Storage.getActiveTripId()}|${badge.id}`;
}

function markBadgesSeen(badges) {
  const seen = getSeenBadgeIds();
  badges.forEach(b => seen.add(typeof b === 'string' ? b : scopedSeenKey(b)));
  localStorage.setItem(SEEN_BADGES_KEY, JSON.stringify([...seen]));
}

function getNewlyEarnedBadges() {
  const current = getAllEarnedBadges();
  const currentKeys = new Set(current.map(b => scopedSeenKey(b)));
  const seen = getSeenBadgeIds();

  // Self-heal the seen list so celebrations can never be permanently
  // suppressed by stale state:
  //  - lifetime badge keys are permanent once seen
  //  - this trip's scoped keys are kept only while the badge is still
  //    earned (a park reset or a data update that un-earns a badge lets
  //    it celebrate again when re-earned)
  //  - other trips' scoped keys are left untouched
  //  - anything else (legacy unscoped trip IDs from the old v1 format)
  //    is dropped, so already-earned badges celebrate once after updating
  const tripPrefix = `${Storage.getActiveTripId()}|`;
  const cleaned = [...seen].filter(key => {
    if (key.startsWith('lifetime_')) return true;
    if (key.startsWith(tripPrefix)) return currentKeys.has(key);
    if (key.includes('|')) return true;
    return false;
  });
  if (cleaned.length !== seen.size) {
    localStorage.setItem(SEEN_BADGES_KEY, JSON.stringify(cleaned));
  }

  const cleanedSet = new Set(cleaned);
  return current.filter(b => !cleanedSet.has(scopedSeenKey(b)));
}

// Formats a badge's earnedAt timestamp for display, e.g. "Jun 29, 2026".
function formatBadgeDate(earnedAt) {
  if (!earnedAt) return '';
  return new Date(earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
