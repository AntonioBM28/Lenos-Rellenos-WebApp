const Producto = require('../models/Producto');

// RF1: Visualización de productos.
// El catálogo público del cliente solo debe mostrar productos disponibles
// y con stock, tal como lo exige RF5 (no se deben mostrar productos
// agotados en el menú).
async function obtenerProductosDisponibles(req, res) {
  try {
    const productos = await Producto.find({
      disponible: true,
      stock: { $gt: 0 },
    }).populate('categoria');
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
}

// Panel de Administración: el dueño del negocio necesita ver TODOS los
// productos, incluyendo los agotados o desactivados, para poder
// gestionarlos (ver Gestión de Inventario en el caso de estudio).
async function obtenerTodosLosProductos(req, res) {
  try {
    const productos = await Producto.find().populate('categoria');
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
}

async function obtenerProductoPorId(req, res) {
  try {
    const producto = await Producto.findById(req.params.id).populate('categoria');
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el producto', error: error.message });
  }
}

async function crearProducto(req, res) {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el producto', error: error.message });
  }
}

// RF5: si el administrador actualiza el stock a 0 (o menos), el producto
// se marca automáticamente como no disponible, para que nunca se le
// muestre al cliente un producto sin existencias (evita el problema de
// "complicaciones en la coordinación de entregas" descrito en el caso).
async function actualizarProducto(req, res) {
  try {
    const datosActualizados = { ...req.body };

    if (datosActualizados.stock !== undefined && datosActualizados.stock <= 0) {
      datosActualizados.disponible = false;
    }

    const producto = await Producto.findByIdAndUpdate(req.params.id, datosActualizados, {
      new: true,
      runValidators: true,
    });

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el producto', error: error.message });
  }
}

async function eliminarProducto(req, res) {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
  }
}

module.exports = {
  obtenerProductosDisponibles,
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};