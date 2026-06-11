// Menja Fresh — self-destroying service worker (kill switch).
//
// A previous version of this file cached the app shell ("/", "/index.html",
// "/supabase-client.js"). Once installed, that worker could keep serving a
// STALE build to returning visitors even after a fresh deploy.
//
// Nothing in the site registers a service worker anymore. This file exists only
// to EVICT the old worker from browsers that still have it installed:
//   • install  -> activate immediately (skipWaiting)
//   • activate -> delete ALL caches, unregister itself, reload open tabs
//
// Result: every returning visitor is purged once and then loads the live site
// directly from the CDN, with no service worker left behind.

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
