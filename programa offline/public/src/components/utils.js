// Guarda cualquier tipo de datos en localStorage
export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Carga datos del localStorage
export function getData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Borra datos por clave (clientes, productos o facturas)
export function clearData(key) {
  localStorage.removeItem(key);
}

// Elimina un elemento por ID en un array almacenado en localStorage
export function deleteById(key, id) {
  const data = getData(key).filter(item => item.id !== id);
  saveData(key, data);
}

// Genera un ID único para cada registro
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
