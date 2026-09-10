// RF3: Botón de compra directa.
// Cada producto tiene un botón "Comprar" que redirige a WhatsApp con un
// mensaje pre-armado, usando el número del negocio (ver caso de estudio:
// "Chatea en WhatsApp con el +52 921 246 0459").
const NUMERO_WHATSAPP_NEGOCIO = '529212460459';

function generarEnlaceWhatsApp(mensaje) {
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${NUMERO_WHATSAPP_NEGOCIO}?text=${mensajeCodificado}`;
}

function manejarClicComprar(evento) {
  const boton = evento.target.closest('.btn-comprar');
  if (!boton) return;

  const nombre = boton.dataset.nombre;
  const precio = boton.dataset.precio;

  const mensaje = `¡Hola! 👋 Quiero pedir:\n- ${nombre} ($${precio})\n\n¿Está disponible?`;
  window.open(generarEnlaceWhatsApp(mensaje), '_blank');
}

document.addEventListener('click', manejarClicComprar);