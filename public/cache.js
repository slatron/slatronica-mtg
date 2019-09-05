// https://carmalou.com/lets-take-this-offline/2019/04/16/cache-requests-with-service-worker.html

const URL_TO_CACHE = 'https://api.scryfall.com/'
const IMG_TO_CACHE = 'https://img.scryfall.com/'
const CACHE_NAME   = 'Slatronica'

self.onfetch = function(event) {
  event.respondWith(
    (async function() {
       const cache       = await caches.open(CACHE_NAME)
       const cachedFiles = await cache.match(event.request)
       if(cachedFiles) {
           return cachedFiles
       } else {
           try {
               const response   = await fetch(event.request)
               const requestUrl = event.request.url
               if (requestUrl.startsWith(URL_TO_CACHE) || requestUrl.startsWith(IMG_TO_CACHE)) {
                 await cache.put(event.request, response.clone())
                 return response
               } else {
                 return fetch(event.request)
               }
           } catch(e) {
             console.log('ERROR from cache.js await fetch block: ', e)
             return fetch(event.request)
           }
       }
   }())
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
