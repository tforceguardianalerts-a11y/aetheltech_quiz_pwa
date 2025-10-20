// sw.js - Service Worker

const CACHE_NAME = 'aetheltech-quiz-cache-v1'; // Change version if you update assets
// --- UPDATED PATHS for GitHub Pages subfolder ---
const urlsToCache = [
    '/aetheltech_quiz_pwa/', // Explicit path for the root directory index
    '/aetheltech_quiz_pwa/index.html',
    '/aetheltech_quiz_pwa/style.css',
    '/aetheltech_quiz_pwa/script.js',
    '/aetheltech_quiz_pwa/quiz-data.js',
    '/aetheltech_quiz_pwa/manifest.json',
    '/aetheltech_quiz_pwa/icon-192.png',
    '/aetheltech_quiz_pwa/icon-512.png'
    // Add other assets like fonts or important images if you add them later
];

// --- Installation ---
// Cache core assets when the service worker is installed
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching app shell');
                // Use fetch with Request objects to ensure correct mode/credentials
                const requests = urlsToCache.map(url => new Request(url, { cache: 'reload' }));
                return cache.addAll(requests); // Use requests array
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch(error => {
                console.error('Service Worker: Caching failed', error);
                // Log which URLs might have failed if possible (addAll rejects on first failure)
                console.error('Failed to cache resources. Check network and file paths:', urlsToCache);
            })
    );
});

// --- Activation ---
// Clean up old caches when the service worker is activated
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activation complete');
            return self.clients.claim(); // Take control of pages immediately
        })
    );
});

// --- Fetch (Network or Cache) ---
// Intercept network requests and serve from cache if available (Cache First strategy)
self.addEventListener('fetch', event => {
    // console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return response from cache if found
                if (response) {
                    // console.log('Service Worker: Found in cache', event.request.url);
                    return response;
                }
                // Otherwise, fetch from network
                // console.log('Service Worker: Not in cache, fetching from network', event.request.url);
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Service Worker: Fetch error', error);
                // Optional fallback offline page (requires caching offline.html)
                // return caches.match('/aetheltech_quiz_pwa/offline.html');
            })
    );
});