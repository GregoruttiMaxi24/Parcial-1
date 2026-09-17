import { Router } from 'express'
import {
  registrarUsuario,
  loginUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/usuarios.controller.js'
import { validarObjectId } from '../middlewares/validarObjectId.js'

const router = Router()

router.post('/registro', registrarUsuario)
router.post('/login', loginUsuario)
router.get('/', listarUsuarios)
router.get('/:id', validarObjectId, obtenerUsuario)
router.put('/:id', validarObjectId, actualizarUsuario)
router.delete('/:id', validarObjectId, eliminarUsuario)

export default router
