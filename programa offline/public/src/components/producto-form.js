// public/js/producto-form.js
import { saveData, getData, generateId } from './utils.js';

class ProductoForm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <h2>Crear Producto</h2>
      <div class="card">
        <div class="card-body">
          <form id="formProducto">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre del producto</label>
              <input type="text" class="form-control" id="nombre" required>
            </div>
            <div class="mb-3">
              <label for="codigo" class="form-label">Código</label>
              <input type="text" class="form-control" id="codigo" required>
            </div>
            <div class="mb-3">
              <label for="precio" class="form-label">Precio</label>
              <input type="number" class="form-control" id="precio" step="0.01" required>
            </div>
            <button type="submit" class="btn btn-success">Guardar Producto</button>
          </form>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.querySelector('#formProducto').addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = this.querySelector('#nombre').value.trim();
      const codigo = this.querySelector('#codigo').value.trim();
      const precio = parseFloat(this.querySelector('#precio').value);

      if (!nombre || !codigo || isNaN(precio)) return;

      const productos = getData('productos');
      productos.push({
        id: generateId(),
        nombre,
        codigo,
        precio
      });
      saveData('productos', productos);

      this.querySelector('#formProducto').reset();
      document.querySelector('producto-list').render();
      window.location.reload();
    });
  }
}

customElements.define('producto-form', ProductoForm);
