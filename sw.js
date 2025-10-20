// sw.js - Service Worker

const CACHE_NAME = 'aetheltech-quiz-cache-v1'; // Change version if you update assets
const urlsToCache = [
    '/', // Alias for index.html
    'index.html',
    'style.css',
    'script.js',
    'quiz-data.js',
    'manifest.json',
    'icon-192.png',
    'icon-512.png'
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
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch(error => {
                console.error('Service Worker: Caching failed', error);
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
                // Optional: Cache dynamically fetched resources if needed (Network Falling Back to Cache)
                /*
                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
                */
            })
            .catch(error => {
                console.error('Service Worker: Fetch error', error);
                // Optional: You could return a fallback offline page here
                // if (!navigator.onLine) { return caches.match('/offline.html'); }
            })
    );
});