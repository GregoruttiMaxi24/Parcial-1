import Categoria from '../models/Categoria.js'

// GET /api/categorias
// Soporta filtro por "activa" (?activa=true|false) y búsqueda por nombre (?buscar=texto)
export async function listarCategorias(req, res, next) {
  try {
    const { activa, buscar } = req.query
    const filtro = {}

    if (activa !== undefined) {
      filtro.activa = activa === 'true'
    }

    if (buscar) {
      filtro.nombre = { $regex: buscar, $options: 'i' }
    }

    const categorias = await Categoria.find(filtro).sort({ nombre: 1 })
    res.json({ ok: true, total: categorias.length, categorias })
  } catch (error) {
    next(error)
  }
}

// GET /api/categorias/:id
export async function obtenerCategoria(req, res, next) {
  try {
    const categoria = await Categoria.findById(req.params.id)

    if (!categoria) {
      return res.status(404).json({ ok: false, mensaje: 'Categoría no encontrada' })
    }

    res.json({ ok: true, categoria })
  } catch (error) {
    next(error)
  }
}

// POST /api/categorias
export async function crearCategoria(req, res, next) {
  try {
    const { nombre, descripcion, activa } = req.body

    if (!nombre || !nombre.trim()) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'El nombre de la categoría es obligatorio' })
    }

    const categoria = await Categoria.create({ nombre, descripcion, activa })
    res.status(201).json({ ok: true, categoria })
  } catch (error) {
    next(error)
  }
}

// PUT /api/categorias/:id
export async function actualizarCategoria(req, res, next) {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!categoria) {
      return res.status(404).json({ ok: false, mensaje: 'Categoría no encontrada' })
    }

    res.json({ ok: true, categoria })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/categorias/:id
export async function eliminarCategoria(req, res, next) {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id)

    if (!categoria) {
      return res.status(404).json({ ok: false, mensaje: 'Categoría no encontrada' })
    }

    res.json({ ok: true, mensaje: 'Categoría eliminada correctamente' })
  } catch (error) {
    next(error)
  }
}
