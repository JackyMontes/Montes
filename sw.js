const CACHE_NAME = 'v1_cache_portafolio_profesional';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './css/style.min.css',
  './js/main.js',
  './img/freelancer-portfolio-template.jpg', // Esta imagen estaba en la raíz, según la estructura
  './img/favicon.ico',
  './img/CV.PNG',
  './img/CV1.png',
  './manifest.json', // Asegúrate de que este archivo esté en la raíz de tu proyecto
  './js/lib/owlcarousel/assets/owl.carousel.min.css', // Si usas esta librería
  './js/lib/lightbox/css/lightbox.min.css', // Si usas esta librería
  './mail/contact.js', // Si usas este archivo en tu proyecto
  './mail/jqBootstrapValidation.min.js', // Si usas este archivo en tu proyecto
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Intentando cachear archivos...');
        return cache.addAll(urlsToCache);
      })
      .then(() => console.log('Archivos cacheados correctamente'))
      .catch((err) => {
        console.error('Error al registrar el caché:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Eliminando caché antiguo: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch((err) => {
        console.error('Error al recuperar el recurso:', err);
      })
  );
});
