---
sidebar_position: 24
title: Install as an App (PWA)
description: Install tududi on your phone or desktop and keep working when the network drops.
---
# Install as an App (PWA)

tududi is an installable Progressive Web App. You can add it to your home screen on Android, iOS, and desktop and use it like a native app. When the network is unavailable the app stays readable from cache, and anything you change is queued and replayed automatically once connectivity returns.

---
## Installing

| Browser | Install method |
|---------|---------------|
| Chrome / Edge (Android, desktop) | Address bar install icon, or `⋮ → Install app` |
| Safari (iOS 16.4+) | Share sheet → Add to Home Screen |
| Firefox (Android) | `⋮ → Install` |

**HTTPS is required** in production for the install prompt to appear. `localhost` is exempt, so development works without a certificate. If you are running tududi behind a reverse proxy, see [Configuration](/getting-started/configuration) for TLS and proxy settings.

### Verifying installability

In Chrome DevTools:

1. **Application → Manifest** — no errors should appear
2. **Application → Service Workers** — status should read "activated and running"
3. **Lighthouse → PWA** — the installability check should pass

---
## Offline Behavior

### What works offline

- **Reading** — pages you have already visited load from cache
- **Writing** — creating and editing tasks, projects, and notes is accepted and queued

When you make a change offline, tududi accepts it locally and stores it in a queue. As soon as the connection returns, the queue is replayed against the server in order and the app refreshes its data.

### How caching works

| Request type | Behavior |
|---|---|
| Static assets (JS, CSS, fonts, icons) | Cache-first — served instantly, populated on first load |
| API reads | Network-first — fresh data when online, stale cache when offline |
| API writes | Sent immediately when online; queued when offline |
| Page navigation | Network-first, falling back to the cached app shell |

If you request something you have never loaded and you are offline, tududi reports that it is offline rather than showing an error page.

### Session safety on shared devices

Because the app caches data on the device, tududi takes specific steps so one user's data cannot leak to another:

- Logging out clears the cached API data and discards any queued changes.
- Authentication headers are **never** written to the offline queue — they cannot be persisted or replayed.
- Every queued change is tagged with the user who made it. If a different user is signed in when the queue replays, those entries are discarded instead of executed.
- An expired session anywhere in the app clears the cache and returns you to the login screen.

---
## Known Limitations

| Limitation | Detail |
|-----------|--------|
| Sub-path deployments | The web app manifest itself always declares the app at the site root, so the install prompt specifically will not appear when running under a sub-path. The app otherwise works under a sub-path if you build the frontend with `TUDUDI_BASE_PATH` set — see [Configuration](/getting-started/configuration#frontend-build-time-flags) — and Home Assistant Ingress paths are auto-detected without any configuration |
| Offline task creation | A task created offline has no server ID until it syncs. If you create a task and then edit it in the same offline session, the follow-up edit may fail on replay |
| No conflict resolution | If the server changed while you were offline, replayed changes apply on top of the new state without merging — last writer wins |
| iOS background sync | iOS does not support the Background Sync API. Queued changes replay the next time you open the app while online, rather than in the background |

---
## For Developers

### Where things live

| Piece | File |
|-------|------|
| Web app manifest | `public/manifest.json` |
| Service worker | `public/sw.js` (plain JS, copied to `dist/` on production build) |
| Registration | `frontend/index.tsx` (production only) |
| SW messaging helpers | `frontend/utils/swUtils.ts` |

### Development mode

The service worker is **not registered** when `NODE_ENV` is not `production`. On startup in development, tududi actively unregisters any existing service workers and clears all caches, so stale responses never interfere with live development.

### Adding new API endpoints

No service worker changes are needed. Strategy is applied by path prefix: `GET /api/*` is cached automatically, and mutations are queued automatically when offline.

If an endpoint should **not** be cached — one that returns one-time tokens or download URLs, for example — add its path prefix to a blocklist in `handleApiGet`:

```javascript
const NO_CACHE_PATHS = ['/api/auth/token', '/api/downloads/'];

async function handleApiGet(request) {
    const url = new URL(request.url);
    if (NO_CACHE_PATHS.some((p) => url.pathname.startsWith(p))) {
        return fetch(request); // network only, no cache
    }
    // ... rest of handler
}
```

### Cache versioning

When making a breaking change to the static asset structure, bump `CACHE_VERSION` at the top of `public/sw.js`:

```javascript
const CACHE_VERSION = 'tududi-v2'; // was tududi-v1
```

The `activate` event deletes every cache that does not match the current `CACHE_VERSION` or `API_CACHE`. If the API response format changes significantly, bump `API_CACHE` too.

### Icon requirements

The manifest declares `purpose: "any"` and `purpose: "maskable"` as **two separate entries**. Combining them into a single `"any maskable"` entry is a spec violation and breaks Android adaptive icons.

---
## Related Documentation

- [Quick Start](/getting-started/quick-start) - Getting tududi running
- [Configuration](/getting-started/configuration) - HTTPS, reverse proxy, and cookie settings
- [Telegram Integration](telegram-integration.md) - Another way to capture on the go
