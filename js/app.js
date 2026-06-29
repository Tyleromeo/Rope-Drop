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
let activeCategory = 'rides'; // 'rides' | 'show' | 'food' — which tab is showing within a park
let resortScreenRefreshTimer = null; // keeps Today's Log feeling live while on the home screen

// If we have a remembered park, jump straight back into it; otherwise
// land on the resort picker first.
if (activeResortId && PARKS.some(p => p.id === activeParkId && p.resortId === activeResortId)) {
  currentView = 'park';
}

// ── Render resort picker screen ─────────────────────────────────────────────
// ── Progress dashboard — front and center on the resort picker ─────────────
// ── Today's Log — live running list of everything checked off today ───────
function renderTodaysLog() {
  const log = Storage.getTodaysLog();
  if (!log.hasActivityToday) return ''; // nothing logged today — stay out of the way

  const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const BADGE_EMOJI = { thrill: '🎢', family: '🎢', show: '🎭', character: '👋', food: '🍽️' };

  const parkBlocks = log.parkGroups.map(group => `
    <div class="todays-log-park-block">
      <button class="todays-log-park-header" data-park="${group.park.id}">
        <span class="todays-log-park-emoji">${group.park.emoji}</span>
        <span class="todays-log-park-name">${group.park.shortName}</span>
        <span class="todays-log-park-arrow">→</span>
      </button>
      <div class="todays-log-entries">
        ${group.entries.map(e => `
          <div class="todays-log-entry">
            <span class="todays-log-time">${e.timeLabel}</span>
            <span class="todays-log-badge">${BADGE_EMOJI[e.badge] || '•'}</span>
            <span class="todays-log-name">${e.name}${e.isExtra ? ' <span class="todays-log-again">(again)</span>' : ''}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
    <div class="todays-log">
      <div class="todays-log-header">
        <span class="todays-log-title">📋 ${log.tripName}</span>
        <span class="todays-log-date">${todayLabel}</span>
      </div>
      ${parkBlocks}
    </div>
  `;
}

function renderProgressDashboard() {
  const activeId = Storage.getActiveTripId();
  const trips = Storage.listTrips();
  const activeTrip = trips.find(t => t.id === activeId);

  const resortBlocks = RESORTS.map(resort => {
    const parksHere = PARKS.filter(p => p.resortId === resort.id);
    const parkStats = parksHere.map(park => ({ park, stats: Storage.getParkStats(park.id) }));

    const totalDone = parkStats.reduce((sum, p) => sum + p.stats.done, 0);
    const totalItems = parkStats.reduce((sum, p) => sum + p.stats.total, 0);
    const overallPct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;

    // Skip resorts with zero progress entirely so this never feels like
    // a wall of empty bars before someone's even started a trip.
    if (totalDone === 0) return '';

    const parkRows = parkStats.map(({ park, stats }) => `
      <button class="progress-dash-park-row" data-park="${park.id}">
        <span class="progress-dash-park-label">${park.emoji} ${park.shortName}</span>
        <span class="progress-dash-bar-track">
          <span class="progress-dash-bar-fill" style="width: ${stats.pct}%; background: ${park.accentColor};"></span>
        </span>
        <span class="progress-dash-pct">${stats.pct}%</span>
      </button>
    `).join('');

    return `
      <div class="progress-dash-resort">
        <div class="progress-dash-resort-header">
          <span class="progress-dash-resort-title">${resort.emoji} ${resort.shortName}</span>
          <span class="progress-dash-overall">Overall <strong>${overallPct}%</strong></span>
        </div>
        ${parkRows}
      </div>
    `;
  }).join('');

  if (!resortBlocks.trim()) return ''; // nobody's checked anything off anywhere yet

  return `
    <div class="progress-dashboard">
      <button class="progress-dash-trip-label" id="progress-dash-trip-label">
        Showing progress for <strong>${activeTrip ? activeTrip.name : 'this trip'}</strong> · tap to switch
      </button>
      ${resortBlocks}
    </div>
  `;
}

function renderResortScreen() {
  // Stop any refresh timer from a previous visit to this screen before
  // starting a fresh one — prevents stacking multiple intervals if this
  // function gets called again (e.g. switching trips, coming back from
  // a park) while one is already running.
  if (resortScreenRefreshTimer) clearInterval(resortScreenRefreshTimer);

  const main = document.getElementById('main-content');
  const nav = document.getElementById('park-nav');
  nav.innerHTML = '';
  nav.style.display = 'none';

  const resortsBtn = document.getElementById('resorts-btn');
  if (resortsBtn) resortsBtn.style.display = 'none';

  const html = `
    <div class="resort-screen">
      ${renderTodaysLog()}
      ${renderProgressDashboard()}
      <div class="resort-screen-header">
        <h1 class="resort-screen-title">Pick Your Next Adventure</h1>
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
              <span class="resort-card-parks-list">
                ${parksHere.map(p => `<span class="resort-card-park-chip">${p.emoji} ${p.shortName}</span>`).join('')}
              </span>
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

  main.querySelectorAll('.progress-dash-park-row').forEach(row => {
    row.addEventListener('click', () => {
      const parkId = row.dataset.park;
      const park = PARKS.find(p => p.id === parkId);
      if (!park) return;
      switchResort(park.resortId);
      switchPark(parkId);
    });
  });

  main.querySelectorAll('.todays-log-park-header').forEach(header => {
    header.addEventListener('click', () => {
      const parkId = header.dataset.park;
      const park = PARKS.find(p => p.id === parkId);
      if (!park) return;
      switchResort(park.resortId);
      switchPark(parkId);
    });
  });

  const tripLabelBtn = document.getElementById('progress-dash-trip-label');
  if (tripLabelBtn) tripLabelBtn.addEventListener('click', () => openTripsModal());

  document.getElementById('progress-summary').innerHTML = '';
  document.getElementById('reset-btn').style.display = 'none';

  // Keep Today's Log feeling "live" — re-render this screen periodically
  // so new check-ins (logged just now, or imported from another device)
  // show up without the person needing to manually refresh. Only runs
  // while the resort screen is actually the active view.
  resortScreenRefreshTimer = setInterval(() => {
    if (currentView === 'resorts') renderResortScreen();
  }, 60000);
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

  nav.innerHTML = parkTabs;

  nav.querySelectorAll('.park-tab[data-park]').forEach(btn => {
    btn.addEventListener('click', () => switchPark(btn.dataset.park));
  });

  // Show the "← Resorts" button in the header whenever we're inside a
  // park view, since it's no longer part of the scrollable tab row.
  const resortsBtn = document.getElementById('resorts-btn');
  if (resortsBtn) {
    resortsBtn.style.display = '';
    resortsBtn.onclick = backToResorts;
  }
}

// ── Render a single item row (used by both Must-Dos and regular sections) ──
function renderItemRow(item, checks, opts = {}) {
  const isDone = !!checks[item.id];
  const badge = BADGE_CONFIG[item.badge] || BADGE_CONFIG.family;
  const statusTag = item.status === 'new'
    ? '<span class="status-tag status-new">New</span>'
    : item.status === 'closed'
    ? '<span class="status-tag status-closed">Closed</span>'
    : item.status === 'reopening'
    ? '<span class="status-tag status-reopening">Reopening soon</span>'
    : '';
  const singlePassInfo = (typeof SINGLE_PASS_RIDES !== 'undefined') ? SINGLE_PASS_RIDES[item.id] : null;
  const singlePassTag = singlePassInfo
    ? `<span class="status-tag status-singlepass" title="Requires Lightning Lane Single Pass, separate from Multi Pass">⚡ Single Pass</span>`
    : '';
  const count = Storage.getCount(item.id);
  const hasSongPicker = !!SONG_PICKERS[item.id];
  const songLog = Storage.getSongLog(item.id);
  const isStarred = Storage.isStarred(item.id);
  const inMustDos = !!opts.inMustDos;
  const details = (typeof RIDE_DETAILS !== 'undefined') ? RIDE_DETAILS[item.id] : null;
  const menuData = (typeof MENU_DATA !== 'undefined') ? MENU_DATA[item.id] : null;
  const hasInfo = !!(details || menuData);

  const isFirst = !!opts.isFirst;
  const isLast = !!opts.isLast;

  const starOrRemoveBtn = inMustDos
    ? `<button class="remove-must-btn" data-id="${item.id}" aria-label="Remove from must-dos" title="Remove from must-dos">✕</button>`
    : `<button class="star-btn${isStarred ? ' starred' : ''}" data-id="${item.id}" aria-pressed="${isStarred}" aria-label="${isStarred ? 'Remove from your must-dos' : 'Add to your must-dos'}" title="${isStarred ? 'Your must-do' : 'Mark as your must-do'}">${isStarred ? '★' : '☆'}</button>`;

  const reorderBtns = inMustDos ? `
    <div class="reorder-btns">
      <button class="reorder-up-btn" data-id="${item.id}" aria-label="Move up" title="Move up" ${isFirst ? 'disabled' : ''}>▲</button>
      <button class="reorder-down-btn" data-id="${item.id}" aria-label="Move down" title="Move down" ${isLast ? 'disabled' : ''}>▼</button>
    </div>
  ` : '';

  const checkIcon = isDone
    ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : '';

  const isRideType = item.badge === 'thrill' || item.badge === 'family';

  const waitBadgeHtml = isRideType
    ? `<span class="wait-badge" data-wait-name="${item.name.replace(/"/g, '&quot;')}" data-item-id="${item.id}"></span>`
    : '';

  const infoBtn = (hasInfo || isRideType)
    ? `<button class="info-btn" data-id="${item.id}" aria-expanded="false" aria-label="More details about ${item.name}" title="More details">ⓘ</button>`
    : '';

  const stepperHtml = isDone ? `
    <div class="count-stepper">
      <button class="count-minus" data-id="${item.id}" title="Remove a ride" ${count === 0 ? 'disabled' : ''}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>
      </button>
      <span class="count-display">${count + 1}×</span>
      <button class="count-plus" data-id="${item.id}" title="Add another ride">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
  ` : '';

  const songBtnHtml = (isDone && hasSongPicker) ? `
    <button class="song-btn" data-id="${item.id}" title="Log which song you got">
      🎵${songLog.length > 1 ? ` <span class="count-num">${songLog.length}</span>` : ''}
    </button>
  ` : '';

  const menuHtml = menuData ? `
    <div class="detail-block menu-block">
      <strong>🍽️ Menu highlights <span class="cost-tier">${menuData.tier}</span></strong>
      <ul class="menu-list">
        ${menuData.items.map(i => `<li>${i.name}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const playPromptHtml = isRideType ? `
    <button class="play-quicklaunch-btn" data-id="${item.id}">🎮 Waiting in line? Play trivia</button>
  ` : '';

  const singlePassHtml = singlePassInfo ? `
    <div class="detail-block singlepass-block">
      <strong>⚡ Lightning Lane Single Pass required</strong><br/>
      This ride isn't included in the daily Multi Pass — it's a separate pay-per-ride purchase, typically ${singlePassInfo.priceRange} per person. Prices change daily based on demand; check the app for today's rate.
    </div>
  ` : '';

  const detailPanelHtml = (hasInfo || isRideType) ? `
    <div class="item-detail-panel" id="detail-${item.id}" hidden>
      ${details ? `
        <p class="detail-block"><strong>What it is</strong><br/>${details.description}</p>
        <p class="detail-block"><strong>💡 Tip</strong><br/>${details.tip}</p>
        <p class="detail-block"><strong>✨ Fun fact</strong><br/>${details.funFact}</p>
      ` : ''}
      ${singlePassHtml}
      ${menuHtml}
      ${playPromptHtml}
    </div>
  ` : '';

  return `
    <div class="item-wrap">
      <div class="item-row${isDone ? ' item-done' : ''}" data-id="${item.id}">
        ${starOrRemoveBtn}
        <button class="item" data-id="${item.id}" aria-pressed="${isDone}" aria-label="${item.name}${isDone ? ' — completed' : ''}">
          <span class="item-check" aria-hidden="true">${checkIcon}</span>
          <span class="item-body">
            <span class="item-name">${item.name}${statusTag}${singlePassTag}</span>
            <span class="item-meta">${item.meta}${songLog.length ? ` · <span class="song-tag-inline">${songLog[songLog.length - 1]}</span>` : ''}</span>
            ${waitBadgeHtml}
          </span>
          <span class="badge ${badge.cls}">${badge.label}</span>
        </button>
        <div class="item-extras">
          ${reorderBtns}
          ${infoBtn}
          ${stepperHtml}
          ${songBtnHtml}
        </div>
      </div>
      ${detailPanelHtml}
    </div>
  `;
}

// Maps an item's specific badge to one of the three top-level tabs
function categoryForBadge(badge) {
  if (badge === 'thrill' || badge === 'family') return 'rides';
  if (badge === 'show' || badge === 'character') return 'show';
  if (badge === 'food') return 'food';
  return 'rides';
}

// ── Render main content ──────────────────────────────────────────────────────
function renderPark() {
  const park = PARKS.find(p => p.id === activeParkId);
  const checks = Storage.getChecked();
  const notes = Storage.getNotes();
  const { done, total, pct } = Storage.getParkStatsForCategory(park.id, activeCategory);
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

  // Park hours — Early Entry and typical hours only
  const typicalHours = TYPICAL_PARK_HOURS[park.id];
  const hoursHtml = typicalHours ? `
    <div class="hours-section">
      <div class="hours-row">
        <span class="hours-label">🌅 Early Entry</span>
        <span class="hours-value">${typicalHours.early}</span>
      </div>
      <div class="hours-row">
        <span class="hours-label">🕐 Typical hours</span>
        <span class="hours-value">${typicalHours.open} – ${typicalHours.close}</span>
      </div>
    </div>
  ` : '';

  // Hero
  let html = `
    <div class="park-hero" style="--accent: ${park.accentColor}; --accent-light: ${park.accentLight};">
      <div class="park-hero-inner">
        <div class="park-meta-row">
          <div class="park-meta">${park.resort}</div>
          <div class="park-meta-btns">
            <button class="map-btn" id="open-waits-btn" style="color: ${park.accentColor}; border-color: ${park.accentColor};">🕐 Live Waits</button>
            <button class="map-btn" id="open-map-btn" style="color: ${park.accentColor}; border-color: ${park.accentColor};">🗺️ Map</button>
          </div>
        </div>
        <h1 class="park-name">${park.emoji} ${park.name}</h1>
        <div class="park-progress-wrap">
          <div class="park-progress-bar">
            <div class="park-progress-fill" style="width: ${pct}%; background: ${park.accentColor};"></div>
          </div>
          <span class="park-progress-label" style="color: ${park.accentColor};">${done} of ${total} ${activeCategory === 'rides' ? 'rides' : activeCategory === 'show' ? 'shows' : 'food spots'}</span>
        </div>
        ${hoursHtml}
        <div class="weather-section">
          <div class="weather-heading">7-day forecast</div>
          <div id="weather-widget" class="weather-widget"></div>
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

  // Category tabs — Rides / Shows / Food / Play
  const categoryCounts = { rides: 0, show: 0, food: 0 };
  park.sections.forEach(s => s.items.forEach(i => {
    categoryCounts[categoryForBadge(i.badge)]++;
  }));
  const CATEGORY_TABS = [
    { id: 'rides', label: 'Rides', emoji: '🎢' },
    { id: 'show', label: 'Shows', emoji: '🎭' },
    { id: 'food', label: 'Food', emoji: '🍽️' },
    { id: 'play', label: 'Play', emoji: '🎮' },
  ];
  html += `
    <div class="category-tabs">
      ${CATEGORY_TABS.map(cat => `
        <button
          class="category-tab${activeCategory === cat.id ? ' active' : ''}"
          data-category="${cat.id}"
          style="${activeCategory === cat.id ? `--cat-accent: ${park.accentColor}; --cat-accent-light: ${park.accentLight};` : ''}"
        >
          <span class="cat-tab-emoji">${cat.emoji}</span>
          <span class="cat-tab-label">${cat.label}</span>
          ${cat.id !== 'play' ? `<span class="cat-tab-count">${categoryCounts[cat.id]}</span>` : ''}
        </button>
      `).join('')}
    </div>
  `;

  if (activeCategory === 'play') {
    html += renderPlayTab(park);
    main.innerHTML = html;
    bindPlayTab(park);
    // Category tab clicks still need binding even on the Play tab
    main.querySelectorAll('.category-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        renderPark();
        window.scrollTo(0, 0);
      });
    });
    renderWeatherWidget(park);
    document.getElementById('progress-summary').innerHTML = '';
    document.getElementById('reset-btn').style.display = 'none';
    return;
  }

  // Must-Dos section — gathers every starred item across all sections in
  // this park IN THE CURRENT CATEGORY, in the person's chosen order.
  // Items here are removed from their normal category below so nothing
  // is duplicated.
  const starOrderIds = Storage.getStarOrder(park.id);
  const allItemsInPark = park.sections.flatMap(s => s.items);
  const allStarredItems = starOrderIds
    .map(id => allItemsInPark.find(i => i.id === id))
    .filter(item => item && categoryForBadge(item.badge) === activeCategory);

  if (allStarredItems.length > 0) {
    html += `<div class="section must-dos-section"><h2 class="section-heading must-dos-heading">★ Your must-dos</h2>`;
    allStarredItems.forEach((item, idx) => {
      html += renderItemRow(item, checks, {
        inMustDos: true,
        isFirst: idx === 0,
        isLast: idx === allStarredItems.length - 1,
      });
    });
    html += `</div>`;
  }

  // Sections — starred items excluded (shown in Must-Dos above), and only
  // items matching the active category tab are shown.
  // The Rides tab specifically splits into Thrill Rides and Family Rides
  // sections (ignoring the data file's original section groupings),
  // while Shows and Food keep their normal section-based layout.
  if (activeCategory === 'rides') {
    // Single Pass summary — every ride in this park requiring Lightning
    // Lane Single Pass, regardless of starred status, so it's a complete
    // reference even if someone's must-do list overlaps with it.
    const allParkRideIds = park.sections.flatMap(s => s.items)
      .filter(item => categoryForBadge(item.badge) === 'rides')
      .map(i => i.id);
    const singlePassInPark = allParkRideIds
      .filter(id => SINGLE_PASS_RIDES[id])
      .map(id => {
        const item = park.sections.flatMap(s => s.items).find(i => i.id === id);
        return { item, info: SINGLE_PASS_RIDES[id] };
      });

    if (singlePassInPark.length > 0) {
      html += `
        <div class="singlepass-banner">
          <div class="singlepass-banner-title">⚡ Lightning Lane Single Pass rides in ${park.shortName}</div>
          <p class="singlepass-banner-sub">These aren't included in Multi Pass — each is a separate pay-per-ride purchase.</p>
          ${singlePassInPark.map(({ item, info }) => `
            <div class="singlepass-row">
              <span>${item.name}</span>
              <span class="singlepass-price">${info.priceRange}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    const allRideItems = park.sections.flatMap(s => s.items)
      .filter(item => !Storage.isStarred(item.id) && categoryForBadge(item.badge) === 'rides');

    const thrillItems = allRideItems.filter(i => i.badge === 'thrill');
    const familyItems = allRideItems.filter(i => i.badge === 'family');

    if (thrillItems.length > 0) {
      html += `<div class="section"><h2 class="section-heading">Thrill Rides</h2>`;
      thrillItems.forEach(item => { html += renderItemRow(item, checks); });
      html += `</div>`;
    }
    if (familyItems.length > 0) {
      html += `<div class="section"><h2 class="section-heading">Family Rides</h2>`;
      familyItems.forEach(item => { html += renderItemRow(item, checks); });
      html += `</div>`;
    }
  } else {
    park.sections.forEach(section => {
      const remainingItems = section.items.filter(item =>
        !Storage.isStarred(item.id) && categoryForBadge(item.badge) === activeCategory
      );
      if (remainingItems.length === 0) return;

      html += `<div class="section"><h2 class="section-heading">${section.name}</h2>`;
      remainingItems.forEach(item => {
        html += renderItemRow(item, checks);
      });
      html += `</div>`;
    });
  }

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

  renderWeatherWidget(park);
  if (activeCategory === 'rides') loadWaitTimeBadges(park);

  // Bind category tabs
  main.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderPark();
      window.scrollTo(0, 0);
    });
  });

  // Bind "Play while you wait" quick-launch buttons
  main.querySelectorAll('.play-quicklaunch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      activeCategory = 'play';
      triviaView = 'home';
      triviaActiveCategory = 'general';
      const park = PARKS.find(p => p.id === activeParkId);
      startTriviaRound(park);
      window.scrollTo(0, 0);
    });
  });

  // Bind info buttons (expand/collapse ride details)
  main.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const panel = document.getElementById(`detail-${btn.dataset.id}`);
      if (!panel) return;
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      btn.setAttribute('aria-expanded', String(isHidden));
      btn.classList.toggle('info-btn-active', isHidden);
    });
  });

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

  // Bind must-do reorder buttons
  main.querySelectorAll('.reorder-up-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      Storage.moveStarredItem(btn.dataset.id, -1);
      renderPark();
    });
  });
  main.querySelectorAll('.reorder-down-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      Storage.moveStarredItem(btn.dataset.id, 1);
      renderPark();
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

  const waitsBtn = document.getElementById('open-waits-btn');
  if (waitsBtn) waitsBtn.addEventListener('click', () => openLiveWaitsModal(park));
}

// ── Bottom bar ───────────────────────────────────────────────────────────────
function renderBottomBar(park, done, total, pct) {
  const summary = document.getElementById('progress-summary');
  summary.innerHTML = `
    <span class="progress-text">
      <strong>${done}</strong> / ${total}
      ${pct === 100 ? ' 🎉' : ''}
    </span>
  `;

  const resetBtn = document.getElementById('reset-btn');
  resetBtn.style.display = '';
  resetBtn.onclick = () => resetPark(park);
}

// ── Actions ──────────────────────────────────────────────────────────────────
function switchPark(id) {
  if (resortScreenRefreshTimer) {
    clearInterval(resortScreenRefreshTimer);
    resortScreenRefreshTimer = null;
  }
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
    // If this item has a song picker, prompt right away
    if (SONG_PICKERS[id]) {
      openSongPicker(id);
    }

    // Check for any badges newly crossed by this check-in — park tier
    // thresholds or a freshly-completed collection. Only fires on check
    // (not uncheck), so undoing a mistake never triggers a celebration.
    const newBadges = getNewlyEarnedBadges();
    if (newBadges.length > 0) {
      markBadgesSeen(newBadges.map(b => b.id));
      // Stack multiple celebrations if more than one badge was crossed
      // in a single check (e.g. hitting both Silver and Gold at once
      // because the park only had a couple of items left).
      showBadgeCelebration(newBadges, 0);
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

// ── Play tab — trivia while you wait in line ────────────────────────────────
// View state: 'home' (category picker) -> 'levels' (level picker for a
// category) -> 'playing' (an active round) -> 'results'
let triviaView = 'home';
let triviaActiveCategory = null; // category key, or 'general'/'park' for quick modes
let triviaActiveLevel = null;
let triviaState = null; // { questions, index, score }

const ROUND_SIZE = 10;

// Builds a round of up to ROUND_SIZE questions from a pool, shuffled.
// If the pool is smaller than ROUND_SIZE, uses the whole pool rather
// than failing — this matters for thinner level-4 pools.
function buildRoundFromPool(pool) {
  const shuffled = pool.map(q => ({ q, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(x => x.q);
  return shuffled.slice(0, Math.min(ROUND_SIZE, shuffled.length));
}

function renderPlayTab(park) {
  if (triviaView === 'home') return renderTriviaHome(park);
  if (triviaView === 'levels') return renderTriviaLevels(park);
  return `<div class="play-tab"><div id="trivia-game-area"></div></div>`;
}

function bindPlayTab(park) {
  if (triviaView === 'home') return bindTriviaHome(park);
  if (triviaView === 'levels') return bindTriviaLevels(park);
  // 'playing'/'results' states render their own content directly into
  // #trivia-game-area, started via startTriviaRound, so nothing to bind here
  // except re-displaying the current question/results on a re-render.
  if (triviaState) {
    if (triviaView === 'playing') renderTriviaQuestion(park);
    else if (triviaView === 'results') renderTriviaResults(park);
  }
}

// ── Home: category picker + quick modes ─────────────────────────────────────
function renderTriviaHome(park) {
  const categoryCards = Object.entries(TRIVIA_CATEGORIES).map(([key, cat]) => {
    const unlocked = Storage.getHighestUnlockedLevel(key);
    return `
      <button class="trivia-cat-card" data-category="${key}" style="border-color: ${park.accentColor};">
        <span class="trivia-cat-emoji">${cat.emoji}</span>
        <span class="trivia-cat-label">${cat.label}</span>
        <span class="trivia-cat-sub">Level ${unlocked}${unlocked < 4 ? ' unlocked' : ' — maxed out!'}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="play-tab">
      <div class="play-hero">
        <div class="play-hero-emoji">🎮</div>
        <h2 class="play-hero-title">Waiting in line?</h2>
        <p class="play-hero-subtitle">Play a quick round of Disney trivia while the line moves.</p>
      </div>
      <div class="play-mode-buttons">
        <button class="play-mode-btn" id="play-general-btn" style="border-color: ${park.accentColor};">
          <span class="play-mode-emoji">🌎</span>
          <span class="play-mode-label">General Disney Trivia</span>
          <span class="play-mode-sub">Movies, history, parks worldwide</span>
        </button>
        <button class="play-mode-btn" id="play-park-btn" style="border-color: ${park.accentColor};">
          <span class="play-mode-emoji">${park.emoji}</span>
          <span class="play-mode-label">${park.shortName} Trivia</span>
          <span class="play-mode-sub">Questions about this park specifically</span>
        </button>
      </div>
      <div class="trivia-section-divider">Or pick a category</div>
      <div class="trivia-cat-grid">${categoryCards}</div>
      <div id="trivia-game-area"></div>
    </div>
  `;
}

function bindTriviaHome(park) {
  const generalBtn = document.getElementById('play-general-btn');
  const parkBtn = document.getElementById('play-park-btn');
  if (generalBtn) generalBtn.addEventListener('click', () => {
    triviaActiveCategory = 'general';
    startTriviaRound(park);
  });
  if (parkBtn) parkBtn.addEventListener('click', () => {
    triviaActiveCategory = 'park';
    startTriviaRound(park);
  });
  document.querySelectorAll('.trivia-cat-card').forEach(btn => {
    btn.addEventListener('click', () => {
      triviaActiveCategory = btn.dataset.category;
      triviaView = 'levels';
      renderPark();
    });
  });
}

// ── Level picker for a chosen category ──────────────────────────────────────
function renderTriviaLevels(park) {
  const cat = TRIVIA_CATEGORIES[triviaActiveCategory];
  if (!cat) { triviaView = 'home'; return renderTriviaHome(park); }
  const unlocked = Storage.getHighestUnlockedLevel(triviaActiveCategory);

  const levelCards = TRIVIA_LEVELS.map(lvl => {
    const isUnlocked = lvl.id <= unlocked;
    return `
      <button class="trivia-level-card${isUnlocked ? '' : ' trivia-level-locked'}" data-level="${lvl.id}" ${isUnlocked ? '' : 'disabled'} style="${isUnlocked ? `border-color: ${park.accentColor};` : ''}">
        <span class="trivia-level-num">${isUnlocked ? lvl.id : '🔒'}</span>
        <span class="trivia-level-label">${lvl.label}</span>
        <span class="trivia-level-sub">${lvl.sub}${!isUnlocked ? ' — ace the level above to unlock' : ''}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="play-tab">
      <button class="trivia-back-btn" id="trivia-back-to-home">← All categories</button>
      <div class="play-hero">
        <div class="play-hero-emoji">${cat.emoji}</div>
        <h2 class="play-hero-title">${cat.label}</h2>
        <p class="play-hero-subtitle">Get a perfect score to unlock the next level.</p>
      </div>
      <div class="trivia-level-grid">${levelCards}</div>
      <div id="trivia-game-area"></div>
    </div>
  `;
}

function bindTriviaLevels(park) {
  document.getElementById('trivia-back-to-home').addEventListener('click', () => {
    triviaView = 'home';
    renderPark();
  });
  document.querySelectorAll('.trivia-level-card:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      triviaActiveLevel = parseInt(btn.dataset.level, 10);
      startTriviaRound(park);
    });
  });
}

// ── Round play ───────────────────────────────────────────────────────────────
function quitTriviaRound(park) {
  const isCategoryMode = triviaActiveCategory !== 'general' && triviaActiveCategory !== 'park';
  triviaState = null;
  triviaView = isCategoryMode ? 'levels' : 'home';
  renderPark();
  showToast('Round ended — no progress lost on your unlocked levels.', { wrap: true, duration: 2600 });
}

function startTriviaRound(park) {
  let pool;
  if (triviaActiveCategory === 'general') {
    pool = TRIVIA_GENERAL;
  } else if (triviaActiveCategory === 'park') {
    pool = TRIVIA_BY_PARK[park.id] || [];
  } else {
    const cat = TRIVIA_CATEGORIES[triviaActiveCategory];
    pool = (cat && cat.levels[triviaActiveLevel]) || [];
  }

  if (pool.length === 0) {
    showToast('No questions available for this round yet.', { wrap: true, duration: 2600 });
    return;
  }

  triviaState = {
    questions: buildRoundFromPool(pool),
    index: 0,
    score: 0,
  };
  triviaView = 'playing';
  renderPark();
}

function renderTriviaQuestion(park) {
  const area = document.getElementById('trivia-game-area');
  if (!area || !triviaState) return;

  if (triviaState.index >= triviaState.questions.length) {
    triviaView = 'results';
    renderTriviaResults(park);
    return;
  }

  const q = triviaState.questions[triviaState.index];
  area.innerHTML = `
    <div class="trivia-card">
      <div class="trivia-card-header">
        <button class="trivia-quit-btn" id="trivia-quit-btn">← Quit round</button>
        <div class="trivia-progress">Question ${triviaState.index + 1} of ${triviaState.questions.length}</div>
      </div>
      <div class="trivia-question">${q.q}</div>
      <div class="trivia-options">
        ${q.options.map((opt, i) => `
          <button class="trivia-option" data-index="${i}">${opt}</button>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('trivia-quit-btn').addEventListener('click', () => {
    if (!confirm('Quit this round? Your progress on this round will be lost.')) return;
    quitTriviaRound(park);
  });

  area.querySelectorAll('.trivia-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosenIndex = parseInt(btn.dataset.index, 10);
      revealTriviaAnswer(park, q, chosenIndex);
    });
  });
}

function revealTriviaAnswer(park, q, chosenIndex) {
  const area = document.getElementById('trivia-game-area');
  const isCorrect = chosenIndex === q.correct;
  if (isCorrect) triviaState.score++;

  const optionButtons = area.querySelectorAll('.trivia-option');
  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('trivia-correct');
    else if (i === chosenIndex) btn.classList.add('trivia-wrong');
  });

  const explainBlock = document.createElement('div');
  explainBlock.className = 'trivia-explain';
  explainBlock.innerHTML = `
    <div class="trivia-explain-label">${isCorrect ? '✅ Correct!' : '❌ Not quite'}</div>
    <p>${q.explain}</p>
    <button class="trivia-next-btn">${triviaState.index + 1 >= triviaState.questions.length ? 'See results' : 'Next question'} →</button>
  `;
  area.querySelector('.trivia-card').appendChild(explainBlock);

  explainBlock.querySelector('.trivia-next-btn').addEventListener('click', () => {
    triviaState.index++;
    renderTriviaQuestion(park);
  });
}

function renderTriviaResults(park) {
  const area = document.getElementById('trivia-game-area');
  const { score, questions } = triviaState;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const isCategoryMode = triviaActiveCategory !== 'general' && triviaActiveCategory !== 'park';

  let message;
  let unlockMessage = '';
  if (pct === 100) {
    message = '🏆 Perfect score!';
    if (isCategoryMode) {
      const didUnlock = Storage.recordTriviaResult(triviaActiveCategory, triviaActiveLevel, score, total);
      if (didUnlock && triviaActiveLevel < 4) {
        const nextLevel = TRIVIA_LEVELS.find(l => l.id === triviaActiveLevel + 1);
        unlockMessage = `<div class="trivia-unlock-banner">🔓 ${nextLevel.label} level unlocked!</div>`;
      } else if (triviaActiveLevel === 4) {
        unlockMessage = `<div class="trivia-unlock-banner">👑 You've mastered every level in this category!</div>`;
      }
    }
  } else if (pct >= 75) message = '🎉 Great job — so close to perfect!';
  else if (pct >= 50) message = '👍 Solid round! Try again for a higher score.';
  else message = '🎢 Plenty more line time to brush up — give it another go!';

  area.innerHTML = `
    <div class="trivia-card trivia-results">
      <div class="trivia-results-score">${score} / ${total}</div>
      <div class="trivia-results-message">${message}</div>
      ${unlockMessage}
      <div class="play-mode-buttons">
        <button class="play-mode-btn" id="play-again-btn" style="border-color: ${park.accentColor};">
          <span class="play-mode-emoji">🔁</span>
          <span class="play-mode-label">Play Again</span>
        </button>
        <button class="play-mode-btn" id="play-back-btn" style="border-color: ${park.accentColor};">
          <span class="play-mode-emoji">↩️</span>
          <span class="play-mode-label">${isCategoryMode ? 'Back to Levels' : 'Back to Categories'}</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById('play-again-btn').addEventListener('click', () => startTriviaRound(park));
  document.getElementById('play-back-btn').addEventListener('click', () => {
    triviaView = isCategoryMode ? 'levels' : 'home';
    renderPark();
  });
}

// ── Live wait time badges (rendered into placeholders after page load) ─────
async function loadWaitTimeBadges(park) {
  const badges = document.querySelectorAll('.wait-badge');
  if (badges.length === 0) return;

  // Show a subtle loading state immediately so the row doesn't look broken
  // while the network call is in flight.
  badges.forEach(el => { el.textContent = ''; el.classList.add('wait-badge-loading'); });

  const liveLookup = await getLiveWaitTimes(park.id);

  // Re-query in case the view changed (e.g. user switched tabs) while the
  // fetch was in flight — stale DOM nodes would just silently no-op here.
  document.querySelectorAll('.wait-badge').forEach(el => {
    el.classList.remove('wait-badge-loading');
    const name = el.dataset.waitName;
    const match = matchWaitTime(liveLookup, name);

    if (!match) {
      el.textContent = '';
      return;
    }

    if (match.status === 'DOWN') {
      el.textContent = '⚠️ Temporarily down';
      el.className = 'wait-badge wait-badge-down';
    } else if (match.status === 'REFURBISHMENT') {
      el.textContent = '🔧 Refurbishment';
      el.className = 'wait-badge wait-badge-down';
    } else if (match.status === 'CLOSED') {
      el.textContent = '';
    } else if (typeof match.waitTime === 'number') {
      const level = match.waitTime >= 60 ? 'high' : match.waitTime >= 30 ? 'medium' : 'low';
      el.textContent = `🕐 ${match.waitTime} min wait`;
      el.className = `wait-badge wait-badge-${level}`;
    } else {
      el.textContent = '';
    }
  });
}

// ── Weather forecast ─────────────────────────────────────────────────────────
const weatherCache = {}; // parkId -> { data, fetchedAt }
const WEATHER_CACHE_MS = 30 * 60 * 1000; // 30 minutes

async function fetchWeather(park) {
  const cached = weatherCache[park.id];
  if (cached && Date.now() - cached.fetchedAt < WEATHER_CACHE_MS) {
    return cached.data;
  }

  const center = PARK_MAP_CENTERS[park.id];
  if (!center) return null;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${center.lat}&longitude=${center.lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_mean&temperature_unit=fahrenheit&timezone=auto&forecast_days=7`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const json = await res.json();
    weatherCache[park.id] = { data: json, fetchedAt: Date.now() };
    return json;
  } catch (e) {
    return null;
  }
}

function renderWeatherWidget(park) {
  const container = document.getElementById('weather-widget');
  if (!container) return;

  container.innerHTML = `<div class="weather-loading">Loading 7-day forecast…</div>`;

  fetchWeather(park).then(data => {
    if (!data || !data.daily) {
      container.innerHTML = `<div class="weather-error">Forecast unavailable right now.</div>`;
      return;
    }

    const { time, temperature_2m_max, temperature_2m_min, precipitation_probability_max, relative_humidity_2m_mean } = data.daily;

    const dayCards = time.map((dateStr, i) => {
      const date = new Date(dateStr + 'T12:00:00');
      const dayLabel = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
      const high = Math.round(temperature_2m_max[i]);
      const low = Math.round(temperature_2m_min[i]);
      const rain = Math.round(precipitation_probability_max[i]);
      const humidity = Math.round(relative_humidity_2m_mean[i]);

      return `
        <div class="weather-day">
          <div class="weather-day-label">${dayLabel}</div>
          <div class="weather-temps">
            <span class="weather-high">${high}°</span>
            <span class="weather-low">${low}°</span>
          </div>
          <div class="weather-detail">💧 ${rain}%</div>
          <div class="weather-detail">💦 ${humidity}%</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="weather-scroll">${dayCards}</div>
      <div class="weather-attribution">Forecast data: Open-Meteo.com</div>
    `;
  });
}

// ── Park map ─────────────────────────────────────────────────────────────────
let activeLeafletMap = null;

// ── Live Waits modal — sortable list of real-time ride wait times ──────────
let liveWaitsSortMode = 'wait-desc'; // 'wait-desc' | 'wait-asc' | 'alpha'

async function openLiveWaitsModal(park) {
  let cachedRideEntries = [];

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>🕐 Live Waits — ${park.shortName}</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="waits-sort-row">
        <button class="waits-sort-btn active" data-sort="wait-desc">Longest first</button>
        <button class="waits-sort-btn" data-sort="wait-asc">Shortest first</button>
        <button class="waits-sort-btn" data-sort="alpha">A–Z</button>
      </div>
      <div id="live-waits-list" class="live-waits-list">
        <div class="waits-loading">Loading live wait times…</div>
      </div>
      <p class="waits-attribution">Wait times powered by <a href="https://themeparks.wiki" target="_blank" rel="noopener">ThemeParks.wiki</a>, updated every few minutes.</p>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  overlay.querySelectorAll('.waits-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      liveWaitsSortMode = btn.dataset.sort;
      overlay.querySelectorAll('.waits-sort-btn').forEach(b => b.classList.toggle('active', b === btn));
      renderLiveWaitsList(overlay, park, cachedRideEntries);
    });
  });

  // Gather every ride/family item in this park, then fetch live data once
  const allRides = park.sections.flatMap(s => s.items).filter(i => i.badge === 'thrill' || i.badge === 'family');
  const liveLookup = await getLiveWaitTimes(park.id);

  if (!liveLookup) {
    overlay.querySelector('#live-waits-list').innerHTML = `<p class="waits-empty">Live wait times aren't available right now — check your connection and try again.</p>`;
    return;
  }

  cachedRideEntries = allRides.map(item => {
    const match = matchWaitTime(liveLookup, item.name);
    return { item, match };
  });

  renderLiveWaitsList(overlay, park, cachedRideEntries);
}

