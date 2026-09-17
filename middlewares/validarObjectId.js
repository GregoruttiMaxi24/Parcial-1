import mongoose from 'mongoose'

export function validarObjectId(req, res, next) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      ok: false,
      mensaje: `El id "${id}" no tiene un formato válido`,
    })
  }

  next()
}
