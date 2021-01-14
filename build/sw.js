const CACHE_NAME = 'my-site-cache-v1';
const urlsToCash = [
  './',
  './page.html',
  './css/app.min.css',
  './js/app.js'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCash);
      })
  )
})

// self.addEventListener('activate', event => {
//   // delete any caches that aren't in expectedCaches
//   // which will get rid of static-v1
//   event.waitUntil(
//     caches.keys().then(cacheNames => Promise.all(
//       cacheNames.filter(cacheName => true).map(cacheName => caches.delete(cacheName))
//     ))
//   )
// })

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) { return response; }
        return fetch(event.request);
      })
  )
})