function renderLiveWaitsList(overlay, park, entries) {
  const container = overlay.querySelector('#live-waits-list');

  const withData = entries.filter(e => e.match && typeof e.match.waitTime === 'number' && e.match.status !== 'CLOSED');
  const downOrClosed = entries.filter(e => e.match && (e.match.status === 'DOWN' || e.match.status === 'REFURBISHMENT'));
  const noData = entries.filter(e => !e.match || (e.match.status === 'CLOSED' && typeof e.match.waitTime !== 'number'));

  let sorted = [...withData];
  if (liveWaitsSortMode === 'wait-desc') sorted.sort((a, b) => b.match.waitTime - a.match.waitTime);
  else if (liveWaitsSortMode === 'wait-asc') sorted.sort((a, b) => a.match.waitTime - b.match.waitTime);
  else sorted.sort((a, b) => a.item.name.localeCompare(b.item.name));

  const rowHtml = (entry, extra) => {
    const level = entry.match && typeof entry.match.waitTime === 'number'
      ? (entry.match.waitTime >= 60 ? 'high' : entry.match.waitTime >= 30 ? 'medium' : 'low')
      : 'down';
    return `
      <div class="waits-row">
        <span class="waits-row-name">${entry.item.name}</span>
        <span class="waits-row-time wait-badge-${level}">${extra}</span>
      </div>
    `;
  };

  const sortedHtml = sorted.map(e => rowHtml(e, `🕐 ${e.match.waitTime} min`)).join('');
  const downHtml = downOrClosed.map(e => rowHtml(e, e.match.status === 'DOWN' ? '⚠️ Down' : '🔧 Refurb')).join('');
  const noDataHtml = noData.length > 0 ? `
    <div class="waits-section-heading">No live data</div>
    ${noData.map(e => `<div class="waits-row waits-row-muted"><span class="waits-row-name">${e.item.name}</span><span class="waits-row-time">—</span></div>`).join('')}
  ` : '';

  container.innerHTML = `
    ${sortedHtml || '<p class="waits-empty">No current wait times to show.</p>'}
    ${downHtml}
    ${noDataHtml}
  `;
}

