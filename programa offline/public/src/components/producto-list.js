import { getData, saveData } from './utils.js';

class ProductoList extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    document.addEventListener('producto-guardado', () => this.render());
  }

  render() {
    const productos = getData('productos');

    this.innerHTML = `
      <h2 class="mb-3">Productos Registrados</h2>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead class="table-success">
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            ${productos.map((producto, index) => `
              <tr>
                <td>${producto.nombre}</td>
                <td>${producto.codigo}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    this.querySelectorAll('button[data-index]').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index);
        if (confirm('¿Seguro que deseas eliminar este producto?')) {
          productos.splice(index, 1);
          saveData('productos', productos);
          this.render();
        }
      });
    });
  }
}

customElements.define('producto-list', ProductoList);
