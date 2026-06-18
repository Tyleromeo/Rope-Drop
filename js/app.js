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
        ${done > 0 ? `<span class="tab-pill" style="${isActive ? `background:${park.accentColor};color:#fff;` : ''}">${pct}%</span>` : ''}
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
  const main = document.getElementById('main-content');

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
      </div>
    </div>
  `;

  // Sections
  park.sections.forEach(section => {
    html += `<div class="section"><h2 class="section-heading">${section.name}</h2>`;

    section.items.forEach(item => {
      const isDone = !!checks[item.id];
      const badge = BADGE_CONFIG[item.badge] || BADGE_CONFIG.family;
      html += `
        <button
          class="item${isDone ? ' item-done' : ''}"
          data-id="${item.id}"
          aria-pressed="${isDone}"
          aria-label="${item.name}${isDone ? ' — completed' : ''}"
        >
          <span class="item-check" aria-hidden="true">
            ${isDone ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
          </span>
          <span class="item-body">
            <span class="item-name">${item.must ? '<span class="must-star" aria-label="must-do">★</span> ' : ''}${item.name}</span>
            <span class="item-meta">${item.meta}</span>
          </span>
          <span class="badge ${badge.cls}">${badge.label}</span>
        </button>
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

  // Bind item taps
  main.querySelectorAll('.item').forEach(btn => {
    btn.addEventListener('click', () => toggleItem(btn.dataset.id));
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
  // Update just this button without full re-render for snappiness
  const btn = document.querySelector(`.item[data-id="${id}"]`);
  if (btn) {
    btn.classList.toggle('item-done', newState);
    btn.setAttribute('aria-pressed', newState);
    const check = btn.querySelector('.item-check');
    check.innerHTML = newState
      ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      : '';
  }
  // Update stats
  const park = PARKS.find(p => p.id === activeParkId);
  const { done, total, pct } = Storage.getParkStats(activeParkId);
  renderBottomBar(park, done, total, pct);

  // Update progress bar in hero
  const fill = document.querySelector('.park-progress-fill');
  const label = document.querySelector('.park-progress-label');
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${done} of ${total} done`;

  // Update tab pill
  renderNav();

  if (newState && done === total) {
    showToast(`${park.emoji} All done at ${park.shortName}!`);
  }
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
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('toast-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('toast-show'), 2600);
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderPark();
});
