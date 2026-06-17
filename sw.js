// EVP Rajeshwari CRM - Service Worker
// Cache version - increment this when you update the app
var CACHE = 'evp-crm-v3';
var ASSETS = [
  './index.html',
  './app.css',
  './app.js',
  'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js'
];

// Install: cache all assets
self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS).catch(function(err) {
        console.log('Cache install error (non-fatal):', err);
      });
    })
  );
});

// Activate: clear old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// Fetch: stale-while-revalidate strategy
// Serve from cache instantly, update cache from network in background
self.addEventListener('fetch', function(e) {
  // Skip non-GET and cross-origin Firebase data requests
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('firebasedatabase.app')) return;
  if (e.request.url.includes('firebase.googleapis.com')) return;

  e.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(e.request).then(function(cached) {
        var networkFetch = fetch(e.request).then(function(response) {
          if (response && response.status === 200) {
            cache.put(e.request, response.clone());
          }
          return response;
        }).catch(function() { return cached; });
        // Return cached version immediately, update in background
        return cached || networkFetch;
      });
    })
  );
});
