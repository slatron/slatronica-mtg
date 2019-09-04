// https://carmalou.com/lets-take-this-offline/2019/04/16/cache-requests-with-service-worker.html

const URL_TO_CACHE = 'https://api.scryfall.com/'
const IMG_TO_CACHE = 'https://img.scryfall.com/'
const CACHE_NAME   = 'Slatronica'

self.onfetch = function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(cachedFiles => {
          return cachedFiles || fetch(event.request)
            .then(response => {
              // cache scryfall API responses and jpg images
              const requestUrl = event.request.url
              if (requestUrl.startsWith(URL_TO_CACHE) || requestUrl.startsWith(IMG_TO_CACHE)) {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, response.clone())
                    return response;
                  })
                  .catch(err => console.log('OOPS! cache.js err on cache.open :', err))
              }
              return response
            })
            .catch(err => console.log('OOPS! cache.js err on fetch(event.request) :', err))
      })
      .catch(err => console.log('OOPS! cache.js err on caches.match(event.request) :', err))
  )
}

// Add this when app is finished to cache app.js and other static files
// - Update list of files to get anything static into cache
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache =>
//         cache.addAll([
//           'favicon.ico'
//         ]))
//       .catch(err => console.warn(err))
//   )
// })
