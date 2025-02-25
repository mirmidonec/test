const cacheName = "WA-Merge Game-2.003";
const contentToCache = [
    "Build/dbPython.loader.js",
    "Build/e2875847f9473232861702c97c8cb2ec.js.gz",
    "Build/706d8d2d2ca2b50b517287f6009e3c08.data.gz",
    "Build/1e7e63145b40bb33e4f4cd6d36fcd466.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
