const CACHE_NAME = 'hackathon-gate-v7';
const ASSETS = [
    './',
    './index.html',
    './app.js',
    './logo.jpg',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    // Only intercept local navigation/asset requests, not Firebase API requests
    if (!e.request.url.startsWith(self.location.origin)) return;
    
    // Network-first strategy: always try to fetch fresh content,
    // fall back to cache only when offline
    e.respondWith(
        fetch(e.request).then((response) => {
            // Cache the fresh response for offline use
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(e.request, responseClone);
            });
            return response;
        }).catch(() => {
            return caches.match(e.request).then((response) => {
                return response || caches.match('./index.html');
            });
        })
    );
});