// ── Must-do map fallback ─────────────────────────────────────────────────────
// Not every ride has an exact GPS pin in MAP_MARKERS. For anything
// starred without one, we resolve at least an approximate land-level
// location so it still shows up on the map rather than vanishing.
// Primary signal is each item's own `land` field (set directly in
// data.js) since that's structured and reliable; a small alias table
// bridges the cases where that land name doesn't exactly match the
// label used in MAP_LANDS (e.g. data.js says "World Showcase (France)"
// but MAP_LANDS just has "France pavilion"). Meta-string parsing is
// kept only as a last-resort fallback for any item missing a land.
const MAP_LAND_ALIASES = {
  mk: {
    'main street usa': 'Main Street, U.S.A.',
    'storybook circus': { name: 'Storybook Circus', lat: 28.42065, lng: -81.5792 },
  },
  hs: {
    'sunset blvd': 'Sunset Boulevard',
    'hollywood blvd': 'Hollywood Boulevard',
    'hollywood hills amphitheater': 'Sunset Boulevard',
    'the walt disney studios': 'Hollywood Boulevard',
    'animation courtyard': 'Hollywood Boulevard',
    'commissary lane': "Galaxy's Edge",
    'grand avenue': 'Toy Story Land',
  },
  ep: {
    'world showcase france': { name: 'France pavilion', lat: 28.369067, lng: -81.552725 },
    'world showcase norway': { name: 'Norway pavilion', lat: 28.370517, lng: -81.5471 },
    'world showcase mexico': { name: 'Mexico pavilion', lat: 28.371414, lng: -81.547586 },
    'world showcase usa': 'World Showcase',
    'world showcase china': 'World Showcase',
    'world showcase canada': 'World Showcase',
    'world showcase morocco': 'World Showcase',
    'world showcase germany': 'World Showcase',
    'world showcase italy': 'World Showcase',
    'world showcase japan': 'World Showcase',
    'world showcase united kingdom': 'World Showcase',
  },
  ak: {
    'africa harambe station': 'Africa',
    'conservation station': { name: 'Conservation Station', lat: 28.3652, lng: -81.5902 },
    'park entrance': { name: 'Park entrance', lat: 28.3549, lng: -81.5905 },
    'park wide': 'Discovery Island',
  },
  dl: {
    'main street usa': 'Main Street, U.S.A.',
    'bayou country': { name: 'Bayou Country', lat: 33.8108, lng: -117.9165 },
    'mickeys toontown': { name: "Mickey's Toontown", lat: 33.8152, lng: -117.9186 },
  },
  dca: {
    'san fransokyo square': 'Hollywood Land',
    'golden state': 'Grizzly Peak',
  },
};

