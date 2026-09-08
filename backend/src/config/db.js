const mongoose = require('mongoose');

// Conexión a MongoDB Atlas. La URI real se toma de una variable de
// entorno (MONGODB_URI) y NUNCA se sube al repositorio — solo se define
// en un archivo .env local (ver .gitignore) o en la configuración de
// despliegue, precisamente porque el caso maneja datos de clientes y
// pedidos que deben protegerse.
async function conectarDB() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lenos-rellenos';
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = conectarDB;