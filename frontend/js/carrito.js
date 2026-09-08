// RF2: Carrito de compras.
// RNF4: el carrito se guarda en localStorage para persistir al recargar
// la página, sin necesidad de que el usuario inicie sesión (el caso no
// contempla cuentas de usuario).
const CLAVE_CARRITO = 'lenosRellenos_carrito';

function obtenerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function quitarDelCarrito(id) {
  const carrito = obtenerCarrito().filter((item) => item.id !== id);
  guardarCarrito(carrito);
  renderizarCarrito();
}

// Permite +1 / -1. Si la cantidad llega a 0, el producto se quita solo.
function cambiarCantidad(id, delta) {
  const carrito = obtenerCarrito();
  const item = carrito.find((i) => i.id === id);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    quitarDelCarrito(id);
    return;
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function calcularSubtotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const lista = document.getElementById('lista-carrito');
  const mensajeVacio = document.getElementById('carrito-vacio-mensaje');
  const totalElemento = document.getElementById('carrito-total');
  const contador = document.getElementById('carrito-contador');

  if (!lista) return;

  lista.innerHTML = '';

  if (carrito.length === 0) {
    if (mensajeVacio) mensajeVacio.style.display = 'block';
  } else {
    if (mensajeVacio) mensajeVacio.style.display = 'none';

    carrito.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'carrito-item';
      li.innerHTML = `
        <span class="carrito-item-nombre">${item.nombre}</span>
        <div class="carrito-item-controles">
          <button class="btn-cantidad" data-id="${item.id}" data-delta="-1" aria-label="Quitar uno">−</button>
          <span>${item.cantidad}</span>
          <button class="btn-cantidad" data-id="${item.id}" data-delta="1" aria-label="Agregar uno">+</button>
        </div>
        <span class="carrito-item-subtotal">$${(item.precio * item.cantidad).toFixed(2)}</span>
        <button class="btn-quitar" data-id="${item.id}" aria-label="Quitar del carrito">🗑</button>
      `;
      lista.appendChild(li);
    });
  }

  if (totalElemento) totalElemento.textContent = `$${calcularSubtotal(carrito).toFixed(2)}`;

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  if (contador) contador.textContent = totalItems;
}

function inicializarCarrito() {
  // Delegación de eventos: los productos del catálogo se generan
  // dinámicamente (ver disponibilidad.js), así que escuchamos los clics
  // desde el document en vez de atar un listener a cada botón.
  document.addEventListener('click', (evento) => {
    const botonAgregar = evento.target.closest('.btn-agregar');
    if (botonAgregar) {
      agregarAlCarrito({
        id: botonAgregar.dataset.id,
        nombre: botonAgregar.dataset.nombre,
        precio: parseFloat(botonAgregar.dataset.precio),
      });
      return;
    }

    const botonCantidad = evento.target.closest('.btn-cantidad');
    if (botonCantidad) {
      cambiarCantidad(botonCantidad.dataset.id, parseInt(botonCantidad.dataset.delta, 10));
      return;
    }

    const botonQuitar = evento.target.closest('.btn-quitar');
    if (botonQuitar) {
      quitarDelCarrito(botonQuitar.dataset.id);
    }
  });

  const btnAbrir = document.getElementById('btn-abrir-carrito');
  const btnCerrar = document.getElementById('btn-cerrar-carrito');
  const panel = document.getElementById('panel-carrito');

  if (btnAbrir && panel) {
    btnAbrir.addEventListener('click', () => panel.classList.remove('oculto'));
  }
  if (btnCerrar && panel) {
    btnCerrar.addEventListener('click', () => panel.classList.add('oculto'));
  }

  // RNF4: al cargar la página, refleja lo que ya había guardado
  renderizarCarrito();
}

document.addEventListener('DOMContentLoaded', inicializarCarrito);