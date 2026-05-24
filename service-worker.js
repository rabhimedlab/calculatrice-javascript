const CACHE_NAME = "amane-calculator-v2";

const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
    "./sounds/click.mp3",
    "./sounds/equal.mp3"
];

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })

    );
});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }

                })

            );

        })

    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
            .catch(() => caches.match(event.request))

    );

});