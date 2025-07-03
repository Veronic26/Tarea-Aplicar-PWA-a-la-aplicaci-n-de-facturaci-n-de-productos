import { saveData, getData, generateId } from './utils.js';
// Clase para el formulario de cliente
class ClienteForm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <h2>Crear Cliente</h2>
    <div class="card">
    <div class="card-body">

      <form id="formCliente" class="mb-4">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" id="nombre" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="correo" class="form-label">Correo</label>
          <input type="email" id="correo" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input type="tel" id="telefono" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="direccion" class="form-label">Dirección</label>
          <input type="text" id="direccion" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Guardar Cliente</button>
      </form>
      </div>
      </div>
    `;
  }

  // Método que se ejecuta al añadir el elemento al DOM
  connectedCallback() {
    const form = this.querySelector('#formCliente');
    form.addEventListener('submit', e => {
      e.preventDefault();
      // Valida campos
      const nombre = this.querySelector('#nombre').value.trim();
      const correo = this.querySelector('#correo').value.trim();
      const telefono = this.querySelector('#telefono').value.trim();
      const direccion = this.querySelector('#direccion').value.trim();

      //Si algún campo está vacío, no continuar
      if (!nombre || !correo || !telefono || !direccion) return;

      // Crea un nuevo cliente y guardarlo
      const nuevoCliente = {
        id: generateId(),
        nombre,
        correo,
        telefono,
        direccion
      };
      // Obtiene los clientes existentes, añade el nuevo cliente y guardarlos
      const clientes = getData('clientes');
      clientes.push(nuevoCliente);
      saveData('clientes', clientes);
      // Limpiar el formulario y notificar que se ha guardado
      form.reset();
      this.dispatchEvent(new CustomEvent('cliente-guardado', { bubbles: true }));
      window.location.reload();
    });
  }
}
// Define el nuevo elemento personalizado
customElements.define('cliente-form', ClienteForm);
