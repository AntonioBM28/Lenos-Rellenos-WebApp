const express = require('express');
const conectarDB = require('./config/db');
const productosRoutes = require('./routes/productos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

conectarDB();

// RF1, RF5: endpoints del catálogo y control de disponibilidad/stock
app.use('/api/productos', productosRoutes);

app.get('/', (req, res) => {
  res.send('API de Leños Rellenos funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;