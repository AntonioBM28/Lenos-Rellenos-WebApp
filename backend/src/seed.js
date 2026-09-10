/**
 * seed.js — Poblar MongoDB Atlas con datos iniciales de Leños Rellenos.
 * Ejecutar UNA sola vez con: node src/seed.js
 *
 * Crea las colecciones: categorias, productos
 * Si ya existen datos, los elimina y los vuelve a insertar.
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Categoria = require('./models/Categoria');
const Producto  = require('./models/Producto');

// ──────────────────────────────────────────────
// CATEGORÍAS
// ──────────────────────────────────────────────
const categorias = [
  { nombre: 'Leños Clásicos',    descripcion: 'Nuestros leños rellenos tradicionales, hechos a la leña.', orden: 1 },
  { nombre: 'Leños Especiales',  descripcion: 'Ediciones especiales con ingredientes premium.', orden: 2 },
  { nombre: 'Leños Vegetarianos',descripcion: 'Sin carne, con todo el sabor de la tradición.', orden: 3 },
  { nombre: 'Acompañamientos',   descripcion: 'Complementa tu pedido con nuestras guarniciones.', orden: 4 },
  { nombre: 'Bebidas',           descripcion: 'Refrescos, aguas y bebidas artesanales.', orden: 5 },
];

// ──────────────────────────────────────────────
// PRODUCTOS (se asigna la categoría por nombre)
// ──────────────────────────────────────────────
const productosData = [
  // ── Leños Clásicos ──
  {
    catNombre: 'Leños Clásicos',
    nombre: 'Leño Clásico de Res',
    descripcion: 'Jugosa carne de res molida sazonada con especias de la casa, envuelta en tortilla tostada al fuego.',
    precio: 75,
    imagen: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80',
    disponible: true,
    stock: 30,
  },
  {
    catNombre: 'Leños Clásicos',
    nombre: 'Leño de Pollo a la Leña',
    descripcion: 'Pollo deshebrado marinado en salsa roja, cocinado lentamente a la leña para un sabor ahumado único.',
    precio: 70,
    imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    disponible: true,
    stock: 25,
  },
  {
    catNombre: 'Leños Clásicos',
    nombre: 'Leño de Chorizo',
    descripcion: 'Chorizo artesanal con rajas de chile poblano y queso Oaxaca derretido.',
    precio: 72,
    imagen: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80',
    disponible: true,
    stock: 20,
  },
  {
    catNombre: 'Leños Clásicos',
    nombre: 'Leño Mixto',
    descripcion: 'Lo mejor de dos mundos: res y pollo en el mismo leño, con guacamole y pico de gallo.',
    precio: 85,
    imagen: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&q=80',
    disponible: true,
    stock: 15,
  },

  // ── Leños Especiales ──
  {
    catNombre: 'Leños Especiales',
    nombre: 'Leño Especial de Costilla BBQ',
    descripcion: 'Costilla de cerdo ahumada con salsa BBQ artesanal y cebolla morada caramelizada. Edición limitada.',
    precio: 110,
    imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
    disponible: true,
    stock: 12,
  },
  {
    catNombre: 'Leños Especiales',
    nombre: 'Leño de Camarón al Mojo',
    descripcion: 'Camarones jumbo al mojo de ajo sobre cama de arroz jazmín, con chile de árbol y limón.',
    precio: 120,
    imagen: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80',
    disponible: true,
    stock: 10,
  },
  {
    catNombre: 'Leños Especiales',
    nombre: 'Leño Trufa & Champiñones',
    descripcion: 'Champiñones salteados con aceite de trufa, queso Gruyère y hierbas finas. Experiencia gourmet.',
    precio: 105,
    imagen: 'https://images.unsplash.com/photo-1607116667981-ff148a5ffce4?w=400&q=80',
    disponible: false,
    stock: 0,
  },

  // ── Leños Vegetarianos ──
  {
    catNombre: 'Leños Vegetarianos',
    nombre: 'Leño Veggie de Espinaca',
    descripcion: 'Espinaca fresca, queso panela, jitomate asado y pesto de albahaca. Ligero y delicioso.',
    precio: 68,
    imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    disponible: true,
    stock: 18,
  },
  {
    catNombre: 'Leños Vegetarianos',
    nombre: 'Leño de Frijoles Negros',
    descripcion: 'Frijoles negros refritos con epazote, queso Oaxaca fundido y crema de rancho. Sabor de hogar.',
    precio: 62,
    imagen: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
    disponible: true,
    stock: 22,
  },
  {
    catNombre: 'Leños Vegetarianos',
    nombre: 'Leño de Rajas con Crema',
    descripcion: 'Rajas de chile poblano asado con elote, crema espesa y queso Chihuahua. El favorito de la casa.',
    precio: 65,
    imagen: 'https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=400&q=80',
    disponible: true,
    stock: 20,
  },

  // ── Acompañamientos ──
  {
    catNombre: 'Acompañamientos',
    nombre: 'Guacamole Artesanal',
    descripcion: 'Aguacate Hass, cilantro, cebolla, jitomate y un toque de limón. Porcón para 2 personas.',
    precio: 45,
    imagen: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80',
    disponible: true,
    stock: 40,
  },
  {
    catNombre: 'Acompañamientos',
    nombre: 'Papas Fritas a la Leña',
    descripcion: 'Papas cortadas en bastones, fritas en aceite de girasol con sal de mar y paprika ahumada.',
    precio: 40,
    imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    disponible: true,
    stock: 50,
  },
  {
    catNombre: 'Acompañamientos',
    nombre: 'Elotes Asados',
    descripcion: 'Elotes asados a la leña con mantequilla, mayonesa, queso cotija y chile piquín.',
    precio: 35,
    imagen: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80',
    disponible: true,
    stock: 30,
  },

  // ── Bebidas ──
  {
    catNombre: 'Bebidas',
    nombre: 'Agua de Jamaica',
    descripcion: 'Agua fresca de flor de jamaica con azúcar de caña. Refrescante y natural. 500 ml.',
    precio: 25,
    imagen: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    disponible: true,
    stock: 60,
  },
  {
    catNombre: 'Bebidas',
    nombre: 'Horchata Artesanal',
    descripcion: 'Horchata de arroz con canela y vainilla, endulzada al natural. 500 ml.',
    precio: 28,
    imagen: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=400&q=80',
    disponible: true,
    stock: 55,
  },
  {
    catNombre: 'Bebidas',
    nombre: 'Refresco de Lata',
    descripcion: 'Coca-Cola, Sprite o Fanta. Fría y bien helada.',
    precio: 20,
    imagen: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80',
    disponible: true,
    stock: 100,
  },
];

// ──────────────────────────────────────────────
// EJECUTAR SEED
// ──────────────────────────────────────────────
async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI no definida en .env');

    console.log('🔗 Conectando a MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Conectado\n');

    // Limpiar colecciones existentes
    console.log('🗑️  Limpiando colecciones...');
    await Categoria.deleteMany({});
    await Producto.deleteMany({});
    console.log('   Colecciones vaciadas.\n');

    // Insertar categorías
    console.log('📂 Insertando categorías...');
    const categoriasInsertadas = await Categoria.insertMany(categorias);
    console.log(`   ${categoriasInsertadas.length} categorías creadas.\n`);

    // Construir mapa nombre → _id
    const mapaCategoria = {};
    categoriasInsertadas.forEach(c => { mapaCategoria[c.nombre] = c._id; });

    // Asignar _id de categoría a cada producto
    const productos = productosData.map(({ catNombre, ...resto }) => ({
      ...resto,
      categoria: mapaCategoria[catNombre],
    }));

    // Insertar productos
    console.log('🍽️  Insertando productos...');
    const productosInsertados = await Producto.insertMany(productos);
    console.log(`   ${productosInsertados.length} productos creados.\n`);

    console.log('🎉 Seed completado exitosamente.');
    console.log('━'.repeat(50));

    // Resumen
    const disponibles = productosInsertados.filter(p => p.disponible).length;
    const agotados    = productosInsertados.filter(p => !p.disponible).length;
    console.log(`   Disponibles: ${disponibles}`);
    console.log(`   Agotados:    ${agotados}`);
    console.log('━'.repeat(50));

  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado de MongoDB Atlas.');
  }
}

seed();
