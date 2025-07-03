import { getData, saveData } from './utils.js';

class ClienteList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <h2 class="mb-3">Clientes Registrados</h2>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead class="table-success">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acción</th> <!-- Nueva columna -->
            </tr>
          </thead>
          <tbody id="listaClientes"></tbody>
        </table>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    document.addEventListener('cliente-guardado', () => this.render());
  }

  render() {
    const tbody = this.querySelector('#listaClientes');
    const clientes = getData('clientes');
    tbody.innerHTML = '';

    clientes.forEach((cliente, index) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${cliente.nombre}</td>
        <td>${cliente.correo}</td>
        <td>${cliente.telefono || ''}</td>
        <td>${cliente.direccion || ''}</td>
        <td>
          <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
        </td>
      `;

      tr.querySelector('button').addEventListener('click', () => {
        if (confirm('¿Seguro que deseas eliminar este cliente?')) {
          clientes.splice(index, 1);
          saveData('clientes', clientes);
          this.render();
        }
      });

      tbody.appendChild(tr);
    });
  }
}

customElements.define('cliente-list', ClienteList);
