import { Router } from 'express'
import {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from '../controllers/categorias.controller.js'
import { validarObjectId } from '../middlewares/validarObjectId.js'

const router = Router()

router.get('/', listarCategorias)
router.get('/:id', validarObjectId, obtenerCategoria)
router.post('/', crearCategoria)
router.put('/:id', validarObjectId, actualizarCategoria)
router.delete('/:id', validarObjectId, eliminarCategoria)

export default router