function normalizeMapLabel(value) {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\([^)]*\)/g, '')
    .replace(/['’‘]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bu s a\b/g, 'usa')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMetaLocation(item) {
  return (item.meta || '').split('·')[0].trim();
}

function resolveMapLocation(parkId, item) {
  // Prefer the item's own structured land field — set directly in
  // data.js for every item — over parsing the free-text meta string.
  const rawLocation = item.land || firstMetaLocation(item);
  if (!rawLocation) return null;

  const normalized = normalizeMapLabel(rawLocation);
  const lands = MAP_LANDS[parkId] || [];
  const aliases = MAP_LAND_ALIASES[parkId] || {};
  const alias = aliases[normalized];

  if (alias && typeof alias === 'object') {
    return alias;
  }

  const targetName = typeof alias === 'string' ? alias : rawLocation;
  const targetNormalized = normalizeMapLabel(targetName);

  return lands.find(land => normalizeMapLabel(land.name) === targetNormalized)
    || lands.find(land => {
      const landName = normalizeMapLabel(land.name);
      return landName.includes(targetNormalized) || targetNormalized.includes(landName);
    })
    || null;
}

function getStarredMapData(park, stars) {
  const allItems = park.sections.flatMap(s => s.items);
  const exactMarkers = new Map((MAP_MARKERS[park.id] || []).map(marker => [marker.itemId, marker]));
  const starredMarkers = [];
  const starredWithoutPins = [];

  Object.keys(stars).forEach(id => {
    const item = allItems.find(i => i.id === id);
    if (!item) return; // belongs to a different park

    const exactMarker = exactMarkers.get(id);
    if (exactMarker) {
      starredMarkers.push(exactMarker);
      return;
    }

    const fallbackLocation = resolveMapLocation(park.id, item);
    if (fallbackLocation) {
      starredMarkers.push({
        itemId: id,
        lat: fallbackLocation.lat,
        lng: fallbackLocation.lng,
        approx: true,
        approxLabel: fallbackLocation.name || item.land || firstMetaLocation(item),
      });
      return;
    }

    starredWithoutPins.push(item);
  });

  return { allItems, starredMarkers, starredWithoutPins };
}

function openParkMap(park) {
  const center = PARK_MAP_CENTERS[park.id];
  if (!center) {
    showToast('Map data isn\'t available for this park yet.', { wrap: true, duration: 2800 });
    return;
  }

  const stars = Storage.getStars();
  const { allItems, starredMarkers, starredWithoutPins } = getStarredMapData(park, stars);

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
        ${marker.approx ? `<br/><span style="color:#b8761f;font-size:11px;">approximate location${marker.approxLabel ? `: ${marker.approxLabel}` : ''}</span>` : ''}
      `);
    });

    setTimeout(() => map.invalidateSize(), 100);
  });
}

// ── All-time stats modal ────────────────────────────────────────────────────
let allTimeView = 'alltime'; // 'alltime' | 'byyear'

// ── Collections — list view + detail view ("What am I missing?") ──────────
let collectionsDetailId = null; // currently-open collection's id, or null for the list

// ── Badge wall — browsable view of every earned (and not-yet-earned) badge ──
// ── Disney History — a keepsake profile view of your whole Disney story ────
let historyModalView = 'profile'; // 'profile' | 'alltime' | 'byyear'

function openDisneyHistoryModal() {
  const p = Storage.getDisneyHistoryProfile();
  const stats = Storage.getAllTimeStats();

  const CAT_LABELS = { rides: '🎢 Rides', show: '🎭 Shows', food: '🍽️ Food', character: '👋 Meets' };
  const BADGE_EMOJI = { thrill: '🎢', family: '🎢', show: '🎭', character: '👋', food: '🍽️' };

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card history-card alltime-card">
      <div class="modal-header">
        <h3>📖 My Disney History</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <p class="modal-subtitle">Every trip you've logged tells a bigger story — here's yours so far.</p>

      <div class="alltime-tabs">
        <button class="alltime-tab${historyModalView === 'profile' ? ' active' : ''}" data-view="profile">Profile</button>
        <button class="alltime-tab${historyModalView === 'alltime' ? ' active' : ''}" data-view="alltime">All-Time</button>
        <button class="alltime-tab${historyModalView === 'byyear' ? ' active' : ''}" data-view="byyear">By Year</button>
      </div>

      <div id="history-content"></div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  overlay.querySelectorAll('.alltime-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      historyModalView = btn.dataset.view;
      overlay.querySelectorAll('.alltime-tab').forEach(b => b.classList.toggle('active', b === btn));
      renderHistoryContent();
    });
  });

  renderHistoryContent();

  function renderHistoryContent() {
    const container = overlay.querySelector('#history-content');

    if (historyModalView === 'profile') {
      container.innerHTML = renderProfileTabHtml();
      const shareBtn = container.querySelector('.history-share-btn');
      if (shareBtn) shareBtn.addEventListener('click', () => shareDisneyHistoryImage(p));
      return;
    }

    if (historyModalView === 'alltime') {
      container.innerHTML = renderStatsBundleHtml(stats, 'total activities, all-time');
      return;
    }

    // By Year
    const years = Object.keys(stats.perYear).sort((a, b) => b - a);
    if (years.length === 0) {
      container.innerHTML = `<p class="alltime-empty">Nothing logged yet — check a few things off on a trip!</p>`;
      return;
    }
    container.innerHTML = years.map(year => `
      <div class="alltime-year-block">
        <div class="alltime-year-heading">${year}</div>
        ${renderStatsBundleHtml(stats.perYear[year], 'activities')}
      </div>
    `).join('');
  }

  function renderProfileTabHtml() {
    const formatDate = (ts, opts) => ts ? new Date(ts).toLocaleDateString('en-US', opts) : '—';
    const firstYear = p.firstTripDate ? new Date(p.firstTripDate).getFullYear() : '—';
    const lastVisit = formatDate(p.lastTripDate, { month: 'long', year: 'numeric' });

    const rows = [
      { label: 'Trips', value: p.totalTrips, icon: '✈️' },
      { label: 'Activities logged', value: p.totalActivities.toLocaleString(), icon: '📋' },
      {
        label: 'Favorite attraction',
        value: p.favoriteAttraction ? p.favoriteAttraction.item.name : 'Not yet logged',
        sub: p.favoriteAttraction ? `${p.favoriteAttraction.times}× done` : '',
        icon: '🎢',
      },
      {
        label: 'Favorite snack',
        value: p.favoriteSnack ? p.favoriteSnack.item.name : 'Not yet logged',
        sub: p.favoriteSnack ? `${p.favoriteSnack.times}× had` : '',
        icon: '🍽️',
      },
      {
        label: 'Favorite park',
        value: p.favoritePark ? p.favoritePark.park.name : 'Not yet logged',
        // Combined total across rides, food, shows, and character meets
        // at that park — not just rides.
        sub: p.favoritePark ? `${p.favoritePark.times} activities logged` : '',
        icon: p.favoritePark ? p.favoritePark.park.emoji : '🏰',
      },
      {
        label: 'Most visited land',
        value: p.mostVisitedLand ? p.mostVisitedLand.land : 'Not yet logged',
        // Same combined-total idea, scoped to this one land.
        sub: p.mostVisitedLand ? `${p.mostVisitedLand.times} activities · ${p.mostVisitedLand.park.shortName}` : '',
        icon: '🗺️',
      },
      { label: 'First Disney trip', value: firstYear, icon: '🌟' },
      { label: 'Last visit', value: lastVisit, icon: '📅' },
      { label: 'Parks completed', value: `${p.parksCompleted} of ${p.totalParks}`, icon: '🏆' },
    ];

    const rowsHtml = rows.map(r => `
      <div class="history-row">
        <span class="history-row-icon">${r.icon}</span>
        <span class="history-row-body">
          <span class="history-row-label">${r.label}</span>
          <span class="history-row-value">${r.value}</span>
          ${r.sub ? `<span class="history-row-sub">${r.sub}</span>` : ''}
        </span>
      </div>
    `).join('');

    return `
      <div class="history-rows">${rowsHtml}</div>
      <button class="history-share-btn">📤 Share my Disney History</button>
    `;
  }

  // Renders one full stats bundle (grandTotals, mostRidden, favoriteSongs,
  // allItemsRanked) as HTML — shared by both the All-Time tab and each
  // year block in the By Year tab, so they show identical detail.
  function renderStatsBundleHtml(bundle, totalLabel) {
    const tallyChips = Object.entries(bundle.grandTotals)
      .filter(([key, count]) => key !== 'total' && count > 0)
      .map(([cat, count]) => `<div class="tally-chip"><span class="tally-num">${count}</span><span class="tally-label">${CAT_LABELS[cat]}</span></div>`)
      .join('');

    const songSections = Object.entries(bundle.songBreakdown || {}).map(([itemId, songList]) => {
      const item = bundle.allItemsRanked.find(r => r.item.id === itemId)?.item;
      if (!item) return '';
      const totalPlays = songList.reduce((sum, s) => sum + s.count, 0);
      const rows = songList.map((s, i) => `
        <div class="song-breakdown-row${i === 0 ? ' song-breakdown-top' : ''}">
          <span class="song-breakdown-rank">${i === 0 ? '🏆' : i + 1}</span>
          <span class="song-breakdown-name">${s.song}</span>
          <span class="song-breakdown-count">${s.count}×</span>
        </div>
      `).join('');
      return `
        <div class="song-breakdown-block">
          <div class="song-breakdown-heading">${item.name} <span class="song-breakdown-total">(${totalPlays} ride${totalPlays !== 1 ? 's' : ''} with a song logged)</span></div>
          ${rows}
        </div>
      `;
    }).join('');

    const rankedRows = bundle.allItemsRanked.map((r, i) => `
      <div class="alltime-rank-row">
        <span class="rank-num">${i + 1}</span>
        <span class="rank-emoji">${BADGE_EMOJI[r.item.badge] || '•'}</span>
        <span class="rank-name">${r.item.name}</span>
        <span class="rank-count">${r.totalTimes}×</span>
      </div>
    `).join('');

    return `
      <div class="alltime-total">
        <span class="alltime-total-num">${bundle.grandTotals.total}</span>
        <span class="alltime-total-label">${totalLabel}</span>
      </div>
      <div class="tally-chips">${tallyChips}</div>
      ${bundle.mostRidden ? `
        <div class="alltime-highlight">⭐ Most done: <strong>${bundle.mostRidden.item.name}</strong> — ${bundle.mostRidden.totalTimes}×</div>
      ` : ''}
      ${songSections ? `
        <div class="alltime-section-heading">Songs heard, all-time</div>
        ${songSections}
      ` : ''}
      ${rankedRows ? `
        <div class="alltime-section-heading">Everything, ranked</div>
        <div class="alltime-rank-list">${rankedRows}</div>
      ` : `<p class="alltime-empty">Nothing logged yet — check a few things off on a trip!</p>`}
    `;
  }
}

// Generates a shareable square keepsake image summarizing the whole
// Disney History profile — built the same safe way as badge images (a
// self-contained SVG with real text nodes, rasterized via base64 data
// URI), since that's the approach already confirmed to render emoji
// correctly and not taint the canvas.
async function shareDisneyHistoryImage(p) {
  try {
    const formatDate = (ts, opts) => ts ? new Date(ts).toLocaleDateString('en-US', opts) : '—';
    const firstYear = p.firstTripDate ? new Date(p.firstTripDate).getFullYear() : '—';
    const lastVisit = formatDate(p.lastTripDate, { month: 'short', year: 'numeric' });
    const escapeXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const lines = [
      { label: 'TRIPS', value: String(p.totalTrips) },
      { label: 'ACTIVITIES LOGGED', value: p.totalActivities.toLocaleString() },
      { label: 'FAVORITE ATTRACTION', value: p.favoriteAttraction ? `${p.favoriteAttraction.item.name} (${p.favoriteAttraction.times}×)` : '—' },
      { label: 'FAVORITE SNACK', value: p.favoriteSnack ? `${p.favoriteSnack.item.name} (${p.favoriteSnack.times}×)` : '—' },
      { label: 'FAVORITE PARK', value: p.favoritePark ? p.favoritePark.park.name : '—' },
      { label: 'MOST VISITED LAND', value: p.mostVisitedLand ? p.mostVisitedLand.land : '—' },
      { label: 'FIRST DISNEY TRIP', value: String(firstYear) },
      { label: 'LAST VISIT', value: lastVisit },
      { label: 'PARKS COMPLETED', value: `${p.parksCompleted} of ${p.totalParks}` },
    ];

    const SIZE_W = 1080;
    const SIZE_H = 1350; // taller than wide — more room for the full list
    const startY = 200;
    const rowH = 110;

    const rowsSvg = lines.map((line, i) => {
      const y = startY + i * rowH;
      return `
        <text x="80" y="${y}" font-size="24" font-weight="700" letter-spacing="2" font-family="DM Sans, sans-serif" fill="#9e9b96">${escapeXml(line.label)}</text>
        <text x="80" y="${y + 42}" font-size="38" font-weight="700" font-family="DM Sans, sans-serif" fill="#ffffff">${escapeXml(line.value)}</text>
        <line x1="80" y1="${y + 64}" x2="1000" y2="${y + 64}" stroke="#3a352d" stroke-width="1"/>
      `;
    }).join('');

    const svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${SIZE_W}" height="${SIZE_H}" viewBox="0 0 ${SIZE_W} ${SIZE_H}">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2a2620"/>
            <stop offset="100%" stop-color="#181511"/>
          </linearGradient>
        </defs>
        <rect width="${SIZE_W}" height="${SIZE_H}" fill="url(#bg)"/>
        <text x="80" y="90" font-size="30" font-weight="700" font-family="DM Sans, sans-serif" fill="#e0a04a">🎢 ROPE DROP</text>
        <text x="80" y="150" font-size="50" font-weight="700" font-family="DM Sans, sans-serif" fill="#ffffff">My Disney History</text>
        ${rowsSvg}
        <text x="${SIZE_W / 2}" y="${SIZE_H - 60}" font-size="24" text-anchor="middle" font-family="DM Sans, sans-serif" fill="#9e9b96">Made with Rope Drop</text>
        <text x="${SIZE_W / 2}" y="${SIZE_H - 30}" font-size="18" text-anchor="middle" font-family="DM Sans, sans-serif" fill="#9e9b96">Not affiliated with The Walt Disney Company</text>
      </svg>
    `.trim();

    const canvas = document.createElement('canvas');
    canvas.width = SIZE_W;
    canvas.height = SIZE_H;
    const ctx = canvas.getContext('2d');

    const dataUri = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgMarkup)));
    const img = new Image();
    img.width = SIZE_W;
    img.height = SIZE_H;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = dataUri;
    });

    ctx.drawImage(img, 0, 0, SIZE_W, SIZE_H);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        showToast('Couldn\'t create that image — try again in a moment.', { wrap: true, duration: 3200 });
        return;
      }
      const fileName = 'rope-drop-disney-history.png';
      const file = new File([blob], fileName, { type: 'image/png' });

      let canUseNativeShare = false;
      try {
        canUseNativeShare = !!(navigator.share && navigator.canShare && navigator.canShare({ files: [file] }));
      } catch (e) {
        canUseNativeShare = false;
      }

      if (canUseNativeShare) {
        try {
          await navigator.share({ files: [file], title: 'My Disney History' });
          return;
        } catch (e) {
          // cancelled or failed — fall through to download
        }
      }

      try {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast('Saved 📖');
      } catch (e) {
        showToast('Couldn\'t save the image — try again.', { wrap: true, duration: 3200 });
      }
    }, 'image/png');
  } catch (e) {
    showToast('Something went wrong making that image — try again.', { wrap: true, duration: 3200 });
  }
}

