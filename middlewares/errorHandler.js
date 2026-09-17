export function errorHandler(err, req, res, next) {
  console.error(err)

  // Errores de validación de Mongoose (schema required, min, match, etc.)
  if (err.name === 'ValidationError') {
    const errores = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({
      ok: false,
      mensaje: 'Error de validación',
      errores,
    })
  }

  // Id con formato válido de ObjectId pero que Mongoose no puede castear
  if (err.name === 'CastError') {
    return res.status(400).json({
      ok: false,
      mensaje: `El valor "${err.value}" no es válido para el campo "${err.path}"`,
    })
  }

  // Violación de índice único (por ejemplo, email o nombre de categoría repetido)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue)[0]
    return res.status(409).json({
      ok: false,
      mensaje: `Ya existe un registro con ese ${campo}`,
    })
  }

  res.status(err.status || 500).json({
    ok: false,
    mensaje: err.message || 'Error interno del servidor',
  })
}
