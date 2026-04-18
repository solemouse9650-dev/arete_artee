// Service Worker for Areté Galería de Arte
const CACHE_NAME = 'arete-v1.0.0';
const STATIC_CACHE = 'arete-static-v1';
const DYNAMIC_CACHE = 'arete-dynamic-v1';

// Files to cache on install
const STATIC_ASSETS = [
    '/',
    '/index-new.html',
    '/styles.css',
    '/script.js',
    '/favicon.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old caches
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Clearing old cache');
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip external API calls and Mercado Pago
    if (url.pathname.startsWith('/api/') || url.hostname.includes('mercadopago')) {
        return;
    }
    
    // Strategy: Cache First for static assets, Network First for dynamic content
    if (isStaticAsset(request.url)) {
        // Cache First for static assets
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    // If not in cache, fetch from network and cache
                    return fetch(request)
                        .then((networkResponse) => {
                            // Don't cache non-successful responses
                            if (!networkResponse || networkResponse.status !== 200) {
                                return networkResponse;
                            }
                            
                            return caches.open(STATIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, networkResponse.clone());
                                    return networkResponse;
                                });
                        });
                })
        );
    } else {
        // Network First for dynamic content
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    // Cache successful responses
                    if (networkResponse && networkResponse.status === 200) {
                        return caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(request, networkResponse.clone());
                                return networkResponse;
                            });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // If network fails, try cache
                    return caches.match(request);
                })
        );
    }
});

// Background sync for failed requests (optional)
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Background sync triggered');
        // Handle background sync logic here
    }
});

// Push notifications (optional)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/favicon.png',
            badge: '/favicon.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver productos',
                    icon: '/favicon.png'
                },
                {
                    action: 'close',
                    title: 'Cerrar',
                    icon: '/favicon.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/#productos')
        );
    }
});

// Helper function to check if request is for static asset
function isStaticAsset(url) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'];
    const extension = url.split('.').pop().toLowerCase();
    return staticExtensions.includes(extension) || 
           url.includes('fonts.googleapis.com') || 
           url.includes('cdnjs.cloudflare.com');
}

// Cache size management
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic cache cleanup
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.open(DYNAMIC_CACHE)
            .then((cache) => {
                // Limit dynamic cache size
                return cache.keys()
                    .then((keys) => {
                        if (keys.length > 50) {
                            const oldKeys = keys.slice(0, keys.length - 50);
                            return Promise.all(
                                oldKeys.map((key) => cache.delete(key))
                            );
                        }
                    });
            })
    );
});
