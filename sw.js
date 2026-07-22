var CACHE = 'qf-v31';
var FILES = ['./financas.html', './manifest.json'];
var NO_CACHE = ['quick.html'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(FILES); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  var url = e.request.url;
  if (NO_CACHE.some(function(p){ return url.indexOf(p) !== -1; })) {
    e.respondWith(fetch(e.request));
    return;
  }
  // cache:'no-store' — sem isto, o fetch "network-first" podia ser respondido
  // pelo cache HTTP do próprio navegador (o GitHub Pages manda
  // Cache-Control: max-age=600) em vez de ir buscar de verdade ao servidor,
  // fazendo uma mudança recém-publicada não aparecer por até 10 minutos.
  e.respondWith(
    fetch(e.request, {cache: 'no-store'}).then(function(res) {
      var clone = res.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
      return res;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