function openBadgesModal() {
  const earnedPark = getEarnedParkBadges();
  const earnedCollection = getEarnedCollectionBadges();
  const earnedIds = new Set([...earnedPark, ...earnedCollection].map(b => b.id));
  const earnedById = {};
  [...earnedPark, ...earnedCollection].forEach(b => { earnedById[b.id] = b; });

  // Build the full park badge grid — every park × every tier, marking
  // which ones are earned vs. still locked. Scoped to rides only — food
  // and shows don't count toward these badges.
  const parkBadgeRows = PARKS.map(park => {
    const stats = Storage.getParkStatsForCategory(park.id, 'rides');
    const badgeIcon = park.emoji;
    const tierCells = PARK_BADGE_TIERS.map(tier => {
      const id = `park_${park.id}_${tier.id}`;
      const isEarned = earnedIds.has(id);
      const dateLine = isEarned ? formatBadgeDate(earnedById[id].earnedAt) : '';
      return `
        <button class="badge-cell${isEarned ? ' badge-cell-earned' : ''}" data-badge-id="${id}" ${isEarned ? '' : 'disabled'} title="${tier.label} — ${tier.threshold}% of rides">
          <span class="badge-cell-icon-wrap">
            <span class="badge-cell-emoji">${isEarned ? badgeIcon : '🔒'}</span>
            ${isEarned ? `<span class="badge-cell-ribbon">${tier.emoji}</span>` : ''}
          </span>
          <span class="badge-cell-label">${tier.label}</span>
          ${dateLine ? `<span class="badge-cell-date">${dateLine}</span>` : ''}
        </button>
      `;
    }).join('');
    return `
      <div class="badge-park-row">
        <div class="badge-park-row-header">
          <span class="badge-park-name">${park.emoji} ${park.shortName}</span>
          <span class="badge-park-pct">${stats.pct}% of rides</span>
        </div>
        <div class="badge-tier-row">${tierCells}</div>
      </div>
    `;
  }).join('');

  // Collection badges — only list collections that actually have items.
  // Tiered collections (e.g. Show Lover) render a row of tier cells like
  // the park badges; simple collections render a single earned/locked row.
  const collections = getAllCollections().filter(c => c.itemIds && c.itemIds.length > 0);
  const collectionBadgeRows = collections.map(col => {
    const tiers = TIERED_COLLECTION_CONFIG[col.id];
    const progress = Storage.getCollectionProgress(col.itemIds);

    if (tiers) {
      const tierCells = tiers.map(tier => {
        const id = `collection_${col.id}_${tier.id}`;
        const isEarned = earnedIds.has(id);
        const target = tier.count === null ? col.itemIds.length : tier.count;
        const dateLine = isEarned ? formatBadgeDate(earnedById[id].earnedAt) : '';
        return `
          <button class="badge-cell${isEarned ? ' badge-cell-earned' : ''}" data-badge-id="${id}" ${isEarned ? '' : 'disabled'} title="${tier.label} — ${target} shows">
            <span class="badge-cell-icon-wrap">
              <span class="badge-cell-emoji">${isEarned ? col.emoji : '🔒'}</span>
              ${isEarned ? `<span class="badge-cell-ribbon">${tier.emoji}</span>` : ''}
            </span>
            <span class="badge-cell-label">${tier.label}</span>
            ${dateLine ? `<span class="badge-cell-date">${dateLine}</span>` : ''}
          </button>
        `;
      }).join('');
      return `
        <div class="badge-park-row">
          <div class="badge-park-row-header">
            <span class="badge-park-name">${col.emoji} ${col.name}</span>
            <span class="badge-park-pct">${progress.doneCount} of ${col.itemIds.length} shows</span>
          </div>
          <div class="badge-tier-row">${tierCells}</div>
        </div>
      `;
    }

    const id = `collection_${col.id}`;
    const isEarned = earnedIds.has(id);
    const dateLine = isEarned ? formatBadgeDate(earnedById[id].earnedAt) : '';
    return `
      <button class="badge-collection-row${isEarned ? ' badge-cell-earned' : ''}" data-badge-id="${id}" ${isEarned ? '' : 'disabled'}>
        <span class="badge-cell-emoji">${isEarned ? col.emoji : '🔒'}</span>
        <span class="badge-collection-body">
          <span class="badge-collection-name">${col.name}</span>
          ${dateLine ? `<span class="badge-collection-date">Earned ${dateLine}</span>` : ''}
        </span>
        <span class="badge-collection-pct">${progress.pct}%</span>
      </button>
    `;
  }).join('');

  const totalEarned = earnedPark.length + earnedCollection.length;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>🏆 My Badges</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <p class="modal-subtitle">${totalEarned} badge${totalEarned !== 1 ? 's' : ''} earned so far. Park badges are based on rides only — keep riding to unlock more.</p>
      <div class="badge-section-heading">Park completion</div>
      <div class="badge-park-list">${parkBadgeRows}</div>
      ${collectionBadgeRows ? `
        <div class="badge-section-heading">Collections</div>
        <div class="badge-collection-list">${collectionBadgeRows}</div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  // Tapping an earned badge opens the share flow again — people often
  // want to revisit and re-share an old badge later.
  overlay.querySelectorAll('.badge-cell-earned').forEach(btn => {
    btn.addEventListener('click', () => {
      const badgeId = btn.dataset.badgeId;
      const allEarned = [...getEarnedParkBadges(), ...getEarnedCollectionBadges()];
      const badge = allEarned.find(b => b.id === badgeId);
      if (badge) shareBadgeImage(badge);
    });
  });
}

// ── Badge celebration — pops when a new badge is earned ────────────────────
function showBadgeCelebration(badges, index) {
  if (index >= badges.length) return;
  const badge = badges[index];

  const overlay = document.createElement('div');
  overlay.className = 'badge-celebration-overlay';

  const isPark = badge.type === 'park';
  const isCollectionTier = badge.type === 'collection-tier';
  const mainEmoji = isPark ? badge.badgeIcon : badge.collectionEmoji;
  const ribbonEmoji = (isPark || isCollectionTier) ? badge.tierEmoji : '';
  const title = isPark
    ? `${badge.tierLabel} — ${badge.parkName} Rides`
    : isCollectionTier
    ? `${badge.tierLabel} — ${badge.collectionName}`
    : 'Collection Complete!';
  const subtitle = isPark
    ? `${badge.pct}% of rides complete`
    : isCollectionTier
    ? (badge.tier === 'gold' ? 'Every permanent show, watched!' : `${badge.doneCount} of ${badge.targetCount} shows watched`)
    : badge.collectionName;
  const dateLine = formatBadgeDate(badge.earnedAt);

  overlay.innerHTML = `
    <div class="badge-celebration-card">
      <div class="badge-celebration-emoji-wrap">
        <span class="badge-celebration-emoji">${mainEmoji}</span>
        ${ribbonEmoji ? `<span class="badge-celebration-ribbon">${ribbonEmoji}</span>` : ''}
      </div>
      <div class="badge-celebration-title">${title}</div>
      <div class="badge-celebration-subtitle">${subtitle}</div>
      ${dateLine ? `<div class="badge-celebration-date">Earned ${dateLine}</div>` : ''}
      <div class="badge-celebration-btns">
        <button class="badge-celebration-share">📤 Share this badge</button>
        <button class="badge-celebration-dismiss">Keep going</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
    // Chain to the next badge celebration, if more than one was earned
    // in this same check-in.
    showBadgeCelebration(badges, index + 1);
  };

  overlay.querySelector('.badge-celebration-dismiss').addEventListener('click', close);
  overlay.querySelector('.badge-celebration-share').addEventListener('click', () => {
    shareBadgeImage(badge);
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}

// Draws a shareable, social-media-friendly square badge card and triggers
// either the native share sheet (if available) or a direct download.
async function shareBadgeImage(badge) {
  try {
    await drawAndDeliverBadgeImage(badge);
  } catch (e) {
    showToast('Something went wrong making that image — try again.', { wrap: true, duration: 3200 });
  }
}

async function drawAndDeliverBadgeImage(badge) {
  const isPark = badge.type === 'park';
  const isCollectionTier = badge.type === 'collection-tier';
  const mainEmoji = isPark ? badge.badgeIcon : badge.collectionEmoji;
  const ribbonEmoji = (isPark || isCollectionTier) ? badge.tierEmoji : '';
  const title = isPark
    ? `${badge.tierLabel} — ${badge.parkName} Rides`
    : isCollectionTier
    ? `${badge.tierLabel} — ${badge.collectionName}`
    : 'Collection Complete!';
  const subtitle = isPark
    ? `${badge.pct}% of rides complete`
    : isCollectionTier
    ? (badge.tier === 'gold' ? 'Every permanent show, watched!' : `${badge.doneCount} of ${badge.targetCount} shows watched`)
    : badge.collectionName;
  const dateLine = formatBadgeDate(badge.earnedAt);
  const accentColor = isPark
    ? (badge.tier === 'gold' ? '#c9942b' : badge.tier === 'silver' ? '#8a8f99' : '#a3653a')
    : isCollectionTier
    ? (badge.tier === 'gold' ? '#c9942b' : badge.tier === 'silver' ? '#8a8f99' : '#a3653a')
    : '#5b38b0';

  const SIZE = 1080; // square, Instagram/social-friendly

  // The whole card — including the emoji — is built as one self-contained
  // SVG with real text nodes, not drawn with canvas fillText(). Canvas's
  // own font fallback cannot reliably resolve emoji glyphs in every
  // browser/engine (confirmed: even explicit emoji font names came back
  // blank), so instead we let the browser's normal SVG text renderer —
  // which always has full emoji support — do the work, then rasterize
  // the finished SVG through a base64 data URI. Using a data URI (rather
  // than a Blob URL) avoids the canvas same-origin taint that broke
  // toBlob()/share/download in an earlier version of this function.
  const escapeXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a2620"/>
          <stop offset="100%" stop-color="#181511"/>
        </linearGradient>
      </defs>
      <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
      <circle cx="${SIZE / 2}" cy="380" r="200" fill="none" stroke="${accentColor}" stroke-width="6" stroke-linecap="round"/>
      <text x="${SIZE / 2}" y="390" font-size="200" text-anchor="middle" dominant-baseline="central">${mainEmoji}</text>
      ${ribbonEmoji ? `<text x="${SIZE / 2 + 165}" y="515" font-size="80" text-anchor="middle" dominant-baseline="central">${ribbonEmoji}</text>` : ''}
      <text x="${SIZE / 2}" y="650" font-size="58" font-weight="700" font-family="DM Sans, sans-serif" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${escapeXml(title)}</text>
      <text x="${SIZE / 2}" y="715" font-size="36" font-weight="600" font-family="DM Sans, sans-serif" fill="${accentColor}" text-anchor="middle" dominant-baseline="central">${escapeXml(subtitle)}</text>
      ${dateLine ? `<text x="${SIZE / 2}" y="770" font-size="28" font-family="DM Sans, sans-serif" fill="#c9c5bd" text-anchor="middle" dominant-baseline="central">Earned ${escapeXml(dateLine)}</text>` : ''}
      <text x="${SIZE / 2}" y="950" font-size="26" font-family="DM Sans, sans-serif" fill="#9e9b96" text-anchor="middle" dominant-baseline="central">🎢 Earned on Rope Drop</text>
      <text x="${SIZE / 2}" y="990" font-size="18" font-family="DM Sans, sans-serif" fill="#9e9b96" text-anchor="middle" dominant-baseline="central">Not affiliated with The Walt Disney Company</text>
    </svg>
  `.trim();

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  const dataUri = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgMarkup)));
  const img = new Image();
  img.width = SIZE;
  img.height = SIZE;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = dataUri;
  });

  ctx.drawImage(img, 0, 0, SIZE, SIZE);

  canvas.toBlob(async (blob) => {
    if (!blob) {
      showToast('Couldn\'t create the badge image — try again in a moment.', { wrap: true, duration: 3200 });
      return;
    }

    const fileName = isPark
      ? `rope-drop-badge-${badge.parkId}-${badge.tier}.png`
      : isCollectionTier
      ? `rope-drop-badge-${badge.collectionId}-${badge.tier}.png`
      : `rope-drop-badge-${badge.collectionId}.png`;
    const file = new File([blob], fileName, { type: 'image/png' });

    let canUseNativeShare = false;
    try {
      canUseNativeShare = !!(navigator.share && navigator.canShare && navigator.canShare({ files: [file] }));
    } catch (e) {
      canUseNativeShare = false;
    }

    if (canUseNativeShare) {
      try {
        await navigator.share({ files: [file], title: 'My Rope Drop Badge' });
        return;
      } catch (e) {
        // User cancelled the share sheet, or it failed — fall through to download
      }
    }

    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Badge image saved 🏆');
    } catch (e) {
      showToast('Couldn\'t save the image — try again.', { wrap: true, duration: 3200 });
    }
  }, 'image/png');
}

function openCollectionsModal() {
  collectionsDetailId = null;
  renderCollectionsOverlay();
}

function renderCollectionsOverlay() {
  // Tear down any existing collections overlay before rebuilding, so
  // re-renders (e.g. after adding an item) don't stack duplicates.
  const existing = document.querySelector('.collections-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay collections-overlay';

  if (collectionsDetailId) {
    overlay.innerHTML = renderCollectionDetailHtml(collectionsDetailId);
  } else {
    overlay.innerHTML = renderCollectionsListHtml();
  }

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  if (collectionsDetailId) {
    bindCollectionDetail(overlay, close);
  } else {
    bindCollectionsList(overlay, close);
  }
}

function getAllCollections() {
  const prebuilt = PREBUILT_COLLECTIONS.map(c => getValidatedCollection(c)).map(c => ({ ...c, isCustom: false }));
  const custom = Storage.listCustomCollections().map(c => ({ ...c, isCustom: true }));
  return [...prebuilt, ...custom];
}

function renderCollectionsListHtml() {
  const collections = getAllCollections();
  const rows = collections.map(col => {
    const progress = Storage.getCollectionProgress(col.itemIds);
    return `
      <button class="collection-row" data-id="${col.id}">
        <span class="collection-row-emoji">${col.emoji}</span>
        <span class="collection-row-body">
          <span class="collection-row-name">${col.name}${col.isCustom ? ' <span class="collection-custom-tag">custom</span>' : ''}</span>
          <span class="collection-row-sub">${progress.doneCount} of ${progress.total} done</span>
        </span>
        <span class="collection-row-pct" style="color: ${progress.pct === 100 ? '#0f6e56' : 'inherit'}">${progress.pct === 100 ? '✅' : progress.pct + '%'}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="modal-card">
      <div class="modal-header">
        <h3>📦 Collections</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <p class="modal-subtitle">Track themed sets of attractions across every park — and see exactly what's left.</p>
      <div class="collection-list">${rows}</div>
      <button class="new-collection-btn">+ Create a custom collection</button>
    </div>
  `;
}

function bindCollectionsList(overlay, close) {
  overlay.querySelectorAll('.collection-row').forEach(btn => {
    btn.addEventListener('click', () => {
      collectionsDetailId = btn.dataset.id;
      renderCollectionsOverlay();
    });
  });
  overlay.querySelector('.new-collection-btn').addEventListener('click', () => {
    const name = prompt('Name your collection (e.g. "My Top 5 Coasters")', '');
    if (name === null) return;
    const emoji = prompt('Pick an emoji for it (optional)', '⭐') || '⭐';
    const id = Storage.createCustomCollection(name.trim() || 'My Collection', emoji.trim().slice(0, 4));
    collectionsDetailId = id;
    renderCollectionsOverlay();
  });
}

function renderCollectionDetailHtml(collectionId) {
  const collections = getAllCollections();
  const col = collections.find(c => c.id === collectionId);
  if (!col) {
    collectionsDetailId = null;
    return renderCollectionsListHtml();
  }
  const progress = Storage.getCollectionProgress(col.itemIds);

  const remainingHtml = progress.remainingItems.length > 0 ? `
    <div class="collection-section-heading">Only ${progress.remainingItems.length} left</div>
    <div class="collection-item-list">
      ${progress.remainingItems.map(item => `
        <div class="collection-item-row">
          <span class="collection-checkbox">□</span>
          <span class="collection-item-name">${item.name}</span>
        </div>
      `).join('')}
    </div>
  ` : `<div class="collection-complete-banner">🎉 You've completed this whole collection!</div>`;

  const doneHtml = progress.doneItems.length > 0 ? `
    <div class="collection-section-heading">Already done</div>
    <div class="collection-item-list">
      ${progress.doneItems.map(item => `
        <div class="collection-item-row collection-item-done">
          <span class="collection-checkbox">✅</span>
          <span class="collection-item-name">${item.name}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

  const customManageHtml = col.isCustom ? `
    <div class="collection-section-heading">Add or remove rides</div>
    <p class="collection-manage-hint">Tap any ride below to add or remove it from this collection.</p>
    <select class="collection-add-select">
      <option value="">+ Add a ride, show, or food spot…</option>
      ${PARKS.flatMap(park => park.sections.flatMap(s => s.items)).filter(item => !col.itemIds.includes(item.id)).map(item => `<option value="${item.id}">${item.name}</option>`).join('')}
    </select>
    <button class="collection-delete-btn">🗑 Delete this collection</button>
  ` : '';

  return `
    <div class="modal-card">
      <div class="modal-header">
        <h3>${col.emoji} ${col.name}</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <button class="collection-back-btn">← All collections</button>
      <p class="collection-progress-line">You've completed <strong>${progress.pct}%</strong> of ${col.name}.</p>
      <div class="collection-progress-bar-track">
        <div class="collection-progress-bar-fill" style="width: ${progress.pct}%;"></div>
      </div>
      ${remainingHtml}
      ${doneHtml}
      ${customManageHtml}
    </div>
  `;
}

function bindCollectionDetail(overlay, close) {
  overlay.querySelector('.collection-back-btn').addEventListener('click', () => {
    collectionsDetailId = null;
    renderCollectionsOverlay();
  });

  const addSelect = overlay.querySelector('.collection-add-select');
  if (addSelect) {
    addSelect.addEventListener('change', (e) => {
      const itemId = e.target.value;
      if (!itemId) return;
      Storage.toggleItemInCustomCollection(collectionsDetailId, itemId);
      renderCollectionsOverlay();
    });
  }

  const deleteBtn = overlay.querySelector('.collection-delete-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (!confirm('Delete this collection? This cannot be undone.')) return;
      Storage.deleteCustomCollection(collectionsDetailId);
      collectionsDetailId = null;
      renderCollectionsOverlay();
    });
  }
}

