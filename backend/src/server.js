require('dotenv').config();
const path = require('path');
const express = require('express');
const conectarDB = require('./config/db');
// Registrar todos los modelos antes de que las rutas hagan populate()
require('./models/Categoria');
const productosRoutes = require('./routes/productos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

conectarDB();

// Sirve el frontend estático (catálogo, CSS y JS del cliente) desde
// backend/src/server.js -> ../../frontend
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

// RF1, RF5: endpoints del catálogo y control de disponibilidad/stock
app.use('/api/productos', productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Catálogo disponible en http://localhost:${PORT}`);
});

module.exports = app;