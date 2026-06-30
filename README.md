# Rope Drop 🎢

> Your personal Disney park day checklist.

A clean, mobile-first web app for tracking rides, shows, food, and character meets across all major Disney parks. Built to test before moving to iOS.

## Parks covered

- Magic Kingdom (WDW)
- Hollywood Studios (WDW)
- EPCOT (WDW)
- Animal Kingdom (WDW)
- Disneyland (Disneyland Resort)

## Features

- Check off attractions as you go
- Per-park progress tracking
- Notes field per park (rope drop strategy, Lightning Lane plans, etc.)
- Dark mode support
- Works offline after first load
- Mobile-optimized (feels like a native app)

## Deploy to Vercel

### Option A — GitHub import (recommended)

1. Push this folder to a new GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework preset: **Other** (no build step needed)
5. Root directory: leave as `/`
6. Deploy — done ✓

### Option B — Vercel CLI

```bash
npm i -g vercel
cd rope-drop
vercel
```

## Tech stack

- Vanilla HTML/CSS/JS — no build step, no dependencies
- Google Fonts (DM Sans + DM Serif Display)
- localStorage for persistence

## Supabase upgrade path

When ready to sync across devices, swap the `Storage` object in `js/storage.js`:

1. Create a Supabase project
2. Add a `checks` table: `user_id uuid, item_id text, checked bool`
3. Add a `notes` table: `user_id uuid, park_id text, content text`
4. Replace `getChecked/setChecked` with Supabase reads/writes
5. Add anonymous auth with `supabase.auth.signInAnonymously()`

The rest of the app doesn't need to change.

## Adding attractions

Edit `js/data.js`. Each item takes:

```js
{
  id: 'unique-id',        // must be unique across all parks
  name: 'Attraction name',
  meta: 'Location · height requirement or note',
  badge: 'thrill',        // thrill | family | show | food | character
  must: true,             // optional — shows ★ and warm accent
}
```

## Legal

Not affiliated with or endorsed by The Walt Disney Company.

## Local photo memories beta

This build adds a local-only photo beta:

- 20 test photos total across the app
- Photos attach to completed timeline entries
- Completed checklist rows show a photo button
- Today's Log shows add/view photo controls
- My Trips includes Trip Memories and a trip cover photo
- Images are compressed in-browser to 1920px on the long edge with thumbnails
- Photos are stored in IndexedDB on the user's device/browser only

These photos do not sync between devices and are not uploaded to Vercel or Supabase.

## Latest update — Lifetime Badges

This build adds a **Lifetime** tab to **My Badges**. Trip badges still track the active trip only, while Lifetime Badges calculate progress across every saved trip so users can complete parks and collections over multiple visits.
