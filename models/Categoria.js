import mongoose from 'mongoose'

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
    activa: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Categoria', categoriaSchema)
