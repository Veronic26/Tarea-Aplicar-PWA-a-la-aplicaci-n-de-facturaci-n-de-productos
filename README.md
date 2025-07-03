#Aplicación de Facturación - Progressive Web App (PWA)
Objetivo
Convertir la aplicación de facturación de productos existente en una Progressive Web App (PWA), permitiendo su instalación en dispositivos y mejorando su disponibilidad sin conexión (modo offline).

1. Configuración de PWA
Integración del soporte PWA en todo el proyecto.

Se incluyó el archivo manifest.json con los siguientes campos clave:

name: Nombre completo de la app.

short_name: Nombre corto para íconos y accesos directos.

start_url: Página de inicio al abrir la app desde un acceso directo.

theme_color y background_color: Colores para personalizar la interfaz.

2. Service Worker
Se implementó un service-worker.js que permite:

Cachear los archivos estáticos (HTML, CSS, JS, imágenes, etc.).

Responder con archivos del caché cuando no hay conexión a internet.

Habilitar un modo offline básico.

3. Funcionalidad Offline
La aplicación puede seguir funcionando sin conexión para:

Visualizar facturas generadas previamente, utilizando el almacenamiento local (localStorage).

4. Instalación en Dispositivos
La app puede ser instalada como aplicación independiente desde navegadores compatibles (Chrome, Edge, Firefox, etc.) en:

Dispositivos móviles

Tabletas

Escritorio (PC/Mac)
