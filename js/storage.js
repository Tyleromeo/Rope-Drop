// Park Moments — Storage
// Currently uses localStorage.
// To swap in Supabase: keep the same method names/signatures and replace
// the localStorage reads/writes inside each with async Supabase calls —
// app.js callers would then need `await`.
//
// DATA MODEL
// All trip-specific data (checks, counts, songs, stars, notes, active park)
// lives inside one big object keyed by tripId:
//   { [tripId]: { checks: {}, counts: {}, songs: {}, stars: {}, notes: {}, activePark: 'mk' } }
// A separate lightweight registry tracks trip metadata (name, dates, created):
//   { [tripId]: { id, name, createdAt } }
// plus a pointer to which trip is currently active.

const STORAGE_KEY_TRIPS_DATA = 'rd_trips_data_v1';
const STORAGE_KEY_TRIPS_META = 'rd_trips_meta_v1';
const STORAGE_KEY_ACTIVE_TRIP = 'rd_active_trip_v1';
const STORAGE_KEY_TRIVIA_PROGRESS = 'rd_trivia_progress_v1';
const STORAGE_KEY_CUSTOM_COLLECTIONS = 'rd_custom_collections_v1';

function uid() {
  return 'trip_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function emptyTripData() {
  return { checks: {}, counts: {}, songs: {}, stars: {}, starOrder: {}, notes: {}, activePark: PARKS[0].id, activeResort: null, timeline: [], showtimes: {}, hoursOverride: {} };
}

