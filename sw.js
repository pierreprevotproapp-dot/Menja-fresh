// Menja Fresh — self-destroying service worker (kill switch).
//
// EMERGENCY FIX: a caching service worker was serving a blank/stale shell to
// returning visitors (white screen on both the landing page and the app, on
// desktop and phone). The server itself is healthy — this evicts the broken
// worker from every device.
//
// On the next visit, the browser fetches this file (served with max-age=0),
// installs it, and on activate it: clears ALL caches, unregisters itself, and
// reloads open tabs — so every visitor lands on the live CDN build with no
// service worker left behind. Nothing registers a service worker anymore.
//
// NOTE: offline/push/background-sync (previous sw.js v6) are intentionally
// disabled by this. Re-introduce them later with a proper update flow that
// does NOT cache HTML cache-first, so this white-screen cannot recur.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {}
    try {
      await self.registration.unregister();
    } catch (e) {}
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => { try { c.navigate(c.url); } catch (e) {} });
    } catch (e) {}
  })());
});
