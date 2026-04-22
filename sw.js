const CACHE_NAME = 'hackathon-gate-v2';
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
    
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        }).catch(() => {
            return caches.match('./index.html');
        })
    );
});
