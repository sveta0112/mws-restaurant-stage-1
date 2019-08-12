const cacheName = 'v1';
const casheAssets = [
    '/',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/1_320.jpg',
    './img/1_600.jpeg',
    './img/2.jpg',
    './img/2_320.jpg',
    './img/2_600.jpeg',
    './img/3.jpg',
    './img/3_320.jpg',
    './img/3_600.jpeg',
    './img/4.jpg',
    './img/4_320.jpg',
    './img/4_600.jpeg',
    './img/5.jpg',
    './img/5_320.jpg',
    './img/5_600.jpeg',
    './img/6.jpg',
    './img/6_320.jpg',
    './img/6_600.jpeg',
    './img/7.jpg',
    './img/7_320.jpg',
    './img/7_600.jpeg',
    './img/8.jpg',
    './img/8_320.jpg',
    './img/8_600.jpeg',
    './img/9.jpg',
    './img/9_320.jpg',
    './img/9_600.jpeg',
    './img/10.jpg',
    './img/10_320.jpg',
    './img/10_600.jpeg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
];

//Call Install Event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files')
                cache.addAll(casheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

//Call Activate Event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    //Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//Call Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});