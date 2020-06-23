const CACHE_NAME = "jelajahsemesta-v.1.0";
let urlsToCache = [
   "/",
   "/manifest.json",
   "/.htaccess",
   "/index.html",
   "/font/MaterialIcon.woff2",
   "/font/Nunito.ttf",
   "/font/PTSans.ttf",
   "/font/SourceSansPro.ttf",
   "/css/font.css",
   "/css/materialize.min.css",
   "/css/style.css",
   "/js/materialize.min.js",
   "/js/clamp.min.js",
   "/js/script.js",
   "/halaman/telusur.html",
   "/halaman/tentang.html",
   "/halaman/kontak.html",
   "/halaman/matahari.html",
   "/halaman/merkurius.html",
   "/halaman/venus.html",
   "/halaman/bumi.html",
   "/halaman/mars.html",
   "/halaman/jupiter.html",
   "/halaman/saturnus.html",
   "/halaman/uranus.html",
   "/halaman/neptunus.html",
   "/halaman/pluto.html",
   "/img/icon/favicon.ico",
   "/img/icon/icon-72x72.png",
   "/img/icon/icon-96x96.png",
   "/img/icon/icon-128x128.png",
   "/img/icon/icon-144x144.png",
   "/img/icon/icon-152x152.png",
   "/img/icon/icon-192x192.png",
   "/img/icon/icon-384x384.png",
   "/img/icon/icon-512x512.png",
   "/img/icon/apple-icon.png",
   "/img/icon/apple-icon-57x57.png",
   "/img/icon/apple-icon-60x60.png",
   "/img/icon/apple-icon-72x72.png",
   "/img/icon/apple-icon-76x76.png",
   "/img/icon/apple-icon-114x114.png",
   "/img/icon/apple-icon-120x120.png",
   "/img/icon/apple-icon-144x144.png",
   "/img/icon/apple-icon-152x152.png",
   "/img/icon/apple-icon-180x180.png",
   "/img/thumb/matahari.jpg",
   "/img/thumb/merkurius.jpg",
   "/img/thumb/venus.jpg",
   "/img/thumb/bumi.jpg",
   "/img/thumb/mars.jpg",
   "/img/thumb/jupiter.jpg",
   "/img/thumb/saturnus.jpg",
   "/img/thumb/uranus.jpg",
   "/img/thumb/neptunus.jpg",
   "/img/thumb/pluto.jpg",
   "/img/big.jpg",
   "/img/logo.png",
   "/img/matahari2.jpg",
   "/img/matahari3.jpg",
   "/img/merkurius2.jpg",
   "/img/merkurius3.jpg",
   "/img/venus2.jpg",
   "/img/venus3.jpg",
   "/img/bumi2.jpg",
   "/img/bumi3.jpg",
   "/img/mars2.jpg",
   "/img/mars3.jpg",
   "/img/jupiter2.jpg",
   "/img/jupiter3.jpg",
   "/img/saturnus2.jpg",
   "/img/saturnus3.jpg",
   "/img/uranus2.jpg",
   "/img/uranus3.jpg",
   "/img/neptunus2.jpg",
   "/img/neptunus3.jpg",
   "/img/pluto2.jpg",
   "/img/pluto3.jpg"
];
 
self.addEventListener("install", function(event) {
   event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
         return cache.addAll(urlsToCache);
      })
   );
});

self.addEventListener("fetch", function(event) {
   event.respondWith(
      caches
         .match(event.request, { cacheName: CACHE_NAME })
         .then(function(response) {
            if (response) {
               //--- Use assets
               return response;
            }  
            //--- Load assets
            return fetch(event.request);
         })
   );
});

self.addEventListener("activate", function(event) {
   event.waitUntil(
      caches.keys().then(function(cacheNames) {
         return Promise.all(
            cacheNames.map(function(cacheName) {
               if (cacheName != CACHE_NAME) {
                  //--- Delete old cache
                  return caches.delete(cacheName);
               }
            })
         );
      })
   );
});