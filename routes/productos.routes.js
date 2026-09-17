import { Router } from 'express'
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productos.controller.js'
import { validarObjectId } from '../middlewares/validarObjectId.js'

const router = Router()

router.get('/', listarProductos)
router.get('/:id', validarObjectId, obtenerProducto)
router.post('/', crearProducto)
router.put('/:id', validarObjectId, actualizarProducto)
router.delete('/:id', validarObjectId, eliminarProducto)

export default router
