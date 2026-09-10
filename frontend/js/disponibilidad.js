// RF6: Horario del negocio.
// Leños Rellenos atiende de miércoles a domingo, de 5pm a 10pm.
const HORARIO_NEGOCIO = {
  // getDay(): 0 = domingo ... 6 = sábado
  diasAbiertos: [0, 3, 4, 5, 6], // miércoles a domingo
  horaApertura: 17, // 5:00 pm
  horaCierre: 22, // 10:00 pm
};

function calcularEstadoNegocio() {
  const ahora = new Date();
  const dia = ahora.getDay();
  const hora = ahora.getHours();

  const diaValido = HORARIO_NEGOCIO.diasAbiertos.includes(dia);
  const horaValida = hora >= HORARIO_NEGOCIO.horaApertura && hora < HORARIO_NEGOCIO.horaCierre;

  return diaValido && horaValida;
}

function mostrarEstadoNegocio() {
  const elementoEstado = document.getElementById('estado-horario');
  if (!elementoEstado) return;

  const abierto = calcularEstadoNegocio();
  elementoEstado.textContent = abierto ? '🟢 Abierto ahora' : '🔴 Cerrado — vuelve en nuestro horario de atención';
  elementoEstado.classList.toggle('abierto', abierto);
  elementoEstado.classList.toggle('cerrado', !abierto);
}

// RF1: obtiene el catálogo desde el backend.
// RF5: el backend ya filtra productos sin stock/disponibilidad
// (ver GET /api/productos en productos.controller.js), así que aquí
// solo se renderiza lo que llega — nunca se muestra un producto agotado.
async function cargarCatalogo() {
  const contenedor = document.getElementById('catalogo');
  const cargando = document.getElementById('catalogo-cargando');

  try {
    const respuesta = await fetch('/api/productos');
    if (!respuesta.ok) throw new Error('No se pudo cargar el catálogo');

    const productos = await respuesta.json();

    if (cargando) cargando.remove();

    if (productos.length === 0) {
      contenedor.innerHTML = '<p>No hay productos disponibles en este momento.</p>';
      return;
    }

    productos.forEach((producto) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'producto-tarjeta';
      tarjeta.innerHTML = `
        <img src="${producto.imagen || 'img/placeholder.jpg'}" alt="${producto.nombre}" />
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toFixed(2)}</p>
        <div class="producto-tarjeta-acciones">
          <button class="btn-agregar" data-id="${producto._id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar</button>
          <button class="btn-comprar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Comprar</button>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    if (cargando) cargando.textContent = 'No se pudo cargar el catálogo. Intenta más tarde.';
    console.error('Error al cargar catálogo:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarEstadoNegocio();
  cargarCatalogo();
});