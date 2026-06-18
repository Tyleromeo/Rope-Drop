// Rope Drop — Storage
// Currently uses localStorage.
// To swap in Supabase: replace getChecked/setChecked/getNotes/setNotes
// with async Supabase reads/writes and update callers in app.js to await them.

const STORAGE_KEY_CHECKS = 'rd_checks_v1';
const STORAGE_KEY_NOTES  = 'rd_notes_v1';
const STORAGE_KEY_PARK   = 'rd_active_park_v1';

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
    PARKS.find(p => p.id === parkId)?.sections.forEach(s =>
      s.items.forEach(i => delete checks[i.id])
    );
    this.setChecked(checks);
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
  }
};
