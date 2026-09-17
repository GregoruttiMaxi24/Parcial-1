import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'

import { conectarDB } from './config/db.js'
import productosRoutes from './routes/productos.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Rutas de la API
app.use('/api/productos', productosRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/usuarios', usuariosRoutes)

// 404 para rutas de API que no existen
app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' })
})

// Manejo centralizado de errores (siempre al final)
app.use(errorHandler)

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.cyan(`🚀 Servidor corriendo en http://localhost:${PORT}`))
  })
})
