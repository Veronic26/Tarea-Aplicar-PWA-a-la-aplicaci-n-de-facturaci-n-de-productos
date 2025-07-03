import { getData, saveData, generateId } from './utils.js';

class FacturaForm extends HTMLElement {
  constructor() {
    super();
    this.clientes = [];
    this.productos = [];
    this.itemsFactura = [];

    this.innerHTML = `
      
    
    <h2>Crear Factura</h2>
    <div class="card">
        <div class="card-body">
      <form id="formFactura" class="mb-4">
        <div class="mb-3">
          <label for="clienteSelect" class="form-label">Cliente</label>
          <select id="clienteSelect" class="form-select" required>
            <option value="">Seleccione un cliente</option>
          </select>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="productoSelect" class="form-label">Producto</label>
            <select id="productoSelect" class="form-select" required>
              <option value="">Seleccione un producto</option>
            </select>
          </div>
          <div class="col">
            <label for="cantidadInput" class="form-label">Cantidad</label>
            <input type="number" id="cantidadInput" class="form-control" min="1" value="1" required />
          </div>
          <div class="col d-flex align-items-end">
            <button type="button" id="agregarProductoBtn" class="btn btn-success">Agregar</button>
          </div>
        </div>
      </form>


      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody id="itemsFacturaBody"></tbody>
        <tfoot>
          <tr>
            <th colspan="3" class="text-end">Total</th>
            <th id="totalFactura">0.00</th>
            <th></th>
          </tr>
        </tfoot>
      </table>

      <button id="guardarFacturaBtn" class="btn btn-primary" disabled>Guardar Factura</button>
    
          </div>
      </div>  `;

  }

  connectedCallback() {
    // Cargar clientes y productos desde localStorage
    this.clientes = getData('clientes');
    this.productos = getData('productos');

    this.clienteSelect = this.querySelector('#clienteSelect');
    this.productoSelect = this.querySelector('#productoSelect');
    this.cantidadInput = this.querySelector('#cantidadInput');
    this.agregarProductoBtn = this.querySelector('#agregarProductoBtn');
    this.itemsFacturaBody = this.querySelector('#itemsFacturaBody');
    this.totalFacturaEl = this.querySelector('#totalFactura');
    this.guardarFacturaBtn = this.querySelector('#guardarFacturaBtn');

    this.renderClientes();
    this.renderProductos();

    this.agregarProductoBtn.addEventListener('click', () => this.agregarProducto());
    this.guardarFacturaBtn.addEventListener('click', () => this.guardarFactura());
    this.clienteSelect.addEventListener('change', () => this.actualizarBotonGuardar());
  }

  renderClientes() {
    this.clienteSelect.innerHTML = `<option value="">Seleccione un cliente</option>`;
    this.clientes.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.nombre;
      this.clienteSelect.appendChild(option);
    });
  }

  renderProductos() {
    this.productoSelect.innerHTML = `<option value="">Seleccione un producto</option>`;
    this.productos.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
      this.productoSelect.appendChild(option);
    });
  }

  agregarProducto() {
    const productoId = this.productoSelect.value;
    const cantidad = parseInt(this.cantidadInput.value);

    if (!productoId || cantidad <= 0) {
      alert('Seleccione un producto y una cantidad válida.');
      return;
    }

    const producto = this.productos.find(p => p.id === productoId);
    if (!producto) return;

    // Verificar si el producto ya está en la factura
    const existente = this.itemsFactura.find(item => item.producto.id === productoId);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.itemsFactura.push({ producto, cantidad });
    }

    this.renderItems();
    this.productoSelect.value = '';
    this.cantidadInput.value = 1;
    this.actualizarBotonGuardar();
  }

  renderItems() {
    this.itemsFacturaBody.innerHTML = '';
    let total = 0;

    this.itemsFactura.forEach((item, index) => {
      const tr = document.createElement('tr');

      const subtotal = item.producto.precio * item.cantidad;
      total += subtotal;

      tr.innerHTML = `
        <td>${item.producto.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.producto.precio.toFixed(2)}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">Eliminar</button></td>
      `;

      tr.querySelector('.btn-eliminar').addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        this.itemsFactura.splice(idx, 1);
        this.renderItems();
        this.actualizarBotonGuardar();
      });

      this.itemsFacturaBody.appendChild(tr);
    });

    this.totalFacturaEl.textContent = `$${total.toFixed(2)}`;
  }

  actualizarBotonGuardar() {
    this.guardarFacturaBtn.disabled = !(this.clienteSelect.value && this.itemsFactura.length > 0);
  }

  guardarFactura() {
    const factura = {
      id: generateId(),
      clienteId: this.clienteSelect.value,
      items: this.itemsFactura.map(item => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio
      })),
      fecha: new Date().toISOString()
    };

    const facturas = getData('facturas');
    facturas.push(factura);
    saveData('facturas', facturas);

    // Reiniciar formulario
    this.clienteSelect.value = '';
    this.itemsFactura = [];
    this.renderItems();
    this.actualizarBotonGuardar();

    alert('Factura guardada con éxito!');
    this.dispatchEvent(new CustomEvent('factura-guardada', { bubbles: true }));
  }
}

customElements.define('factura-form', FacturaForm);
