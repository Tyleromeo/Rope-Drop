// Rope Drop — Storage
// Currently uses localStorage.
// To swap in Supabase: replace getChecked/setChecked/getNotes/setNotes
// with async Supabase reads/writes and update callers in app.js to await them.

const STORAGE_KEY_CHECKS = 'rd_checks_v1';
const STORAGE_KEY_NOTES  = 'rd_notes_v1';
const STORAGE_KEY_PARK   = 'rd_active_park_v1';
const STORAGE_KEY_COUNTS = 'rd_counts_v1';
const STORAGE_KEY_SONGS  = 'rd_songs_v1';
const STORAGE_KEY_STARS  = 'rd_stars_v1';

const Storage = {
  // --- Checks (which items are ticked) ---
  getChecked() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKS) || '{}');
    } catch { return {}; }
  },
  setChecked(obj) {
    localStorage.setItem(STORAGE_KEY_CHECKS, JSON.stringify(obj));
  },
  toggleItem(id) {
    const checks = this.getChecked();
    checks[id] = !checks[id];
    this.setChecked(checks);
    return checks[id]; // returns new state
  },
  clearPark(parkId) {
    const checks = this.getChecked();
    const counts = this.getCounts();
    const songs = this.getSongs();
    const stars = this.getStars();
    PARKS.find(p => p.id === parkId)?.sections.forEach(s =>
      s.items.forEach(i => {
        delete checks[i.id];
        delete counts[i.id];
        delete songs[i.id];
        delete stars[i.id];
      })
    );
    this.setChecked(checks);
    this.setCounts(counts);
    this.setStars(stars);
    localStorage.setItem(STORAGE_KEY_SONGS, JSON.stringify(songs));
  },

  // --- Notes ---
  getNotes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_NOTES) || '{}');
    } catch { return {}; }
  },
  setNote(parkId, text) {
    const notes = this.getNotes();
    notes[parkId] = text;
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  },

  // --- Last active park ---
  getActivePark() {
    return localStorage.getItem(STORAGE_KEY_PARK) || PARKS[0].id;
  },
  setActivePark(id) {
    localStorage.setItem(STORAGE_KEY_PARK, id);
  },

  // --- Ride counts (how many times you've done a ride) ---
  getCounts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_COUNTS) || '{}');
    } catch { return {}; }
  },
  setCounts(obj) {
    localStorage.setItem(STORAGE_KEY_COUNTS, JSON.stringify(obj));
  },
  getCount(id) {
    return this.getCounts()[id] || 0;
  },
  incrementCount(id) {
    const counts = this.getCounts();
    counts[id] = (counts[id] || 0) + 1;
    this.setCounts(counts);
    return counts[id];
  },
  decrementCount(id) {
    const counts = this.getCounts();
    counts[id] = Math.max(0, (counts[id] || 0) - 1);
    if (counts[id] === 0) delete counts[id];
    this.setCounts(counts);
    return counts[id] || 0;
  },

  // --- Song / variant log (e.g. Cosmic Rewind songs heard) ---
  getSongs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_SONGS) || '{}');
    } catch { return {}; }
  },
  // Returns array of song strings logged for this item
  getSongLog(id) {
    return this.getSongs()[id] || [];
  },
  addSong(id, song) {
    const songs = this.getSongs();
    if (!songs[id]) songs[id] = [];
    songs[id].push(song);
    localStorage.setItem(STORAGE_KEY_SONGS, JSON.stringify(songs));
  },
  removeSong(id, index) {
    const songs = this.getSongs();
    if (songs[id]) {
      songs[id].splice(index, 1);
      if (songs[id].length === 0) delete songs[id];
      localStorage.setItem(STORAGE_KEY_SONGS, JSON.stringify(songs));
    }
  },

  // --- Personal stars (your own must-dos) ---
  // On first-ever load, stars are seeded from each item's `must` flag as a
  // suggested starting point. After that, the person's own taps are the
  // only source of truth — edits persist and are never overwritten again.
  getStars() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STARS);
      if (raw === null) {
        // First load ever — seed from suggested must-dos, then save so
        // this only happens once.
        const seeded = {};
        PARKS.forEach(park => park.sections.forEach(section =>
          section.items.forEach(item => {
            if (item.must) seeded[item.id] = true;
          })
        ));
        localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(seeded));
        return seeded;
      }
      return JSON.parse(raw);
    } catch { return {}; }
  },
  setStars(obj) {
    localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(obj));
  },
  isStarred(id) {
    return !!this.getStars()[id];
  },
  toggleStar(id) {
    const stars = this.getStars();
    stars[id] = !stars[id];
    if (!stars[id]) delete stars[id];
    this.setStars(stars);
    return !!stars[id];
  },

  // --- Stats helper ---
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

  // Total "activity count" — every checked item counts at least once,
  // plus any extra times logged via the ride counter. Broken down by
  // badge category (thrill/family/show/food/character) and a grand total.
  // e.g. Cosmic Rewind checked + ridden 2 extra times = 3, Remy's = 2 → total 5.
  getActivityTally(parkId) {
    const park = PARKS.find(p => p.id === parkId);
    const checks = this.getChecked();
    const counts = this.getCounts();
    const byCategory = { thrill: 0, family: 0, show: 0, food: 0, character: 0 };
    let total = 0;

    park?.sections.forEach(s => s.items.forEach(item => {
      if (!checks[item.id]) return;
      const times = 1 + (counts[item.id] || 0);
      total += times;
      if (byCategory[item.badge] !== undefined) byCategory[item.badge] += times;
    }));

    return { total, byCategory };
  },
};
