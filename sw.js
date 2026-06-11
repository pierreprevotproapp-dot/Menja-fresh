// Menja Fresh — Service Worker v6
// Offline-first shell, background sync queue, push notifications

const CACHE_NAME = 'menja-v6';
const SHELL = [
  '/',
  '/index.html',
  '/app.html',
  '/manifest.json',
  '/supabase-client.js',
];

// ── Install: pre-cache the app shell ─────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

// ── Activate: remove old caches, claim clients immediately ───────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: network-first with offline fallback ────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Supabase API — always network, return empty JSON if offline
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response('{}', { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // Google Fonts — cache-first (they rarely change)
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => cached ||
        fetch(event.request).then(resp => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resp.clone()));
          return resp;
        })
      )
    );
    return;
  }

  // Same-origin — network-first, cache as fallback
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          if (resp.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, resp.clone()));
          }
          return resp;
        })
        .catch(() => caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Offline fallback for navigation requests → serve app shell
          if (event.request.mode === 'navigate') {
            return caches.match('/app.html');
          }
          return new Response('Offline', { status: 503 });
        }))
    );
  }
});

// ── Push Notifications ────────────────────────────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Menja Fresh';
  const options = {
    body: data.body || "It's dinner planning time!",
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data.url || '/app.html',
    vibrate: [100, 50, 100],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data || '/app.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes('menja') && 'focus' in c);
      if (existing) return existing.focus();
      return clients.openWindow(target);
    })
  );
});

// ── Background Sync ───────────────────────────────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-meal-plan') {
    event.waitUntil(syncMealPlan());
  }
});

async function syncMealPlan() {
  // Reads queued changes from IndexedDB and retries Supabase writes when back online.
  // The app queues changes under the key 'menja-sync-queue' in indexedDB 'menja-offline'.
  try {
    const db = await openSyncDB();
    const queue = await getAllFromStore(db, 'sync-queue');
    for (const item of queue) {
      await fetch(item.url, {
        method: item.method,
        headers: { 'Content-Type': 'application/json', ...item.headers },
        body: JSON.stringify(item.body),
      });
      await deleteFromStore(db, 'sync-queue', item.id);
    }
  } catch (e) {
    // Will retry on next sync event
  }
}

function openSyncDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('menja-offline', 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore('sync-queue', { keyPath: 'id', autoIncrement: true });
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

function getAllFromStore(db, store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

function deleteFromStore(db, store, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(id);
    req.onsuccess = () => resolve();
    req.onerror = e => reject(e.target.error);
  });
}
