const CACHE_NAME = 'discipline-tracker-v1';
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'mother_motivation_serious.png',
  'favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