const Storage = {
  // ── Trip registry ──────────────────────────────────────────────────────
  getAllTrips() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_TRIPS_META) || '{}');
    } catch { return {}; }
  },
  saveTripsMeta(obj) {
    localStorage.setItem(STORAGE_KEY_TRIPS_META, JSON.stringify(obj));
  },
  getAllTripsData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_TRIPS_DATA) || '{}');
    } catch { return {}; }
  },
  saveAllTripsData(obj) {
    localStorage.setItem(STORAGE_KEY_TRIPS_DATA, JSON.stringify(obj));
  },

  // Returns array of trip meta objects sorted newest first
  listTrips() {
    const meta = this.getAllTrips();
    return Object.values(meta).sort((a, b) => b.createdAt - a.createdAt);
  },

  createTrip(name) {
    const meta = this.getAllTrips();
    const allData = this.getAllTripsData();
    const id = uid();
    meta[id] = { id, name: name || 'New Trip', createdAt: Date.now() };
    allData[id] = emptyTripData();
    this.saveTripsMeta(meta);
    this.saveAllTripsData(allData);
    this.setActiveTrip(id);
    return id;
  },

  renameTrip(tripId, newName) {
    const meta = this.getAllTrips();
    if (meta[tripId]) {
      meta[tripId].name = newName;
      this.saveTripsMeta(meta);
    }
  },

  // Lets a person correct or set a trip's date after the fact — useful
  // for trips logged from memory well after the actual visit, since the
  // By-Year stats are grouped by this date. Accepts a JS Date or anything
  // the Date constructor understands (e.g. an ISO date string).
  setTripDate(tripId, newDate) {
    const meta = this.getAllTrips();
    if (meta[tripId]) {
      const parsed = new Date(newDate);
      if (!isNaN(parsed.getTime())) {
        meta[tripId].createdAt = parsed.getTime();
        this.saveTripsMeta(meta);
        return true;
      }
    }
    return false;
  },

  deleteTrip(tripId) {
    const meta = this.getAllTrips();
    const allData = this.getAllTripsData();
    delete meta[tripId];
    delete allData[tripId];
    this.saveTripsMeta(meta);
    this.saveAllTripsData(allData);
    // If we just deleted the active trip, fall back to the most recent
    // remaining trip, or create a fresh default one if none are left.
    if (this.getActiveTripId() === tripId) {
      const remaining = this.listTrips();
      if (remaining.length > 0) {
        this.setActiveTrip(remaining[0].id);
      } else {
        this.createTrip('My Disney Trip');
      }
    }
  },

  getActiveTripId() {
    return localStorage.getItem(STORAGE_KEY_ACTIVE_TRIP);
  },
  setActiveTrip(tripId) {
    localStorage.setItem(STORAGE_KEY_ACTIVE_TRIP, tripId);
  },

  // Ensures there is always a valid active trip, creating a default one
  // (and seeding star suggestions) the very first time the app is opened.
  ensureActiveTrip() {
    let activeId = this.getActiveTripId();
    const meta = this.getAllTrips();
    if (!activeId || !meta[activeId]) {
      const trips = this.listTrips();
      if (trips.length > 0) {
        activeId = trips[0].id;
        this.setActiveTrip(activeId);
      } else {
        activeId = this.createTrip('My Disney Trip');
        // No default must-dos — the star list starts empty. People build
        // their own must-do list by tapping the star on whatever matters
        // to them.
      }
    }
    return activeId;
  },

  // Previously seeded default must-dos from each item's `must` flag.
  // Kept as a no-op (rather than deleted) so any existing calls to it
  // elsewhere don't break — the star list now always starts empty.
  _seedStarsForTrip(tripId) {
    // Intentionally does nothing.
  },

  // ── Internal: get/save the current trip's data blob ──────────────────
  _normalizeTripData(data) {
    if (!data) data = emptyTripData();
    // Migration safety net: trips created before newer features existed won't
    // have these fields yet — backfill them so nothing breaks.
    if (!data.timeline) data.timeline = [];
    if (!data.showtimes) data.showtimes = {};
    if (!data.hoursOverride) data.hoursOverride = {};
    if (!data.starOrder) data.starOrder = {};
    if (!data.checks) data.checks = {};
    if (!data.counts) data.counts = {};
    if (!data.songs) data.songs = {};
    if (!data.stars) data.stars = {};
    if (!data.notes) data.notes = {};
    return data;
  },
  _getTripData(tripId = this.ensureActiveTrip()) {
    const allData = this.getAllTripsData();
    if (!allData[tripId]) allData[tripId] = emptyTripData();
    return this._normalizeTripData(allData[tripId]);
  },
  _saveTripData(data, tripId = this.ensureActiveTrip()) {
    const allData = this.getAllTripsData();
    allData[tripId] = this._normalizeTripData(data);
    this.saveAllTripsData(allData);
  },



  // Ensures every timeline entry has a stable id for attaching local photo memories.
  // Older Park Moments trips may have entries created before ids existed, so this quietly
  // upgrades the active trip the next time it is viewed.
  ensureTimelineEntryIds(tripId = this.ensureActiveTrip()) {
    const allData = this.getAllTripsData();
    const data = this._normalizeTripData(allData[tripId] || emptyTripData());
    if (!Array.isArray(data.timeline)) data.timeline = [];
    let changed = false;
    data.timeline.forEach(entry => {
      if (!entry.id) {
        entry.id = uid();
        changed = true;
      }
    });
    if (changed || !allData[tripId]) {
      allData[tripId] = data;
      this.saveAllTripsData(allData);
    }
    return data.timeline;
  },

  getTimelineEntry(entryId, tripId = this.ensureActiveTrip()) {
    if (!entryId) return null;
    const timeline = this.ensureTimelineEntryIds(tripId);
    return timeline.find(entry => entry.id === entryId) || null;
  },

  // ── Checks (which items are ticked) ──────────────────────────────────
  getChecked() {
    return this._getTripData().checks;
  },
  setChecked(obj) {
    const data = this._getTripData();
    data.checks = obj;
    this._saveTripData(data);
  },
  toggleItem(id) {
    const data = this._getTripData();
    data.checks[id] = !data.checks[id];
    const newState = data.checks[id];
    if (newState) {
      // Just checked on — log the moment it happened
      data.timeline.push({ id: uid(), itemId: id, ts: Date.now() });
    } else {
      // Unchecked — remove its most recent timeline entry so the
      // timeline stays accurate if someone taps it off by mistake
      const idx = data.timeline.map(e => e.itemId).lastIndexOf(id);
      if (idx !== -1) data.timeline.splice(idx, 1);
    }
    this._saveTripData(data);
    return newState;
  },
  clearPark(parkId) {
    const data = this._getTripData();
    const idsInPark = new Set();
    PARKS.find(p => p.id === parkId)?.sections.forEach(s =>
      s.items.forEach(i => {
        delete data.checks[i.id];
        delete data.counts[i.id];
        delete data.songs[i.id];
        delete data.stars[i.id];
        delete data.showtimes[i.id];
        idsInPark.add(i.id);
      })
    );
    data.timeline = data.timeline.filter(e => !idsInPark.has(e.itemId));
    this._saveTripData(data);
  },

  // ── Notes ───────────────────────────────────────────────────────────
  getNotes() {
    return this._getTripData().notes;
  },
  setNote(parkId, text) {
    const data = this._getTripData();
    data.notes[parkId] = text;
    this._saveTripData(data);
  },

  // ── Last active park (per trip) ────────────────────────────────────
  getActivePark() {
    return this._getTripData().activePark || PARKS[0].id;
  },
  setActivePark(id) {
    const data = this._getTripData();
    data.activePark = id;
    this._saveTripData(data);
  },

  // ── Last active resort (per trip) ──────────────────────────────────
  getActiveResort() {
    return this._getTripData().activeResort || null;
  },
  setActiveResort(id) {
    const data = this._getTripData();
    data.activeResort = id || null;
    this._saveTripData(data);
  },

  // ── Ride counts (how many times you've done a ride) ────────────────
  getCounts() {
    return this._getTripData().counts;
  },
  getCount(id) {
    return this.getCounts()[id] || 0;
  },
  incrementCount(id) {
    const data = this._getTripData();
    data.counts[id] = (data.counts[id] || 0) + 1;
    data.timeline.push({ id: uid(), itemId: id, ts: Date.now(), isExtra: true });
    this._saveTripData(data);
    return data.counts[id];
  },
  decrementCount(id) {
    const data = this._getTripData();
    data.counts[id] = Math.max(0, (data.counts[id] || 0) - 1);
    if (data.counts[id] === 0) delete data.counts[id];
    // Remove the most recent "extra ride" timeline entry for this item
    const idx = data.timeline.map(e => e.itemId + (e.isExtra ? ':extra' : '')).lastIndexOf(id + ':extra');
    if (idx !== -1) data.timeline.splice(idx, 1);
    this._saveTripData(data);
    return data.counts[id] || 0;
  },

  // ── Song / variant log (e.g. Cosmic Rewind songs heard) ─────────────
  getSongs() {
    return this._getTripData().songs;
  },
  getSongLog(id) {
    return this.getSongs()[id] || [];
  },
  addSong(id, song) {
    const data = this._getTripData();
    if (!data.songs[id]) data.songs[id] = [];
    data.songs[id].push(song);
    this._saveTripData(data);
  },
  removeSong(id, index) {
    const data = this._getTripData();
    if (data.songs[id]) {
      data.songs[id].splice(index, 1);
      if (data.songs[id].length === 0) delete data.songs[id];
      this._saveTripData(data);
    }
  },

  // ── Today's hours override (per trip, per park) ─────────────────────
  getHoursOverride(parkId) {
    return this._getTripData().hoursOverride[parkId] || '';
  },
  setHoursOverride(parkId, value) {
    const data = this._getTripData();
    if (value && value.trim()) {
      data.hoursOverride[parkId] = value.trim();
    } else {
      delete data.hoursOverride[parkId];
    }
    this._saveTripData(data);
  },

  // ── Today's showtime override (per trip, per item) ──────────────────
  getShowtimeOverride(id) {
    return this._getTripData().showtimes[id] || '';
  },
  setShowtimeOverride(id, value) {
    const data = this._getTripData();
    if (value && value.trim()) {
      data.showtimes[id] = value.trim();
    } else {
      delete data.showtimes[id];
    }
    this._saveTripData(data);
  },

  // ── Personal stars (your own must-dos, per trip) ────────────────────
  // Stars are stored per park as an ordered array of itemIds, so the
  // person's chosen must-do order persists and can be rearranged later.
  getStars() {
    return this._getTripData().stars;
  },
  isStarred(id) {
    return !!this.getStars()[id];
  },
  toggleStar(id) {
    const data = this._getTripData();
    const item = this._findItemById(id);
    const parkId = item ? this._parkIdForItem(id) : null;
    if (!data.starOrder) data.starOrder = {};
    if (parkId && !data.starOrder[parkId]) data.starOrder[parkId] = [];

    if (data.stars[id]) {
      delete data.stars[id];
      if (parkId) {
        data.starOrder[parkId] = data.starOrder[parkId].filter(x => x !== id);
      }
    } else {
      data.stars[id] = true;
      if (parkId) {
        data.starOrder[parkId] = data.starOrder[parkId]
          .filter(x => x !== id && data.stars[x] && this._parkIdForItem(x) === parkId);
        data.starOrder[parkId].push(id);
      }
    }
    this._saveTripData(data);
    return !!data.stars[id];
  },

  // Returns starred itemIds for a park, in the person's chosen order.
  // Self-heals as it goes: drops duplicates, drops any ID that's no
  // longer actually starred or belongs to a different park, then folds
  // in anything starred but missing from the order (legacy data safety
  // net). The cleaned result is persisted back so this cleanup only
  // has to happen once per actual inconsistency, not every call.
  getStarOrder(parkId) {
    const data = this._getTripData();
    const order = (data.starOrder && data.starOrder[parkId]) || [];
    const cleanOrder = [];
    order.forEach(id => {
      if (data.stars[id] && this._parkIdForItem(id) === parkId && !cleanOrder.includes(id)) {
        cleanOrder.push(id);
      }
    });
    const starredIds = Object.keys(data.stars).filter(id => this._parkIdForItem(id) === parkId);
    const missing = starredIds.filter(id => !cleanOrder.includes(id));
    const cleaned = [...cleanOrder, ...missing];

    if (!data.starOrder) data.starOrder = {};
    if (JSON.stringify(data.starOrder[parkId] || []) !== JSON.stringify(cleaned)) {
      data.starOrder[parkId] = cleaned;
      this._saveTripData(data);
    }

    return cleaned;
  },

  // Reorders the visible subset of starred items for a park. Any starred
  // items not present in orderedIds keep their relative positions.
  setStarOrder(parkId, orderedIds) {
    if (!parkId || !Array.isArray(orderedIds)) return;

    const existingOrder = this.getStarOrder(parkId);
    const incoming = [];
    orderedIds.forEach(id => {
      if (existingOrder.includes(id) && !incoming.includes(id)) incoming.push(id);
    });
    if (incoming.length === 0) return;

    const incomingSet = new Set(incoming);
    const merged = [];
    let incomingIndex = 0;
    existingOrder.forEach(id => {
      if (incomingSet.has(id)) {
        merged.push(incoming[incomingIndex++]);
      } else {
        merged.push(id);
      }
    });

    const data = this._getTripData();
    if (!data.starOrder) data.starOrder = {};
    data.starOrder[parkId] = merged;
    this._saveTripData(data);
  },

  // Moves a starred item up or down one position within its park's
  // must-do order. direction is -1 (up/earlier) or 1 (down/later).
  moveStarredItem(itemId, direction) {
    const parkId = this._parkIdForItem(itemId);
    if (!parkId) return;
    const data = this._getTripData();
    if (!data.starOrder) data.starOrder = {};
    data.starOrder[parkId] = this.getStarOrder(parkId);

    const order = data.starOrder[parkId];
    const idx = order.indexOf(itemId);
    if (idx === -1) return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= order.length) return;

    [order[idx], order[newIdx]] = [order[newIdx], order[idx]];
    this._saveTripData(data);
  },

  // Internal helpers to resolve an item's park from its id
  _findItemById(itemId) {
    for (const park of PARKS) {
      for (const section of park.sections) {
        const item = section.items.find(i => i.id === itemId);
        if (item) return item;
      }
    }
    return null;
  },
  _parkIdForItem(itemId) {
    for (const park of PARKS) {
      for (const section of park.sections) {
        if (section.items.some(i => i.id === itemId)) return park.id;
      }
    }
    return null;
  },

  // ── All-time stats across every trip ────────────────────────────────
  // Aggregates checks, ride counts, and song logs from every trip ever
  // created, plus a year-by-year breakdown based on each trip's createdAt.
  // This is read-only and never modifies any trip's data.
  getAllTimeStats() {
    const allTripsMeta = this.getAllTrips();
    const allTripsData = this.getAllTripsData();

    const allItemsById = {};
    PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(item => {
      allItemsById[item.id] = item;
    })));

    // Group trips by year first, then build identical full stats bundles
    // for "all-time" (every trip) and for each individual year.
    const tripsByYear = {}; // year -> [tripData, ...]
    Object.entries(allTripsData).forEach(([tripId, tripData]) => {
      const meta = allTripsMeta[tripId];
      const year = meta ? new Date(meta.createdAt).getFullYear() : 'Unknown';
      if (!tripsByYear[year]) tripsByYear[year] = [];
      tripsByYear[year].push(tripData);
    });

    // Builds one full stats bundle (grandTotals, mostRidden, favoriteSongs,
    // allItemsRanked) from a list of trip data blobs. Used for both the
    // all-time bundle (every trip) and each year's bundle (just that year's
    // trips), so the shape is always identical.
    function buildStatsBundle(tripDataList) {
      const perItem = {}; // itemId -> { item, totalTimes }
      const perItemSongs = {}; // itemId -> { songText: count }

      tripDataList.forEach(tripData => {
        const checks = tripData.checks || {};
        const counts = tripData.counts || {};
        const songs = tripData.songs || {};

        Object.keys(checks).forEach(itemId => {
          if (!checks[itemId]) return;
          const item = allItemsById[itemId];
          if (!item) return; // item no longer exists in current data
          const times = 1 + (counts[itemId] || 0);

          if (!perItem[itemId]) perItem[itemId] = { item, totalTimes: 0 };
          perItem[itemId].totalTimes += times;
        });

        Object.entries(songs).forEach(([itemId, songList]) => {
          if (!perItemSongs[itemId]) perItemSongs[itemId] = {};
          songList.forEach(song => {
            perItemSongs[itemId][song] = (perItemSongs[itemId][song] || 0) + 1;
          });
        });
      });

      const grandTotals = { rides: 0, show: 0, food: 0, character: 0, total: 0 };
      Object.values(perItem).forEach(({ item, totalTimes }) => {
        const key = (item.badge === 'thrill' || item.badge === 'family') ? 'rides' : item.badge;
        if (grandTotals[key] !== undefined) grandTotals[key] += totalTimes;
        grandTotals.total += totalTimes;
      });

      let mostRidden = null;
      Object.values(perItem).forEach(({ item, totalTimes }) => {
        if (!mostRidden || totalTimes > mostRidden.totalTimes) {
          mostRidden = { item, totalTimes };
        }
      });

      const favoriteSongs = {};
      const songBreakdown = {}; // itemId -> [{ song, count }, ...] sorted most-heard first
      Object.entries(perItemSongs).forEach(([itemId, songCounts]) => {
        const ranked = Object.entries(songCounts)
          .map(([song, count]) => ({ song, count }))
          .sort((a, b) => b.count - a.count);
        if (ranked.length > 0) {
          favoriteSongs[itemId] = ranked[0];
          songBreakdown[itemId] = ranked;
        }
      });

      const allItemsRanked = Object.values(perItem).sort((a, b) => b.totalTimes - a.totalTimes);

      return { grandTotals, mostRidden, favoriteSongs, songBreakdown, allItemsRanked };
    }

    const allTripDataList = Object.values(allTripsData);
    const allTimeBundle = buildStatsBundle(allTripDataList);

    const perYear = {};
    Object.entries(tripsByYear).forEach(([year, tripDataList]) => {
      perYear[year] = buildStatsBundle(tripDataList);
    });

    return {
      ...allTimeBundle,
      perYear,
      totalTrips: Object.keys(allTripsMeta).length,
    };
  },

  // ── Stats helpers ───────────────────────────────────────────────────
  getParkStats(parkId) {
    const park = PARKS.find(p => p.id === parkId);
    const checks = this.getChecked();
    let total = 0, done = 0;
    park?.sections.forEach(s => s.items.forEach(i => {
      total++;
      if (checks[i.id]) done++;
    }));
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  },

  // Same as getParkStats but scoped to just one category tab (rides/show/food)
  getParkStatsForCategory(parkId, category) {
    const park = PARKS.find(p => p.id === parkId);
    const checks = this.getChecked();
    let total = 0, done = 0;
    park?.sections.forEach(s => s.items.forEach(i => {
      const cat = (i.badge === 'thrill' || i.badge === 'family') ? 'rides'
        : (i.badge === 'show' || i.badge === 'experience' || i.badge === 'character') ? 'show'
        : (i.badge === 'food') ? 'food' : 'rides';
      if (cat !== category) return;
      total++;
      if (checks[i.id]) done++;
    }));
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  },

  // Total "activity count" — every checked item counts at least once,
  // plus any extra times logged via the ride counter. Rides (thrill +
  // family combined) get one tally, shows and food stay separate.
  getActivityTally(parkId) {
    const park = PARKS.find(p => p.id === parkId);
    const checks = this.getChecked();
    const counts = this.getCounts();
    const byCategory = { rides: 0, show: 0, experience: 0, food: 0, character: 0 };
    let total = 0;

    park?.sections.forEach(s => s.items.forEach(item => {
      if (!checks[item.id]) return;
      const times = 1 + (counts[item.id] || 0);
      total += times;
      const key = (item.badge === 'thrill' || item.badge === 'family') ? 'rides' : item.badge;
      if (byCategory[key] !== undefined) byCategory[key] += times;
    }));

    return { total, byCategory };
  },

  // How many activities have been logged today (since local midnight) at
  // one park — powers the "today" count next to the park name.
  getTodaysCountForPark(parkId) {
    const park = PARKS.find(p => p.id === parkId);
    if (!park) return 0;
    const timeline = this.ensureTimelineEntryIds();
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const idsInPark = new Set();
    park.sections.forEach(s => s.items.forEach(i => idsInPark.add(i.id)));
    return timeline.filter(e => e.ts >= midnight && idsInPark.has(e.itemId)).length;
  },

  // Tally across an entire resort (sums every park belonging to it) —
  // used on the resort-selector screen so each resort shows a quick total.
  getResortTally(resortId) {
    const parks = PARKS.filter(p => p.resortId === resortId);
    let total = 0;
    parks.forEach(p => { total += this.getActivityTally(p.id).total; });
    return total;
  },

  // Builds everything needed to render a trip recap (image or PDF):
  // overall totals, per-park breakdowns, and a few highlight facts.
  // Operates on the currently active trip.
  // Returns today's timeline entries only (since local midnight) for the
  // active trip, grouped by park, most recent first. Used to power the
  // live "today's log" on the home screen — resets fresh each calendar
  // day so it always reflects "what have I done today," not the whole
  // trip's history.
  getTodaysLog() {
    const meta = this.getAllTrips()[this.getActiveTripId()];
    const tripName = meta ? meta.name : 'My Disney Trip';
    const timeline = this.ensureTimelineEntryIds();

    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todaysEntries = timeline.filter(e => e.ts >= midnight);

    if (todaysEntries.length === 0) {
      return { tripName, hasActivityToday: false, parkGroups: [] };
    }

    const itemToPark = {};
    const itemById = {};
    PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(item => {
      itemToPark[item.id] = park.id;
      itemById[item.id] = item;
    })));

    // Group today's entries by park, preserving each park's own
    // chronological order, but show parks most-recently-active first —
    // if someone hopped from MK to EPCOT today, EPCOT (the one they're
    // probably still at) shows up on top.
    const byPark = {};
    todaysEntries.forEach(e => {
      const parkId = itemToPark[e.itemId];
      if (!parkId) return;
      if (!byPark[parkId]) byPark[parkId] = [];
      byPark[parkId].push(e);
    });

    const parkGroups = Object.entries(byPark).map(([parkId, entries]) => {
      const park = PARKS.find(p => p.id === parkId);
      const sorted = [...entries].sort((a, b) => a.ts - b.ts);
      const lastTs = sorted[sorted.length - 1].ts;
      return {
        park,
        lastTs,
        entries: sorted.map(e => {
          const item = itemById[e.itemId];
          return {
            id: e.id,
            itemId: e.itemId,
            name: item ? item.name : 'Unknown',
            badge: item ? item.badge : 'family',
            timeLabel: new Date(e.ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            isExtra: !!e.isExtra,
          };
        }),
      };
    }).sort((a, b) => b.lastTs - a.lastTs);

    return { tripName, hasActivityToday: true, parkGroups };
  },

  // ── Disney History profile ───────────────────────────────────────────
  // A different lens on the same data than getAllTimeStats — instead of
  // "what's my progress," this answers "what does my Disney history look
  // like." Favorite attraction/snack, favorite park, most-visited land,
  // first/last trip dates, and how many parks you've fully completed.
  getDisneyHistoryProfile() {
    const allTripsMeta = this.getAllTrips();
    const allTripsData = this.getAllTripsData();
    const tripList = Object.values(allTripsMeta);

    const allItemsById = {};
    PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(item => {
      allItemsById[item.id] = item;
    })));

    // Tally everything once, across every trip — by item, by park, and
    // by land — so each "favorite X" stat is derived from the same
    // underlying pass rather than separate loops.
    const perItem = {}; // itemId -> totalTimes
    const perPark = {}; // parkId -> totalTimes
    const perLand = {}; // "Park · Land" -> totalTimes (lands can share
                         // names across parks, e.g. "Discovery Island"
                         // doesn't collide here since it's WDW-only, but
                         // keying by park+land avoids any future clash)
    let totalActivities = 0;

    Object.values(allTripsData).forEach(tripData => {
      const checks = tripData.checks || {};
      const counts = tripData.counts || {};
      Object.keys(checks).forEach(itemId => {
        if (!checks[itemId]) return;
        const item = allItemsById[itemId];
        if (!item) return;
        const times = 1 + (counts[itemId] || 0);
        totalActivities += times;

        perItem[itemId] = (perItem[itemId] || 0) + times;

        const parkId = this._parkIdForItem(itemId);
        if (parkId) perPark[parkId] = (perPark[parkId] || 0) + times;

        if (item.land && parkId) {
          const landKey = `${parkId}::${item.land}`;
          perLand[landKey] = (perLand[landKey] || 0) + times;
        }
      });
    });

    // Favorite attraction overall (any badge)
    let favoriteAttraction = null;
    Object.entries(perItem).forEach(([itemId, times]) => {
      const item = allItemsById[itemId];
      if (!item) return;
      if (!favoriteAttraction || times > favoriteAttraction.times) {
        favoriteAttraction = { item, times };
      }
    });

    // Favorite snack/food specifically
    let favoriteSnack = null;
    Object.entries(perItem).forEach(([itemId, times]) => {
      const item = allItemsById[itemId];
      if (!item || item.badge !== 'food') return;
      if (!favoriteSnack || times > favoriteSnack.times) {
        favoriteSnack = { item, times };
      }
    });

    // Favorite park — the one with the most total activity logged
    let favoritePark = null;
    Object.entries(perPark).forEach(([parkId, times]) => {
      const park = PARKS.find(p => p.id === parkId);
      if (!park) return;
      if (!favoritePark || times > favoritePark.times) {
        favoritePark = { park, times };
      }
    });

    // Most-visited land — across the whole resort, not per-park, since
    // "Galaxy's Edge" at Hollywood Studios and Disneyland are different
    // physical lands and shouldn't be merged together.
    let mostVisitedLand = null;
    Object.entries(perLand).forEach(([landKey, times]) => {
      const [parkId, landName] = landKey.split('::');
      const park = PARKS.find(p => p.id === parkId);
      if (!park) return;
      if (!mostVisitedLand || times > mostVisitedLand.times) {
        mostVisitedLand = { land: landName, park, times };
      }
    });

    // First and last trip dates, based on each trip's createdAt (or its
    // manually-corrected date, via setTripDate)
    let firstTripDate = null;
    let lastTripDate = null;
    tripList.forEach(trip => {
      if (!firstTripDate || trip.createdAt < firstTripDate) firstTripDate = trip.createdAt;
      if (!lastTripDate || trip.createdAt > lastTripDate) lastTripDate = trip.createdAt;
    });

    // Total parks "completed" — defined as 100% of that park's rides,
    // matching the same definition used by the Gold park badge.
    let parksCompleted = 0;
    PARKS.forEach(park => {
      const stats = this.getParkStatsForCategory(park.id, 'rides');
      if (stats.total > 0 && stats.pct === 100) parksCompleted++;
    });

    return {
      totalTrips: tripList.length,
      totalActivities,
      favoriteAttraction,
      favoriteSnack,
      favoritePark,
      mostVisitedLand,
      firstTripDate,
      lastTripDate,
      parksCompleted,
      totalParks: PARKS.length,
    };
  },

  getTripSummary(tripId = this.getActiveTripId()) {
    const meta = this.getAllTrips()[tripId];
    const tripName = meta ? meta.name : 'My Disney Trip';

    const parkSummaries = [];
    let grandTotal = 0;
    const grandByCategory = { rides: 0, show: 0, experience: 0, food: 0, character: 0 };
    let mostRiddenItem = null; // { name, times }
    let totalUniqueChecked = 0;

    const tripData = this._getTripData(tripId);
    const checks = tripData.checks || {};
    const counts = tripData.counts || {};
    const songs = tripData.songs || {};
    const timeline = this.ensureTimelineEntryIds(tripId);

    // Build a quick lookup from itemId -> the park it belongs to, so
    // timeline entries (which only know itemId) can be grouped by park.
    const itemToPark = {};
    PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(item => {
      itemToPark[item.id] = park.id;
    })));

    PARKS.forEach(park => {
      const tally = { total: 0, byCategory: { rides: 0, show: 0, experience: 0, food: 0, character: 0 } };
      park.sections.forEach(section => section.items.forEach(item => {
        if (!checks[item.id]) return;
        const times = 1 + (counts[item.id] || 0);
        tally.total += times;
        if (tally.byCategory[item.badge] !== undefined) tally.byCategory[item.badge] += times;
        else if (item.badge === 'thrill' || item.badge === 'family') tally.byCategory.rides += times;
      }));
      if (tally.total === 0) return; // skip parks with no activity at all

      const checkedItems = [];
      park.sections.forEach(s => s.items.forEach(item => {
        if (!checks[item.id]) return;
        const times = 1 + (counts[item.id] || 0);

        // Tally this item's song log (if any) into a ranked breakdown,
        // most-heard first — e.g. Cosmic Rewind's song picker.
        let songBreakdown = null;
        const songList = songs[item.id];
        if (songList && songList.length > 0) {
          const songCounts = {};
          songList.forEach(s => { songCounts[s] = (songCounts[s] || 0) + 1; });
          songBreakdown = Object.entries(songCounts)
            .map(([song, count]) => ({ song, count }))
            .sort((a, b) => b.count - a.count);
        }

        checkedItems.push({ name: item.name, badge: item.badge, times, songBreakdown });
        totalUniqueChecked++;
        if (!mostRiddenItem || times > mostRiddenItem.times) {
          mostRiddenItem = { name: item.name, times };
        }
      }));

      grandTotal += tally.total;
      Object.keys(grandByCategory).forEach(k => { grandByCategory[k] += tally.byCategory[k]; });

      // This park's timeline, in chronological order, with names resolved
      // and clock times formatted for display. Each entry also carries a
      // dateLabel and an isNewDay flag (true only on the first entry of a
      // given calendar day) so renderers can show a date header just once
      // per day instead of repeating it on every line — this matters for
      // multi-day trips or park-hopping where a single park's timeline can
      // span more than one date.
      let lastDateKey = null;
      const parkTimeline = timeline
        .filter(e => itemToPark[e.itemId] === park.id)
        .sort((a, b) => a.ts - b.ts)
        .map(e => {
          const item = park.sections.flatMap(s => s.items).find(i => i.id === e.itemId);
          const d = new Date(e.ts);
          const dateKey = d.toDateString();
          const isNewDay = dateKey !== lastDateKey;
          lastDateKey = dateKey;
          return {
            id: e.id,
            itemId: e.itemId,
            name: item ? item.name : 'Unknown',
            badge: item ? item.badge : 'family',
            time: e.ts,
            timeLabel: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            dateLabel: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            isNewDay,
            isExtra: !!e.isExtra,
          };
        });

      parkSummaries.push({
        park,
        tally,
        checkedItems,
        timeline: parkTimeline,
      });
    });

    return {
      tripName,
      grandTotal,
      grandByCategory,
      totalUniqueChecked,
      mostRiddenItem,
      parkSummaries,
    };
  },

  // ── Export / Import ─────────────────────────────────────────────────
  // Exports either a single trip or every trip as a self-contained JSON
  // object. This is the file the person downloads, can back up, and can
  // load back in later — on this device or any other.
  exportTrip(tripId) {
    const meta = this.getAllTrips()[tripId];
    const allData = this.getAllTripsData();
    if (!meta || !allData[tripId]) return null;
    return {
      ropeDropExport: true,
      version: 1,
      exportedAt: new Date().toISOString(),
      trips: { [tripId]: meta },
      tripsData: { [tripId]: allData[tripId] },
    };
  },

  exportAllTrips() {
    return {
      ropeDropExport: true,
      version: 1,
      exportedAt: new Date().toISOString(),
      trips: this.getAllTrips(),
      tripsData: this.getAllTripsData(),
    };
  },

  // Imports trips from a previously-exported object. Trips are added
  // alongside whatever already exists (never overwrites existing trips) —
  // if a trip with the same id is already present, the incoming one is
  // given a fresh id and clearly relabeled so nothing is silently lost.
  // Returns { success, importedCount, error }.
  importTrips(payload) {
    try {
      if (!payload || !payload.ropeDropExport || !payload.trips || !payload.tripsData) {
        return { success: false, importedCount: 0, error: 'This file doesn\'t look like a Park Moments export.' };
      }
      const existingMeta = this.getAllTrips();
      const existingData = this.getAllTripsData();
      let importedCount = 0;
      let lastImportedId = null;

      Object.entries(payload.trips).forEach(([tripId, tripMeta]) => {
        const tripData = payload.tripsData[tripId];
        if (!tripData) return;

        let finalId = tripId;
        let finalMeta = { ...tripMeta };
        if (existingMeta[tripId]) {
          // Collision — import as a new trip so nothing already on this
          // device gets clobbered.
          finalId = uid();
          finalMeta = { ...tripMeta, id: finalId, name: `${tripMeta.name} (imported)` };
        }

        existingMeta[finalId] = finalMeta;
        existingData[finalId] = tripData;
        importedCount++;
        lastImportedId = finalId;
      });

      this.saveTripsMeta(existingMeta);
      this.saveAllTripsData(existingData);

      if (importedCount > 0 && lastImportedId) {
        this.setActiveTrip(lastImportedId);
      }

      return { success: true, importedCount, error: null };
    } catch (e) {
      return { success: false, importedCount: 0, error: 'Could not read that file.' };
    }
  },

  // ── Trivia level progress ───────────────────────────────────────────
  // Tracks which levels are unlocked per category. Level 1 is always
  // unlocked. A perfect score on a level unlocks the next one. This is
  // global (not per-trip) since trivia is a standalone game, not tied
  // to any specific park visit.
  getTriviaProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_TRIVIA_PROGRESS) || '{}');
    } catch { return {}; }
  },
  isLevelUnlocked(categoryKey, level) {
    if (level === 1) return true;
    const progress = this.getTriviaProgress();
    const unlocked = progress[categoryKey] || 1;
    return level <= unlocked;
  },
  // Called after a round ends. If it was a perfect score, unlocks the
  // next level for that category (capped at the highest level, 4).
  recordTriviaResult(categoryKey, level, score, total) {
    if (score !== total || total === 0) return false; // no unlock on anything less than perfect
    const progress = this.getTriviaProgress();
    const current = progress[categoryKey] || 1;
    const nextLevel = Math.min(level + 1, 4);
    if (nextLevel > current) {
      progress[categoryKey] = nextLevel;
      localStorage.setItem(STORAGE_KEY_TRIVIA_PROGRESS, JSON.stringify(progress));
      return nextLevel > current; // true if a new level was actually unlocked
    }
    return false;
  },
  getHighestUnlockedLevel(categoryKey) {
    const progress = this.getTriviaProgress();
    return progress[categoryKey] || 1;
  },

  // ── Custom collections ───────────────────────────────────────────────
  // User-created collections (e.g. "My Top 5 Coasters"), global across
  // all trips since a personal collection isn't tied to any one visit.
  // Stored as { [collectionId]: { id, name, emoji, itemIds: [] } }.
  getCustomCollections() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_COLLECTIONS) || '{}');
    } catch { return {}; }
  },
  saveCustomCollections(obj) {
    localStorage.setItem(STORAGE_KEY_CUSTOM_COLLECTIONS, JSON.stringify(obj));
  },
  listCustomCollections() {
    return Object.values(this.getCustomCollections());
  },
  createCustomCollection(name, emoji) {
    const collections = this.getCustomCollections();
    const id = 'custom_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    collections[id] = { id, name: name || 'My Collection', emoji: emoji || '⭐', itemIds: [] };
    this.saveCustomCollections(collections);
    return id;
  },
  deleteCustomCollection(id) {
    const collections = this.getCustomCollections();
    delete collections[id];
    this.saveCustomCollections(collections);
  },
  renameCustomCollection(id, newName) {
    const collections = this.getCustomCollections();
    if (collections[id]) {
      collections[id].name = newName;
      this.saveCustomCollections(collections);
    }
  },
  // Adds or removes a single item from a custom collection.
  toggleItemInCustomCollection(collectionId, itemId) {
    const collections = this.getCustomCollections();
    const col = collections[collectionId];
    if (!col) return;
    const idx = col.itemIds.indexOf(itemId);
    if (idx === -1) col.itemIds.push(itemId);
    else col.itemIds.splice(idx, 1);
    this.saveCustomCollections(collections);
  },

  // ── Collection progress (works for both pre-built and custom) ───────
  // A collection is "done" per-item based on whether that item is
  // currently checked off in the active trip — collections are just a
  // lens over the same checklist data, not a separate tracking system.
  getCollectionProgress(itemIds) {
    const checks = this.getChecked();
    const allItemsById = {};
    PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(item => {
      allItemsById[item.id] = item;
    })));
    const items = itemIds.map(id => allItemsById[id]).filter(Boolean);
    const done = items.filter(item => !!checks[item.id]);
    const remaining = items.filter(item => !checks[item.id]);
    return {
      total: items.length,
      doneCount: done.length,
      pct: items.length > 0 ? Math.round((done.length / items.length) * 100) : 0,
      doneItems: done,
      remainingItems: remaining,
    };
  },

  // ── Lifetime progress helpers ──────────────────────────────────────
  // These read every saved trip and build one long-term completion set.
  // Trip progress still answers "what did I do on this trip?" Lifetime
  // progress answers "what have I ever completed across all trips?"
  getLifetimeCompletedItemIds() {
    const completed = new Set();
    const allTripsData = this.getAllTripsData();
    Object.values(allTripsData).forEach(tripData => {
      const checks = tripData.checks || {};
      Object.entries(checks).forEach(([itemId, isChecked]) => {
        if (isChecked) completed.add(itemId);
      });
      // Timeline entries are included as a migration safety net for any
      // older data that logged an activity but may not have checks saved
      // in the exact shape current Park Moments expects.
      (tripData.timeline || []).forEach(entry => {
        if (entry && entry.itemId) completed.add(entry.itemId);
      });
    });
    return completed;
  },

  getLifetimeSongLog(itemId) {
    const allTripsData = this.getAllTripsData();
    const songs = [];
    Object.values(allTripsData).forEach(tripData => {
      const list = tripData.songs && tripData.songs[itemId];
      if (Array.isArray(list)) songs.push(...list);
    });
    return songs;
  },

  getLifetimeParkStatsForCategory(parkId, category) {
    const park = PARKS.find(p => p.id === parkId);
    const completed = this.getLifetimeCompletedItemIds();
    let total = 0, done = 0;
    park?.sections.forEach(s => s.items.forEach(i => {
      const cat = (i.badge === 'thrill' || i.badge === 'family') ? 'rides'
        : (i.badge === 'show' || i.badge === 'experience' || i.badge === 'character') ? 'show'
        : (i.badge === 'food') ? 'food' : 'rides';
      if (cat !== category) return;
      total++;
      if (completed.has(i.id)) done++;
    }));
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  },

  getLifetimeCollectionProgress(itemIds) {
    const completed = this.getLifetimeCompletedItemIds();
    const allItemsById = {};
    PARKS.forEach(park => park.sections.forEach(s => s.items.forEach(item => {
      allItemsById[item.id] = item;
    })));
    const items = (itemIds || []).map(id => allItemsById[id]).filter(Boolean);
    const done = items.filter(item => completed.has(item.id));
    const remaining = items.filter(item => !completed.has(item.id));
    return {
      total: items.length,
      doneCount: done.length,
      pct: items.length > 0 ? Math.round((done.length / items.length) * 100) : 0,
      doneItems: done,
      remainingItems: remaining,
    };
  },
};
