// Rope Drop — App

const BADGE_CONFIG = {
  thrill:    { label: 'Thrill',     cls: 'badge-thrill' },
  family:    { label: 'Family',     cls: 'badge-family' },
  show:      { label: 'Show',       cls: 'badge-show'   },
  food:      { label: 'Food',       cls: 'badge-food'   },
  character: { label: 'Meet',       cls: 'badge-character' },
};

// View state: 'resorts' (the resort-picker screen) or 'park' (a park's checklist)
let currentView = 'resorts';
let activeResortId = Storage.getActiveResort();
let activeParkId = Storage.getActivePark();

// If we have a remembered park, jump straight back into it; otherwise
// land on the resort picker first.
if (activeResortId && PARKS.some(p => p.id === activeParkId && p.resortId === activeResortId)) {
  currentView = 'park';
}

// ── Render resort picker screen ─────────────────────────────────────────────
function renderResortScreen() {
  const main = document.getElementById('main-content');
  const nav = document.getElementById('park-nav');
  nav.innerHTML = '';
  nav.style.display = 'none';

  const html = `
    <div class="resort-screen">
      <div class="resort-screen-header">
        <h1 class="resort-screen-title">Where to?</h1>
        <p class="resort-screen-subtitle">Pick a resort to see its parks</p>
      </div>
      <div class="resort-cards">
        ${RESORTS.map(resort => {
          const parksHere = PARKS.filter(p => p.resortId === resort.id);
          const tally = Storage.getResortTally(resort.id);
          return `
            <button class="resort-card" data-resort="${resort.id}">
              <span class="resort-card-emoji">${resort.emoji}</span>
              <span class="resort-card-name">${resort.name}</span>
              <span class="resort-card-location">${resort.location}</span>
              <span class="resort-card-parks">${parksHere.map(p => p.emoji).join(' ')} ${parksHere.length} parks</span>
              ${tally > 0 ? `<span class="resort-card-tally">${tally} activities logged</span>` : ''}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  main.innerHTML = html;

  main.querySelectorAll('.resort-card').forEach(btn => {
    btn.addEventListener('click', () => switchResort(btn.dataset.resort));
  });

  document.getElementById('progress-summary').innerHTML = '';
  document.getElementById('reset-btn').style.display = 'none';
}

function switchResort(resortId) {
  activeResortId = resortId;
  Storage.setActiveResort(resortId);
  // Jump to the first park belonging to this resort
  const firstPark = PARKS.find(p => p.resortId === resortId);
  if (firstPark) {
    activeParkId = firstPark.id;
    Storage.setActivePark(firstPark.id);
  }
  currentView = 'park';
  document.getElementById('reset-btn').style.display = '';
  renderNav();
  renderPark();
  window.scrollTo(0, 0);
}

function backToResorts() {
  currentView = 'resorts';
  renderResortScreen();
  window.scrollTo(0, 0);
}

// ── Render park nav ──────────────────────────────────────────────────────────
function renderNav() {
  const nav = document.getElementById('park-nav');
  nav.style.display = '';

  const parksHere = PARKS.filter(p => p.resortId === activeResortId);

  const backBtn = `
    <button class="park-tab back-tab" data-action="back-to-resorts">
      <span class="tab-emoji">←</span>
      <span class="tab-name">Resorts</span>
    </button>
  `;

  const parkTabs = parksHere.map(park => {
    const { total: tallyTotal } = Storage.getActivityTally(park.id);
    const isActive = park.id === activeParkId;

    return `
      <button
        class="park-tab${isActive ? ' active' : ''}"
        role="tab"
        aria-selected="${isActive}"
        aria-controls="main-content"
        data-park="${park.id}"
        style="${isActive ? `--tab-accent: ${park.accentColor}; --tab-accent-light: ${park.accentLight};` : ''}"
      >
        <span class="tab-emoji">${park.emoji}</span>
        <span class="tab-name">${park.shortName}</span>
        ${tallyTotal > 0 ? `<span class="tab-pill" style="${isActive ? `background:${park.accentColor};color:#fff;` : ''}">${tallyTotal}</span>` : ''}
      </button>
    `;
  }).join('');

  nav.innerHTML = backBtn + parkTabs;

  nav.querySelector('[data-action="back-to-resorts"]').addEventListener('click', backToResorts);
  nav.querySelectorAll('.park-tab[data-park]').forEach(btn => {
    btn.addEventListener('click', () => switchPark(btn.dataset.park));
  });
}

