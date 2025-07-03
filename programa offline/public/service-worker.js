const CACHE_NAME = "facturacion-de-productos-pwa-cache-v1";
const archivosParaCachear = [
  ,"./",
  "index.html",
  "manifest.json",
  "src/main.js",
  "src/components/cliente-form.js",
  "src/components/cliente-list.js",
  "src/components/producto-form.js",
  "src/components/producto-list.js",
  "src/components/factura-form.js",
  "src/components/factura-list.js",
  "modulos/clientes.html",
  "modulos/productos.html",
  "modulos/factura.html",
  "images/factura.png",
  "src/components/utils.js",
  "lib/bootstrap/bootstrap.min.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(archivosParaCachear);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Servicio Worker: Interceptando petición a:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((respuestaCache) => {
      // si hay respuesta en el cache, la devuelve
      if (respuestaCache) {
        console.log(
          "Servicio Worker: Devolviendo del cache:",
          event.request.url
        );
        return respuestaCache;
      }

      // si no hay respuesta en el cache, hace la petición a la red
      console.log(
        "Servicio Worker: Haciendo petición a la red:",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});