function openAllTimeStatsModal() {
  const stats = Storage.getAllTimeStats();

  const CAT_LABELS = { rides: '🎢 Rides', show: '🎭 Shows', food: '🍽️ Food', character: '👋 Meets' };
  const BADGE_EMOJI = { thrill: '🎢', family: '🎢', show: '🎭', character: '👋', food: '🍽️' };

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card alltime-card">
      <div class="modal-header">
        <h3>🏆 All-Time Stats</h3>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <p class="modal-subtitle">Across ${stats.totalTrips} trip${stats.totalTrips !== 1 ? 's' : ''} — every ride, show, and bite ever checked off.</p>

      <div class="alltime-tabs">
        <button class="alltime-tab${allTimeView === 'alltime' ? ' active' : ''}" data-view="alltime">All-Time</button>
        <button class="alltime-tab${allTimeView === 'byyear' ? ' active' : ''}" data-view="byyear">By Year</button>
      </div>

      <div id="alltime-content"></div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  overlay.querySelectorAll('.alltime-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      allTimeView = btn.dataset.view;
      overlay.querySelectorAll('.alltime-tab').forEach(b => b.classList.toggle('active', b === btn));
      renderAllTimeContent(overlay, stats);
    });
  });

  renderAllTimeContent(overlay, stats);

  // Renders one full stats bundle (grandTotals, mostRidden, favoriteSongs,
  // allItemsRanked) as HTML — shared by both the All-Time tab and each
  // year block in the By Year tab, so they show identical detail.
  function renderStatsBundleHtml(bundle, totalLabel) {
    const tallyChips = Object.entries(bundle.grandTotals)
      .filter(([key, count]) => key !== 'total' && count > 0)
      .map(([cat, count]) => `<div class="tally-chip"><span class="tally-num">${count}</span><span class="tally-label">${CAT_LABELS[cat]}</span></div>`)
      .join('');

    const songSections = Object.entries(bundle.songBreakdown || {}).map(([itemId, songList]) => {
      const item = bundle.allItemsRanked.find(r => r.item.id === itemId)?.item;
      if (!item) return '';
      const totalPlays = songList.reduce((sum, s) => sum + s.count, 0);
      const rows = songList.map((s, i) => `
        <div class="song-breakdown-row${i === 0 ? ' song-breakdown-top' : ''}">
          <span class="song-breakdown-rank">${i === 0 ? '🏆' : i + 1}</span>
          <span class="song-breakdown-name">${s.song}</span>
          <span class="song-breakdown-count">${s.count}×</span>
        </div>
      `).join('');
      return `
        <div class="song-breakdown-block">
          <div class="song-breakdown-heading">${item.name} <span class="song-breakdown-total">(${totalPlays} ride${totalPlays !== 1 ? 's' : ''} with a song logged)</span></div>
          ${rows}
        </div>
      `;
    }).join('');

    const rankedRows = bundle.allItemsRanked.map((r, i) => `
      <div class="alltime-rank-row">
        <span class="rank-num">${i + 1}</span>
        <span class="rank-emoji">${BADGE_EMOJI[r.item.badge] || '•'}</span>
        <span class="rank-name">${r.item.name}</span>
        <span class="rank-count">${r.totalTimes}×</span>
      </div>
    `).join('');

    return `
      <div class="alltime-total">
        <span class="alltime-total-num">${bundle.grandTotals.total}</span>
        <span class="alltime-total-label">${totalLabel}</span>
      </div>
      <div class="tally-chips">${tallyChips}</div>
      ${bundle.mostRidden ? `
        <div class="alltime-highlight">⭐ Most done: <strong>${bundle.mostRidden.item.name}</strong> — ${bundle.mostRidden.totalTimes}×</div>
      ` : ''}
      ${songSections ? `
        <div class="alltime-section-heading">Songs heard, all-time</div>
        ${songSections}
      ` : ''}
      ${rankedRows ? `
        <div class="alltime-section-heading">Everything, ranked</div>
        <div class="alltime-rank-list">${rankedRows}</div>
      ` : `<p class="alltime-empty">Nothing logged yet — check a few things off on a trip!</p>`}
    `;
  }

  function renderAllTimeContent(overlay, stats) {
    const container = overlay.querySelector('#alltime-content');

    if (allTimeView === 'alltime') {
      container.innerHTML = renderStatsBundleHtml(stats, 'total activities, all-time');
    } else {
      const years = Object.keys(stats.perYear).sort((a, b) => b - a);
      if (years.length === 0) {
        container.innerHTML = `<p class="alltime-empty">Nothing logged yet — check a few things off on a trip!</p>`;
        return;
      }
      container.innerHTML = years.map(year => `
        <div class="alltime-year-block">
          <div class="alltime-year-heading">${year}</div>
          ${renderStatsBundleHtml(stats.perYear[year], 'activities')}
        </div>
      `).join('');
    }
  }
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
            <button class="trip-export" data-id="${trip.id}" aria-label="Send this trip to another device" title="Send to another device">⬆</button>
            <button class="trip-date-btn" data-id="${trip.id}" aria-label="Edit trip date" title="Edit trip date">📅</button>
            <button class="trip-rename" data-id="${trip.id}" aria-label="Rename trip" title="Rename">✎</button>
            ${trips.length > 1 ? `<button class="trip-delete" data-id="${trip.id}" aria-label="Delete trip" title="Delete">🗑</button>` : ''}
          </div>
        `).join('')}
      </div>
      <button class="new-trip-btn">+ Start a new trip</button>
      <button class="collections-btn">📦 Collections</button>
      <button class="badges-btn">🏆 My Badges</button>
      <button class="history-btn">📖 My Disney History</button>

      <div class="recap-section">
        <div class="recap-section-heading">Share a recap of your current trip</div>
        <div class="recap-btn-row">
          <button class="recap-image-btn">📸 Save as image</button>
          <button class="recap-pdf-btn">📄 Save as PDF</button>
        </div>
      </div>

      <div class="recap-section">
        <div class="recap-section-heading">Master list — every trip, combined</div>
        <p class="trip-io-hint">A grand tally of how many times you've done each ride, show, and food spot across all your trips ever.</p>
        <div class="recap-btn-row">
          <button class="master-pdf-btn">📄 Save master list as PDF</button>
        </div>
      </div>

      <div class="recap-section">
        <div class="recap-section-heading">Move trips between devices</div>
        <p class="trip-io-hint">For example: import or export your trip from another device to have all trips stored on one device.</p>
        <div class="trip-io-row">
          <button class="trip-export-all-btn">Send all my trips</button>
          <button class="trip-import-btn">Add trips from a file</button>
        </div>
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

  overlay.querySelectorAll('.trip-date-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trips = Storage.listTrips();
      const trip = trips.find(t => t.id === btn.dataset.id);
      const currentDate = trip ? new Date(trip.createdAt) : new Date();
      const defaultValue = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD
      const input = prompt(
        `What date was this trip? (YYYY-MM-DD)\nUseful if you're logging a trip from memory — this controls which year it shows up under in your stats.`,
        defaultValue
      );
      if (input === null) return; // cancelled
      const success = Storage.setTripDate(btn.dataset.id, input.trim());
      if (success) {
        showToast('Trip date updated 📅');
        close(false);
        openTripsModal();
      } else {
        showToast('That doesn\'t look like a valid date — try YYYY-MM-DD.', { wrap: true, duration: 3000 });
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

  overlay.querySelector('.collections-btn').addEventListener('click', () => {
    close(false);
    openCollectionsModal();
  });

  overlay.querySelector('.badges-btn').addEventListener('click', () => {
    close(false);
    openBadgesModal();
  });

  overlay.querySelector('.history-btn').addEventListener('click', () => {
    close(false);
    openDisneyHistoryModal();
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

  overlay.querySelector('.master-pdf-btn').addEventListener('click', () => {
    exportMasterListPDF();
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
  const FOOTER_H = 70;

  const parkCardHeights = summary.parkSummaries.map(ps => {
    const lines = ps.timeline.length || 1;
    const dateHeaderCount = ps.timeline.filter(e => e.isNewDay).length;
    const songLines = (ps.checkedItems || [])
      .filter(item => item.songBreakdown && item.songBreakdown.length > 0)
      .reduce((sum, item) => sum + 1 + item.songBreakdown.length, 0); // +1 for each song section heading
    return PARK_CARD_BASE_H + lines * LINE_H + dateHeaderCount * LINE_H + (songLines > 0 ? songLines * LINE_H + 16 : 0) + 20;
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

    // Chronological timeline with timestamps — show every entry, no cap.
    // A date header is inserted whenever the day changes, so multi-day
    // trips or park-hopping between parks on the same day stays clear.
    ctx.font = '400 13px "DM Sans", sans-serif';
    let lineY = cardY + 100;
    ps.timeline.forEach((entry) => {
      if (entry.isNewDay) {
        ctx.font = '700 12px "DM Sans", sans-serif';
        ctx.fillStyle = '#b8761f';
        ctx.fillText(entry.dateLabel.toUpperCase(), CARD_PADDING + 4, lineY);
        lineY += LINE_H;
        ctx.font = '400 13px "DM Sans", sans-serif';
      }
      ctx.fillStyle = '#9e9b96';
      ctx.fillText(entry.timeLabel, CARD_PADDING + 4, lineY);
      const timeW = ctx.measureText(entry.timeLabel + '  ').width;
      ctx.fillStyle = '#3a3630';
      let nameLabel = entry.name + (entry.isExtra ? ' (again)' : '');
      if (nameLabel.length > 60) nameLabel = nameLabel.slice(0, 57) + '…';
      ctx.fillText(nameLabel, CARD_PADDING + 4 + timeW, lineY);
      lineY += LINE_H;
    });

    // Song breakdowns (e.g. Cosmic Rewind) — listed under the timeline,
    // most-heard song first, for any ride with a song picker this trip.
    let songY = lineY + 16;
    (ps.checkedItems || []).forEach(item => {
      if (!item.songBreakdown || item.songBreakdown.length === 0) return;
      ctx.font = '600 13px "DM Sans", sans-serif';
      ctx.fillStyle = '#3a3630';
      ctx.fillText(`🎵 ${item.name} — songs heard`, CARD_PADDING + 4, songY);
      songY += LINE_H;
      ctx.font = '400 13px "DM Sans", sans-serif';
      item.songBreakdown.forEach((s, idx) => {
        ctx.fillStyle = idx === 0 ? '#b8761f' : '#6b6760';
        ctx.fillText(`${idx === 0 ? '🏆' : '•'} ${s.song} — ${s.count}×`, CARD_PADDING + 16, songY);
        songY += LINE_H;
      });
    });

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
    doc.text(ps.park.name, margin, y);
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
    doc.text(ps.park.name, margin, y);
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

    const spansMultipleDays = ps.timeline.filter(e => e.isNewDay).length > 1;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 28, 24);
    doc.text(spansMultipleDays ? 'Timeline' : 'Timeline of the day', margin, y);
    y += 20;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    ps.timeline.forEach(entry => {
      if (y > pageH - margin) {
        doc.addPage();
        y = margin;
      }
      if (entry.isNewDay) {
        if (y > pageH - margin) { doc.addPage(); y = margin; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(184, 118, 31);
        doc.text(entry.dateLabel.toUpperCase(), margin, y);
        y += 18;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
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

    // Song breakdowns (e.g. Cosmic Rewind) — listed after the timeline,
    // most-heard song first, for any ride with a song picker this trip.
    const itemsWithSongs = (ps.checkedItems || []).filter(item => item.songBreakdown && item.songBreakdown.length > 0);
    if (itemsWithSongs.length > 0) {
      y += 16;
      if (y > pageH - margin - 40) { doc.addPage(); y = margin; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 28, 24);
      doc.text('Songs heard', margin, y);
      y += 20;

      itemsWithSongs.forEach(item => {
        if (y > pageH - margin - 20) { doc.addPage(); y = margin; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        doc.text(item.name, margin, y);
        y += 18;

        item.songBreakdown.forEach((s, idx) => {
          if (y > pageH - margin) { doc.addPage(); y = margin; }
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          doc.setTextColor(idx === 0 ? 184 : 100, idx === 0 ? 118 : 100, idx === 0 ? 31 : 100);
          doc.text(`${idx === 0 ? '★' : '-'} ${s.song} — ${s.count}×`, margin + 14, y);
          y += 16;
        });
        y += 6;
      });
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

// ── Master list PDF — grand tally across every trip ever logged ────────────
function exportMasterListPDF() {
  const stats = Storage.getAllTimeStats();
  if (stats.grandTotals.total === 0) {
    showToast('Nothing logged yet across any trip — check a few things off first!', { wrap: true, duration: 3400 });
    return;
  }
  if (typeof window.jspdf === 'undefined') {
    showToast('PDF export isn\'t available right now — try again in a moment.', { wrap: true, duration: 3400 });
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 50;
  let y = margin;

  const CAT_LABELS = { rides: 'Rides', show: 'Shows', food: 'Food & drink', character: 'Character meets' };
  const BADGE_LABEL = { thrill: 'Ride', family: 'Ride', show: 'Show', character: 'Meet', food: 'Food' };

  // ── Overview ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(120, 120, 120);
  doc.text('ROPE DROP MASTER LIST', margin, y);
  y += 28;

  doc.setFont('times', 'normal');
  doc.setFontSize(28);
  doc.setTextColor(30, 28, 24);
  doc.text('Every Trip, Combined', margin, y);
  y += 40;

  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Across ${stats.totalTrips} trip${stats.totalTrips !== 1 ? 's' : ''}`, margin, y);
  y += 30;

  doc.setFontSize(48);
  doc.setTextColor(224, 146, 42);
  doc.text(String(stats.grandTotals.total), margin, y);
  const totalNumWidth = doc.getTextWidth(String(stats.grandTotals.total));
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(100, 100, 100);
  doc.text('total activities, all-time', margin + totalNumWidth + 14, y - 6);
  y += 36;

  const catLine = Object.entries(stats.grandTotals)
    .filter(([k, c]) => k !== 'total' && c > 0)
    .map(([cat, c]) => `${CAT_LABELS[cat]}: ${c}`)
    .join('    ·    ');
  doc.setFontSize(12);
  doc.setTextColor(70, 70, 70);
  doc.text(catLine, margin, y);
  y += 30;

  if (stats.mostRidden) {
    doc.setFillColor(251, 238, 226);
    doc.rect(margin - 10, y - 16, pageW - margin * 2 + 20, 30, 'F');
    doc.setTextColor(184, 118, 31);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Most done overall: ${stats.mostRidden.item.name} — ${stats.mostRidden.totalTimes}×`, margin, y + 4);
    y += 46;
  }

  // ── Songs heard, all-time (if any) ──
  const songEntries = Object.entries(stats.songBreakdown || {});
  if (songEntries.length > 0) {
    doc.setDrawColor(225, 225, 225);
    doc.line(margin, y, pageW - margin, y);
    y += 26;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(30, 28, 24);
    doc.text('Songs heard, all-time', margin, y);
    y += 22;

    songEntries.forEach(([itemId, songList]) => {
      const item = stats.allItemsRanked.find(r => r.item.id === itemId)?.item;
      if (!item) return;
      if (y > pageH - margin - 20) { doc.addPage(); y = margin; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      doc.text(item.name, margin, y);
      y += 18;
      songList.forEach((s, idx) => {
        if (y > pageH - margin) { doc.addPage(); y = margin; }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(idx === 0 ? 184 : 100, idx === 0 ? 118 : 100, idx === 0 ? 31 : 100);
        doc.text(`${idx === 0 ? '★' : '-'} ${s.song} — ${s.count}×`, margin + 14, y);
        y += 16;
      });
      y += 8;
    });
    y += 10;
  }

  // ── Full ranked list — every item ever done, grouped by category ──
  if (y > pageH - margin - 60) { doc.addPage(); y = margin; }
  doc.setDrawColor(225, 225, 225);
  doc.line(margin, y, pageW - margin, y);
  y += 26;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 28, 24);
  doc.text('Grand tally — everything, ranked', margin, y);
  y += 24;

  stats.allItemsRanked.forEach((entry, idx) => {
    if (y > pageH - margin) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(150, 150, 150);
    doc.text(String(idx + 1), margin, y);
    doc.setTextColor(40, 40, 40);
    doc.text(entry.item.name, margin + 28, y);
    doc.setTextColor(130, 130, 130);
    doc.text(BADGE_LABEL[entry.item.badge] || '', pageW - margin - 130, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 28, 24);
    doc.text(`${entry.totalTimes}×`, pageW - margin - 40, y);
    y += 18;
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

  doc.save('rope-drop-master-list.pdf');
  showToast('Master list saved 📄');
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
    showToast('★ Tap the star on any ride, show, or food spot to add it to your must-dos', { wrap: true, duration: 4200 });
  }, 600);
}