// ── Render a single item row (used by both Must-Dos and regular sections) ──
function renderItemRow(item, checks, opts = {}) {
  const isDone = !!checks[item.id];
  const badge = BADGE_CONFIG[item.badge] || BADGE_CONFIG.family;
  const count = Storage.getCount(item.id);
  const hasSongPicker = !!SONG_PICKERS[item.id];
  const songLog = Storage.getSongLog(item.id);
  const isStarred = Storage.isStarred(item.id);
  const inMustDos = !!opts.inMustDos;

  return `
    <div class="item-row${isDone ? ' item-done' : ''}" data-id="${item.id}">
      ${inMustDos ? `
        <button
          class="remove-must-btn"
          data-id="${item.id}"
          aria-label="Remove from must-dos"
          title="Remove from must-dos"
        >✕</button>
      ` : `
        <button
          class="star-btn${isStarred ? ' starred' : ''}"
          data-id="${item.id}"
          aria-pressed="${isStarred}"
          aria-label="${isStarred ? 'Remove from your must-dos' : 'Add to your must-dos'}"
          title="${isStarred ? 'Your must-do' : 'Mark as your must-do'}"
        >${isStarred ? '★' : '☆'}</button>
      `}
      <button
        class="item"
        data-id="${item.id}"
        aria-pressed="${isDone}"
        aria-label="${item.name}${isDone ? ' — completed' : ''}"
      >
        <span class="item-check" aria-hidden="true">
          ${isDone ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
        </span>
        <span class="item-body">
          <span class="item-name">${item.name}</span>
          <span class="item-meta">${item.meta}${songLog.length ? ` · <span class="song-tag-inline">${songLog[songLog.length - 1]}</span>` : ''}</span>
        </span>
        <span class="badge ${badge.cls}">${badge.label}</span>
      </button>
      <div class="item-extras">
        ${isDone ? `
          <div class="count-stepper">
            <button class="count-minus" data-id="${item.id}" title="Remove a ride" ${count === 0 ? 'disabled' : ''}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>
            </button>
            <span class="count-display">${count + 1}×</span>
            <button class="count-plus" data-id="${item.id}" title="Add another ride">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        ` : ''}
        ${isDone && hasSongPicker ? `
          <button class="song-btn" data-id="${item.id}" title="Log which song you got">
            🎵${songLog.length > 1 ? ` <span class="count-num">${songLog.length}</span>` : ''}
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

// ── Render main content ──────────────────────────────────────────────────────
function renderPark() {
  const park = PARKS.find(p => p.id === activeParkId);
  const checks = Storage.getChecked();
  const notes = Storage.getNotes();
  const { done, total, pct } = Storage.getParkStats(park.id);
  const tally = Storage.getActivityTally(park.id);
  const main = document.getElementById('main-content');

  const TALLY_LABELS = {
    rides: { label: 'Rides', emoji: '🎢' },
    show: { label: 'Shows', emoji: '🎭' },
    food: { label: 'Food & drink', emoji: '🍽️' },
    character: { label: 'Character meets', emoji: '👋' },
  };

  const tallyChips = Object.entries(tally.byCategory)
    .filter(([, count]) => count > 0)
    .map(([cat, count]) => `
      <div class="tally-chip">
        <span class="tally-emoji">${TALLY_LABELS[cat].emoji}</span>
        <span class="tally-num">${count}</span>
        <span class="tally-label">${TALLY_LABELS[cat].label}</span>
      </div>
    `).join('');

  // Hero
  let html = `
    <div class="park-hero" style="--accent: ${park.accentColor}; --accent-light: ${park.accentLight};">
      <div class="park-hero-inner">
        <div class="park-meta-row">
          <div class="park-meta">${park.resort}</div>
          <button class="map-btn" id="open-map-btn" style="color: ${park.accentColor}; border-color: ${park.accentColor};">🗺️ Map</button>
        </div>
        <h1 class="park-name">${park.emoji} ${park.name}</h1>
        <div class="park-progress-wrap">
          <div class="park-progress-bar">
            <div class="park-progress-fill" style="width: ${pct}%; background: ${park.accentColor};"></div>
          </div>
          <span class="park-progress-label" style="color: ${park.accentColor};">${done} of ${total} done</span>
        </div>
        ${tally.total > 0 ? `
          <div class="tally-section">
            <div class="tally-total">
              <span class="tally-total-num" style="color: ${park.accentColor};">${tally.total}</span>
              <span class="tally-total-label">total activities logged</span>
            </div>
            <div class="tally-chips">${tallyChips}</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Must-Dos section — gathers every starred item across all sections in
  // this park, in starred order. Items here are removed from their normal
  // category below so nothing is duplicated.
  const allStarredItems = [];
  park.sections.forEach(section => {
    section.items.forEach(item => {
      if (Storage.isStarred(item.id)) allStarredItems.push(item);
    });
  });

  if (allStarredItems.length > 0) {
    html += `<div class="section must-dos-section"><h2 class="section-heading must-dos-heading">★ Your must-dos</h2>`;
    allStarredItems.forEach(item => {
      html += renderItemRow(item, checks, { inMustDos: true });
    });
    html += `</div>`;
  }

  // Sections — starred items are excluded here since they live in Must-Dos above
  park.sections.forEach(section => {
    const remainingItems = section.items.filter(item => !Storage.isStarred(item.id));
    if (remainingItems.length === 0) return;

    html += `<div class="section"><h2 class="section-heading">${section.name}</h2>`;
    remainingItems.forEach(item => {
      html += renderItemRow(item, checks);
    });
    html += `</div>`;
  });

  // Notes
  const noteVal = notes[activeParkId] || '';
  html += `
    <div class="section notes-section">
      <h2 class="section-heading">Your notes</h2>
      <textarea
        class="notes-input"
        placeholder="Rope drop plan, Lightning Lane strategy, meal reservations, kids' requests…"
        aria-label="Your notes for ${park.name}"
      >${noteVal}</textarea>
    </div>
    <div class="bottom-spacer"></div>
  `;

  main.innerHTML = html;

  // Bind star buttons
  main.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleStar(btn.dataset.id);
    });
  });

  // Bind must-do remove buttons
  main.querySelectorAll('.remove-must-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleStar(btn.dataset.id);
    });
  });

  // Bind item taps (the main check toggle)
  main.querySelectorAll('.item').forEach(btn => {
    btn.addEventListener('click', () => toggleItem(btn.dataset.id));
  });

  // Bind count stepper buttons
  main.querySelectorAll('.count-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      bumpCount(btn.dataset.id, 1);
    });
  });
  main.querySelectorAll('.count-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      bumpCount(btn.dataset.id, -1);
    });
  });

  // Bind song buttons
  main.querySelectorAll('.song-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSongPicker(btn.dataset.id);
    });
  });

  // Bind notes
  main.querySelector('.notes-input').addEventListener('input', e => {
    Storage.setNote(activeParkId, e.target.value);
  });

  renderBottomBar(park, done, total, pct);

  const mapBtn = document.getElementById('open-map-btn');
  if (mapBtn) mapBtn.addEventListener('click', () => openParkMap(park));
}

