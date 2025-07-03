import { getData, saveData } from './utils.js';

class FacturaList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    document.addEventListener('factura-guardada', () => this.render());
  }

  render() {
    const facturas = getData('facturas');
    const clientes = getData('clientes');
    const productos = getData('productos');

    this.innerHTML = `
          <h2 class="mb-3">Clientes Registrados</h2>
      <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-success">
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          ${facturas.map(factura => {
            const cliente = clientes.find(c => c.id === factura.clienteId);
            const clienteNombre = cliente ? cliente.nombre : 'Cliente no encontrado';
            const fecha = new Date(factura.fecha).toLocaleDateString();

            const totalFactura = factura.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);

            // Generar una fila por cada producto en la factura
            return factura.items.map((item, index) => {
              const producto = productos.find(p => p.id === item.productoId);
              const nombreProducto = producto ? producto.nombre : 'Producto no encontrado';
              const precio = item.precioUnitario.toFixed(2);
              const subtotal = (item.precioUnitario * item.cantidad).toFixed(2);

              return `
                <tr data-id="${factura.id}">
                  <td>${index === 0 ? fecha : ''}</td>
                  <td>${index === 0 ? clienteNombre : ''}</td>
                  <td>${nombreProducto}</td>
                  <td>$${precio}</td>
                  <td>${index === 0 ? `$${totalFactura.toFixed(2)}` : ''}</td>
                  <td>${index === 0 ? `<button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>` : ''}</td>
                </tr>
              `;
            }).join('');
          }).join('')}
        </tbody>
      </table>
      </div>
    `;


    this.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        this.eliminarFactura(id);
      });
    });
  }

  eliminarFactura(id) {
    let facturas = getData('facturas');
    facturas = facturas.filter(f => f.id !== id);
    saveData('facturas', facturas);
    this.render();
  }
}

customElements.define('factura-list', FacturaList);
