// Rope Drop — App

const BADGE_CONFIG = {
  thrill:    { label: 'Thrill',     cls: 'badge-thrill' },
  family:    { label: 'Family',     cls: 'badge-family' },
  show:      { label: 'Show',       cls: 'badge-show'   },
  food:      { label: 'Food',       cls: 'badge-food'   },
  character: { label: 'Meet',       cls: 'badge-character' },
};

let activeParkId = Storage.getActivePark();

// ── Render park nav ──────────────────────────────────────────────────────────
function renderNav() {
  const nav = document.getElementById('park-nav');
  const checks = Storage.getChecked();

  nav.innerHTML = PARKS.map(park => {
    const { done, total } = Storage.getParkStats(park.id);
    const { total: tallyTotal } = Storage.getActivityTally(park.id);
    const isActive = park.id === activeParkId;
    const pct = total ? Math.round((done / total) * 100) : 0;

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

  nav.querySelectorAll('.park-tab').forEach(btn => {
    btn.addEventListener('click', () => switchPark(btn.dataset.park));
  });
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
    thrill: { label: 'Rides', emoji: '🎢' },
    family: { label: 'Family rides', emoji: '🎠' },
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
        <div class="park-meta">${park.resort}</div>
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

  // Sections
  park.sections.forEach(section => {
    html += `<div class="section"><h2 class="section-heading">${section.name}</h2>`;

    // Starred items float to the top of their section, original order preserved otherwise
    const sortedItems = [...section.items].sort((a, b) => {
      const aStar = Storage.isStarred(a.id) ? 1 : 0;
      const bStar = Storage.isStarred(b.id) ? 1 : 0;
      return bStar - aStar;
    });

    sortedItems.forEach(item => {
      const isDone = !!checks[item.id];
      const badge = BADGE_CONFIG[item.badge] || BADGE_CONFIG.family;
      const count = Storage.getCount(item.id);
      const hasSongPicker = !!SONG_PICKERS[item.id];
      const songLog = Storage.getSongLog(item.id);
      const isStarred = Storage.isStarred(item.id);

      html += `
        <div class="item-row${isDone ? ' item-done' : ''}" data-id="${item.id}">
          <button
            class="star-btn${isStarred ? ' starred' : ''}"
            data-id="${item.id}"
            aria-pressed="${isStarred}"
            aria-label="${isStarred ? 'Remove from your must-dos' : 'Add to your must-dos'}"
            title="${isStarred ? 'Your must-do' : 'Mark as your must-do'}"
          >${isStarred ? '★' : '☆'}</button>
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
      e.stopPropagation();
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
  renderNav();
  renderPark();
  maybeShowStarHint();
});

function maybeShowStarHint() {
  const seen = localStorage.getItem('rd_star_hint_seen_v1');
  if (seen) return;
  localStorage.setItem('rd_star_hint_seen_v1', '1');
  setTimeout(() => {
    showToast('★ Starred rides are suggested must-dos — tap any star to add or remove your own', { wrap: true, duration: 4200 });
  }, 600);
}