// ── Bottom bar ───────────────────────────────────────────────────────────────
function renderBottomBar(park, done, total, pct) {
  const summary = document.getElementById('progress-summary');
  summary.innerHTML = `
    <span class="progress-text">
      <strong>${done}</strong> / ${total} completed
      ${pct === 100 ? ' 🎉' : ''}
    </span>
  `;

  const resetBtn = document.getElementById('reset-btn');
  resetBtn.style.display = '';
  resetBtn.onclick = () => resetPark(park);
}

// ── Actions ──────────────────────────────────────────────────────────────────
function switchPark(id) {
  activeParkId = id;
  Storage.setActivePark(id);
  renderNav();
  renderPark();
  document.getElementById('main-content').scrollTop = 0;
  window.scrollTo(0, 0);
}

function toggleItem(id) {
  const newState = Storage.toggleItem(id);
  const park = PARKS.find(p => p.id === activeParkId);

  renderNav();
  renderPark();

  if (newState) {
    const { done, total } = Storage.getParkStats(activeParkId);
    if (done === total) showToast(`${park.emoji} All done at ${park.shortName}!`);

    // If this item has a song picker, prompt right away
    if (SONG_PICKERS[id]) {
      openSongPicker(id);
    }
  }
}

function toggleStar(id) {
  Storage.toggleStar(id);
  renderPark();
}

function bumpCount(id, direction) {
  if (direction > 0) {
    Storage.incrementCount(id);
    showToast('Logged another ride 🎢');
  } else {
    Storage.decrementCount(id);
  }
  renderNav();
  renderPark();
}

function findItemById(id) {
  for (const park of PARKS) {
    for (const section of park.sections) {
      const item = section.items.find(i => i.id === id);
      if (item) return item;
    }
  }
  return null;
}

