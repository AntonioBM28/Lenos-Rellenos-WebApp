const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// RF1: catálogo público — solo productos disponibles con stock
router.get('/', productosController.obtenerProductosDisponibles);

// Panel de Administración: listado completo (incluye agotados/inactivos)
router.get('/admin/todos', productosController.obtenerTodosLosProductos);

router.get('/:id', productosController.obtenerProductoPorId);
router.post('/', productosController.crearProducto);
router.put('/:id', productosController.actualizarProducto);
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;