const cacheName = 'rps';
const appFiles = [
    './',
    './index.html',
    './index.js',
    './main.css',
    './favicon/android-chrome-192x192.png',
    './favicon/android-chrome-512x512.png',
    './favicon/apple-touch-icon.png',
    './favicon/favicon-16x16.png',
    './favicon/favicon-32x32.png',
    './favicon/favicon.ico'
];

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(appFiles);
    })());
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});