// ── Song picker modal ────────────────────────────────────────────────────────
function openSongPicker(id) {
  const config = SONG_PICKERS[id];
  if (!config) return;
  const item = findItemById(id);
  const log = Storage.getSongLog(id);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>${config.label}</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <p class="modal-subtitle">${item ? item.name : ''}</p>
      <div class="song-options">
        ${config.options.map(song => `
          <button class="song-option" data-song="${song.replace(/"/g, '&quot;')}">${song}</button>
        `).join('')}
      </div>
      ${log.length ? `
        <div class="song-log">
          <div class="song-log-heading">Logged rides (${log.length})</div>
          ${log.map((s, i) => `
            <div class="song-log-item">
              <span>${s}</span>
              <button class="song-log-remove" data-index="${i}" aria-label="Remove">✕</button>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
    renderPark(); // refresh song tag/count on the item
  };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  overlay.querySelectorAll('.song-option').forEach(btn => {
    btn.addEventListener('click', () => {
      Storage.addSong(id, btn.dataset.song);
      showToast('Song logged 🎵');
      close();
    });
  });

  overlay.querySelectorAll('.song-log-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      Storage.removeSong(id, parseInt(btn.dataset.index, 10));
      close();
      openSongPicker(id); // reopen refreshed
    });
  });
}

function resetPark(park) {
  if (!confirm(`Clear all checkmarks for ${park.name}?`)) return;
  Storage.clearPark(park.id);
  renderNav();
  renderPark();
  showToast('Checklist cleared');
}

// ── Trips modal ──────────────────────────────────────────────────────────────
function bindTripButton() {
  const btn = document.getElementById('trip-btn');
  if (btn) btn.addEventListener('click', openTripsModal);
}

// ── Park map ─────────────────────────────────────────────────────────────────
let activeLeafletMap = null;

function openParkMap(park) {
  const center = PARK_MAP_CENTERS[park.id];
  if (!center) {
    showToast('Map data isn\'t available for this park yet.', { wrap: true, duration: 2800 });
    return;
  }

  const stars = Storage.getStars();
  const allItems = park.sections.flatMap(s => s.items);
  const allMarkersHere = MAP_MARKERS[park.id] || [];
  // Only show pins for rides currently starred as a must-do
  const starredMarkers = allMarkersHere.filter(m => stars[m.itemId]);
  // Starred items that don't have a pin available, so we can be upfront about it
  const starredWithoutPins = Object.keys(stars).filter(id => {
    const item = allItems.find(i => i.id === id);
    if (!item) return false; // belongs to a different park
    return !allMarkersHere.some(m => m.itemId === id);
  });

  const overlay = document.createElement('div');
  overlay.className = 'map-overlay';
  overlay.innerHTML = `
    <div class="map-modal">
      <div class="map-modal-header">
        <div class="map-modal-title">${park.emoji} ${park.name}</div>
        <button class="map-modal-close" aria-label="Close map">✕</button>
      </div>
      <div id="leaflet-map" class="leaflet-container"></div>
      <div class="map-legend">
        <span class="map-legend-item"><span class="map-dot map-dot-ride"></span> Your must-dos</span>
        <span class="map-legend-item"><span class="map-dot map-dot-land"></span> Lands &amp; areas</span>
      </div>
      ${starredMarkers.length === 0 ? `
        <div class="map-empty-note">⭐ Star a ride as a must-do to see it pinned here.</div>
      ` : ''}
      ${starredWithoutPins.length > 0 ? `
        <div class="map-approx-note">📍 ${starredWithoutPins.length} of your starred pick${starredWithoutPins.length > 1 ? 's' : ''} ${starredWithoutPins.length > 1 ? "don't" : "doesn't"} have map data yet, so it's not pinned.</div>
      ` : ''}
      ${starredMarkers.some(m => m.approx) ? `
        <div class="map-approx-note">📍 Pin locations for this park are approximate — based on the park's general layout, not exact GPS data.</div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    if (activeLeafletMap) {
      activeLeafletMap.remove();
      activeLeafletMap = null;
    }
    overlay.remove();
    document.body.style.overflow = '';
  };

  overlay.querySelector('.map-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Initialize Leaflet after the container is in the DOM
  requestAnimationFrame(() => {
    const map = L.map('leaflet-map', {
      center: [center.lat, center.lng],
      zoom: center.zoom,
      zoomControl: true,
    });
    activeLeafletMap = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Land/area markers — larger, muted circles with labels
    (MAP_LANDS[park.id] || []).forEach(land => {
      L.circleMarker([land.lat, land.lng], {
        radius: 7,
        color: park.accentColor,
        weight: 2,
        fillColor: park.accentLight,
        fillOpacity: 0.6,
      }).addTo(map).bindTooltip(land.name, { permanent: false, direction: 'top' });
    });

    // Ride/attraction markers — only the person's current starred must-dos
    starredMarkers.forEach(marker => {
      const item = allItems.find(i => i.id === marker.itemId);
      if (!item) return;
      const isChecked = !!Storage.getChecked()[item.id];
      L.circleMarker([marker.lat, marker.lng], {
        radius: 9,
        color: '#fff',
        weight: 2,
        fillColor: isChecked ? '#9e9b96' : park.accentColor,
        fillOpacity: 0.95,
      }).addTo(map).bindPopup(`
        <strong>⭐ ${item.name}</strong><br/>
        <span style="color:#888;font-size:12px;">${item.meta}</span>
        ${marker.approx ? '<br/><span style="color:#b8761f;font-size:11px;">approximate location</span>' : ''}
      `);
    });

    setTimeout(() => map.invalidateSize(), 100);
  });
}

