import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'

function sinPassword(usuario) {
  const { password, ...resto } = usuario.toObject()
  return resto
}

// POST /api/usuarios/registro
export async function registrarUsuario(req, res, next) {
  try {
    const { nombre, email, password, rol } = req.body

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'Nombre, email y contraseña son obligatorios' })
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La contraseña debe tener al menos 6 caracteres',
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const usuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol,
    })

    res.status(201).json({ ok: true, usuario: sinPassword(usuario) })
  } catch (error) {
    next(error)
  }
}

// POST /api/usuarios/login
export async function loginUsuario(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'Email y contraseña son obligatorios' })
    }

    const usuario = await Usuario.findOne({ email: email.toLowerCase() })
    if (!usuario) {
      return res.status(401).json({ ok: false, mensaje: 'Email o contraseña incorrectos' })
    }

    const coincide = await bcrypt.compare(password, usuario.password)
    if (!coincide) {
      return res.status(401).json({ ok: false, mensaje: 'Email o contraseña incorrectos' })
    }

    res.json({ ok: true, usuario: sinPassword(usuario) })
  } catch (error) {
    next(error)
  }
}

// GET /api/usuarios
export async function listarUsuarios(req, res, next) {
  try {
    const { rol, buscar } = req.query
    const filtro = {}

    if (rol) filtro.rol = rol
    if (buscar) filtro.nombre = { $regex: buscar, $options: 'i' }

    const usuarios = await Usuario.find(filtro).select('-password')
    res.json({ ok: true, total: usuarios.length, usuarios })
  } catch (error) {
    next(error)
  }
}

// GET /api/usuarios/:id
export async function obtenerUsuario(req, res, next) {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password')

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' })
    }

    res.json({ ok: true, usuario })
  } catch (error) {
    next(error)
  }
}

// PUT /api/usuarios/:id
export async function actualizarUsuario(req, res, next) {
  try {
    const cambios = { ...req.body }

    if (cambios.password) {
      if (cambios.password.length < 6) {
        return res.status(400).json({
          ok: false,
          mensaje: 'La contraseña debe tener al menos 6 caracteres',
        })
      }
      cambios.password = await bcrypt.hash(cambios.password, 10)
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, cambios, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' })
    }

    res.json({ ok: true, usuario })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/usuarios/:id
export async function eliminarUsuario(req, res, next) {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id)

    if (!usuario) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' })
    }

    res.json({ ok: true, mensaje: 'Usuario eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}
