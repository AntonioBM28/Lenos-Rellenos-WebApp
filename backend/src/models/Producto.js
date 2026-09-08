const mongoose = require('mongoose');

// Modelo de Producto (leños rellenos), alineado al diagrama de base de
// datos del caso de estudio: nombre, descripcion, precio, imagen,
// categoria, disponible y stock.
const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      default: '',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    imagen: {
      type: String,
      default: '',
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
    },
    // RF5: Visualización de disponibilidad
    disponible: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);