function openTripsModal() {
  const trips = Storage.listTrips();
  const activeId = Storage.getActiveTripId();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>Your trips</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <p class="modal-subtitle">Each trip keeps its own checklist, stars, and stats — perfect for comparing this year's visit to last year's.</p>
      <div class="trip-list">
        ${trips.map(trip => `
          <div class="trip-item${trip.id === activeId ? ' trip-item-active' : ''}" data-id="${trip.id}">
            <button class="trip-select" data-id="${trip.id}">
              <span class="trip-name">${trip.name}</span>
              <span class="trip-date">${new Date(trip.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </button>
            <button class="trip-export" data-id="${trip.id}" aria-label="Export this trip" title="Export / share">⬆</button>
            <button class="trip-rename" data-id="${trip.id}" aria-label="Rename trip" title="Rename">✎</button>
            ${trips.length > 1 ? `<button class="trip-delete" data-id="${trip.id}" aria-label="Delete trip" title="Delete">🗑</button>` : ''}
          </div>
        `).join('')}
      </div>
      <button class="new-trip-btn">+ Start a new trip</button>

      <div class="recap-section">
        <div class="recap-section-heading">Share a recap of your current trip</div>
        <div class="recap-btn-row">
          <button class="recap-image-btn">📸 Save as image</button>
          <button class="recap-pdf-btn">📄 Save as PDF</button>
        </div>
      </div>

      <div class="trip-io-row">
        <button class="trip-export-all-btn">Export all trips (data)</button>
        <button class="trip-import-btn">Import a file</button>
      </div>
      <input type="file" id="trip-import-input" accept="application/json,.json" style="display:none;" />
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = (shouldRerender) => {
    overlay.remove();
    document.body.style.overflow = '';
    if (shouldRerender) {
      activeResortId = Storage.getActiveResort();
      activeParkId = Storage.getActivePark();
      if (activeResortId) {
        currentView = 'park';
        renderNav();
        renderPark();
      } else {
        currentView = 'resorts';
        renderResortScreen();
      }
    }
  };

  overlay.querySelector('.modal-close').addEventListener('click', () => close(false));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close(false);
  });

  overlay.querySelectorAll('.trip-select').forEach(btn => {
    btn.addEventListener('click', () => {
      Storage.setActiveTrip(btn.dataset.id);
      showToast('Switched trips 🧳');
      close(true);
    });
  });

  overlay.querySelectorAll('.trip-rename').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trips = Storage.listTrips();
      const trip = trips.find(t => t.id === btn.dataset.id);
      const newName = prompt('Rename this trip', trip ? trip.name : '');
      if (newName && newName.trim()) {
        Storage.renameTrip(btn.dataset.id, newName.trim());
        close(false);
        openTripsModal();
      }
    });
  });

  overlay.querySelectorAll('.trip-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trips = Storage.listTrips();
      const trip = trips.find(t => t.id === btn.dataset.id);
      if (!confirm(`Delete "${trip ? trip.name : 'this trip'}"? This removes all its checklist data permanently.`)) return;
      Storage.deleteTrip(btn.dataset.id);
      close(true);
    });
  });

  overlay.querySelector('.new-trip-btn').addEventListener('click', () => {
    const name = prompt('Name this trip (e.g. "Family Vacation 2026")', '');
    if (name === null) return; // cancelled
    const tripId = Storage.createTrip(name.trim() || 'New Trip');
    Storage._seedStarsForTrip(tripId);
    // New trips start with no resort selected, so the person lands on the
    // resort picker first — this is the default in emptyTripData().
    showToast('New trip started 🎉');
    close(true);
  });

  // Export a single trip
  overlay.querySelectorAll('.trip-export').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trips = Storage.listTrips();
      const trip = trips.find(t => t.id === btn.dataset.id);
      const data = Storage.exportTrip(btn.dataset.id);
      if (!data) return;
      downloadJSON(data, slugify(trip ? trip.name : 'rope-drop-trip'));
      showToast('Trip exported — check your downloads');
    });
  });

  // Recap exports for the currently active trip
  overlay.querySelector('.recap-image-btn').addEventListener('click', () => {
    exportRecapImage();
  });
  overlay.querySelector('.recap-pdf-btn').addEventListener('click', () => {
    exportRecapPDF();
  });

  // Export every trip at once
  overlay.querySelector('.trip-export-all-btn').addEventListener('click', () => {
    const data = Storage.exportAllTrips();
    downloadJSON(data, 'rope-drop-all-trips');
    showToast('All trips exported — check your downloads');
  });

  // Import — opens the hidden file picker
  const importInput = overlay.querySelector('#trip-import-input');
  overlay.querySelector('.trip-import-btn').addEventListener('click', () => {
    importInput.click();
  });

  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      let payload;
      try {
        payload = JSON.parse(event.target.result);
      } catch {
        showToast('That file isn\'t valid — try a Rope Drop export.', { wrap: true, duration: 3200 });
        return;
      }
      const result = Storage.importTrips(payload);
      if (result.success && result.importedCount > 0) {
        showToast(`Imported ${result.importedCount} trip${result.importedCount > 1 ? 's' : ''} 🎉`, { wrap: true, duration: 3200 });
        close(false);
        openTripsModal();
      } else {
        showToast(result.error || 'Could not import that file.', { wrap: true, duration: 3200 });
      }
    };
    reader.readAsText(file);
  });
}

