// src/main.js

// Importar Custom Elements
import './components/cliente-form.js';
import './components/cliente-list.js';
import './components/producto-form.js';
import './components/producto-list.js';
import './components/factura-form.js';
import './components/factura-list.js';

// Función para cargar la vista HTML
async function cargarVista(nombre) {
  const contenedor = document.getElementById('vista');
  try {
    const res = await fetch(`./modulos/${nombre}`);
    const html = await res.text();
    contenedor.innerHTML = html;
  } catch (err) {
    contenedor.innerHTML = `<p>Error al cargar la vista "${nombre}"</p>`;
    console.error(err);
  }
}

// Configura la navegación
function configurarMenu() {
  document.querySelectorAll('[data-modulo]').forEach(boton => {
    boton.addEventListener('click', () => {
      const vista = boton.getAttribute('data-modulo');
      cargarVista(vista);
    });
  });
}

// Inicializa la aplicación
function init() {
  configurarMenu();
  cargarVista('clientes.html'); // vista por defecto
}

init();