// Triggers a browser download of a JSON object as a .json file
function downloadJSON(obj, filenameBase) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filenameBase}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'rope-drop-trip';
}

// ── Recap canvas renderer (shared layout logic for JPEG export) ────────────
// Draws a vertically-stacked recap: an overview card up top, then one
// card per park visited. Returns the canvas element so callers can either
// export it as a JPEG or hand it off to the PDF builder as an image.
function buildRecapCanvas(summary) {
  const W = 900;
  const CARD_PADDING = 40;
  const HEADER_H = 220;
  const PARK_CARD_BASE_H = 100; // header area within each park card before the list starts
  const LINE_H = 19;
  const MAX_LINES_SHOWN = 8;
  const FOOTER_H = 70;

  const parkCardHeights = summary.parkSummaries.map(ps => {
    const lines = Math.min(ps.timeline.length, MAX_LINES_SHOWN) || 1;
    return PARK_CARD_BASE_H + lines * LINE_H + 20;
  });
  const totalParkH = parkCardHeights.reduce((a, b) => a + b, 0);
  const H = HEADER_H + totalParkH + FOOTER_H + 40;

  const canvas = document.createElement('canvas');
  const scale = 2; // render at 2x for crisp text, then downscale via CSS-free export
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = '#fdfcfa';
  ctx.fillRect(0, 0, W, H);

  let y = 0;

  // ── Header / overview band ──
  const headerGrad = ctx.createLinearGradient(0, 0, W, HEADER_H);
  headerGrad.addColorStop(0, '#2a2520');
  headerGrad.addColorStop(1, '#4a3a28');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, W, HEADER_H);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 15px "DM Sans", sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('🎢 ROPE DROP RECAP', CARD_PADDING, 48);

  ctx.font = '400 38px "DM Serif Display", serif';
  ctx.fillText(summary.tripName, CARD_PADDING, 96);

  ctx.font = '400 64px "DM Serif Display", serif';
  ctx.fillStyle = '#e0a04a';
  ctx.fillText(String(summary.grandTotal), CARD_PADDING, 165);

  ctx.font = '500 15px "DM Sans", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText('total activities logged', CARD_PADDING + ctx.measureText(String(summary.grandTotal)).width + 90, 158);

  // Category chips in header
  const CAT_LABELS = { rides: '🎢 Rides', show: '🎭 Shows', food: '🍽️ Food', character: '👋 Meets' };
  let chipX = CARD_PADDING;
  const chipY = 195;
  Object.entries(summary.grandByCategory).forEach(([cat, count]) => {
    if (count === 0) return;
    const label = `${CAT_LABELS[cat]}: ${count}`;
    ctx.font = '500 13px "DM Sans", sans-serif';
    const textW = ctx.measureText(label).width;
    const chipW = textW + 24;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    roundRect(ctx, chipX, chipY - 16, chipW, 26, 13);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, chipX + 12, chipY + 2);
    chipX += chipW + 8;
  });

  y = HEADER_H;

  // ── Highlight strip (most-ridden) ──
  if (summary.mostRiddenItem && summary.mostRiddenItem.times > 1) {
    ctx.fillStyle = '#fbeee2';
    ctx.fillRect(0, y, W, 50);
    ctx.fillStyle = '#b8761f';
    ctx.font = '500 14px "DM Sans", sans-serif';
    ctx.fillText(`⭐ Favorite: ${summary.mostRiddenItem.name} — ridden ${summary.mostRiddenItem.times}× `, CARD_PADDING, y + 31);
    y += 50;
  }

  // ── Per-park cards ──
  summary.parkSummaries.forEach((ps, i) => {
    const park = ps.park;
    const cardY = y;
    const cardH = parkCardHeights[i];
    const isEven = i % 2 === 0;
    ctx.fillStyle = isEven ? '#ffffff' : '#f7f6f3';
    ctx.fillRect(0, cardY, W, cardH);

    // Accent bar
    ctx.fillStyle = park.accentColor;
    ctx.fillRect(0, cardY, 6, cardH);

    // Park name + emoji
    ctx.fillStyle = '#1a1814';
    ctx.font = '400 26px "DM Serif Display", serif';
    ctx.fillText(`${park.emoji} ${park.name}`, CARD_PADDING, cardY + 42);

    // Total for this park
    ctx.fillStyle = park.accentColor;
    ctx.font = '400 30px "DM Serif Display", serif';
    const totalLabel = String(ps.tally.total);
    const totalW = ctx.measureText(totalLabel).width;
    ctx.fillText(totalLabel, W - CARD_PADDING - totalW - 110, cardY + 44);
    ctx.font = '500 13px "DM Sans", sans-serif';
    ctx.fillStyle = '#6b6760';
    ctx.fillText('activities', W - CARD_PADDING - 100, cardY + 44);

    // Category breakdown line
    const breakdown = Object.entries(ps.tally.byCategory)
      .filter(([, c]) => c > 0)
      .map(([cat, c]) => `${CAT_LABELS[cat]}: ${c}`)
      .join('   ');
    ctx.font = '500 13px "DM Sans", sans-serif';
    ctx.fillStyle = '#6b6760';
    ctx.fillText(breakdown || 'No activities logged', CARD_PADDING, cardY + 70);

    // Chronological timeline with timestamps
    ctx.font = '400 13px "DM Sans", sans-serif';
    const itemsToShow = ps.timeline.slice(0, MAX_LINES_SHOWN);
    itemsToShow.forEach((entry, idx) => {
      const lineY = cardY + 100 + idx * LINE_H;
      ctx.fillStyle = '#9e9b96';
      ctx.fillText(entry.timeLabel, CARD_PADDING + 4, lineY);
      const timeW = ctx.measureText(entry.timeLabel + '  ').width;
      ctx.fillStyle = '#3a3630';
      let nameLabel = entry.name + (entry.isExtra ? ' (again)' : '');
      if (nameLabel.length > 60) nameLabel = nameLabel.slice(0, 57) + '…';
      ctx.fillText(nameLabel, CARD_PADDING + 4 + timeW, lineY);
    });
    if (ps.timeline.length > MAX_LINES_SHOWN) {
      ctx.fillStyle = '#9e9b96';
      ctx.fillText(`+ ${ps.timeline.length - MAX_LINES_SHOWN} more`, CARD_PADDING + 4, cardY + 100 + MAX_LINES_SHOWN * LINE_H);
    }

    y += cardH;
  });

  // ── Footer ──
  ctx.fillStyle = '#2a2520';
  ctx.fillRect(0, y, W, FOOTER_H);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '500 13px "DM Sans", sans-serif';
  ctx.fillText('Made with Rope Drop 🎢  ·  Not affiliated with The Walt Disney Company', CARD_PADDING, y + 40);

  return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Renders the recap canvas and triggers a JPEG download
function exportRecapImage() {
  const summary = Storage.getTripSummary();
  if (summary.grandTotal === 0) {
    showToast('Check off a few things first — nothing to recap yet!', { wrap: true, duration: 3000 });
    return;
  }
  const canvas = buildRecapCanvas(summary);
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slugify(summary.tripName)}-recap.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Recap image saved 📸');
  }, 'image/jpeg', 0.92);
}

// Renders the trip summary as a multi-page PDF: an overview page first,
// then one page per park with full ride breakdowns.
function exportRecapPDF() {
  const summary = Storage.getTripSummary();
  if (summary.grandTotal === 0) {
    showToast('Check off a few things first — nothing to recap yet!', { wrap: true, duration: 3000 });
    return;
  }
  if (typeof window.jspdf === 'undefined') {
    showToast('PDF export isn\'t available right now — try the image export instead.', { wrap: true, duration: 3400 });
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 50;
  let y = margin;

  const CAT_LABELS = { rides: 'Rides', show: 'Shows', food: 'Food & drink', character: 'Character meets' };

  // ── Overview page ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(120, 120, 120);
  doc.text('ROPE DROP RECAP', margin, y);
  y += 28;

  doc.setFont('times', 'normal');
  doc.setFontSize(28);
  doc.setTextColor(30, 28, 24);
  doc.text(summary.tripName, margin, y);
  y += 46;

  doc.setFontSize(48);
  doc.setTextColor(224, 146, 42);
  doc.text(String(summary.grandTotal), margin, y);
  const totalNumWidth = doc.getTextWidth(String(summary.grandTotal));
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(100, 100, 100);
  doc.text('total activities logged', margin + totalNumWidth + 14, y - 6);
  y += 36;

  const catLine = Object.entries(summary.grandByCategory)
    .filter(([, c]) => c > 0)
    .map(([cat, c]) => `${CAT_LABELS[cat]}: ${c}`)
    .join('    ·    ');
  doc.setFontSize(12);
  doc.setTextColor(70, 70, 70);
  doc.text(catLine, margin, y);
  y += 30;

  if (summary.mostRiddenItem && summary.mostRiddenItem.times > 1) {
    doc.setFillColor(251, 238, 226);
    doc.rect(margin - 10, y - 16, pageW - margin * 2 + 20, 30, 'F');
    doc.setTextColor(184, 118, 31);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Favorite: ${summary.mostRiddenItem.name} — ridden ${summary.mostRiddenItem.times}×`, margin, y + 4);
    y += 40;
  }

  y += 10;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageW - margin, y);
  y += 30;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 28, 24);
  doc.text('Parks visited', margin, y);
  y += 22;

  summary.parkSummaries.forEach(ps => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`${ps.park.emoji}  ${ps.park.name}`, margin, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`${ps.tally.total} activities`, pageW - margin - 90, y);
    y += 20;
  });

  // ── One page per park with full checklist breakdown ──
  summary.parkSummaries.forEach(ps => {
    doc.addPage();
    y = margin;

    doc.setFont('times', 'normal');
    doc.setFontSize(24);
    doc.setTextColor(30, 28, 24);
    doc.text(`${ps.park.emoji}  ${ps.park.name}`, margin, y);
    y += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(130, 130, 130);
    doc.text(ps.park.resort, margin, y);
    y += 30;

    const breakdown = Object.entries(ps.tally.byCategory)
      .filter(([, c]) => c > 0)
      .map(([cat, c]) => `${CAT_LABELS[cat]}: ${c}`)
      .join('    ·    ');
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    doc.text(breakdown || 'No activities logged', margin, y);
    y += 28;

    doc.setDrawColor(225, 225, 225);
    doc.line(margin, y, pageW - margin, y);
    y += 24;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 28, 24);
    doc.text('Timeline of the day', margin, y);
    y += 20;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    ps.timeline.forEach(entry => {
      if (y > pageH - margin) {
        doc.addPage();
        y = margin;
      }
      const label = entry.isExtra ? `${entry.name} (again)` : entry.name;
      doc.setTextColor(150, 150, 150);
      doc.text(entry.timeLabel, margin, y);
      doc.setTextColor(40, 40, 40);
      doc.text(label, margin + 65, y);
      y += 18;
    });

    if (ps.timeline.length === 0) {
      doc.setTextColor(150, 150, 150);
      doc.text('Nothing logged here yet.', margin, y);
    }
  });

  // Footer disclaimer on every page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(170, 170, 170);
    doc.text('Made with Rope Drop · Not affiliated with The Walt Disney Company', margin, pageH - 28);
  }

  doc.save(`${slugify(summary.tripName)}-recap.pdf`);
  showToast('Recap PDF saved 📄');
}

// ── Toast ────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, opts = {}) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.toggle('toast-wrap', !!opts.wrap);
  toast.classList.add('toast-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('toast-show'), opts.duration || 2600);
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Make sure a valid trip exists before anything else renders
  Storage.ensureActiveTrip();

  if (currentView === 'park' && activeResortId) {
    renderNav();
    renderPark();
  } else {
    currentView = 'resorts';
    renderResortScreen();
  }

  maybeShowStarHint();
  bindTripButton();
});

function maybeShowStarHint() {
  const seen = localStorage.getItem('rd_star_hint_seen_v1');
  if (seen) return;
  localStorage.setItem('rd_star_hint_seen_v1', '1');
  setTimeout(() => {
    showToast('★ Starred rides are suggested must-dos — tap any star to add or remove your own', { wrap: true, duration: 4200 });
  }, 600);
}
