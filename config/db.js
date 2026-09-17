import mongoose from 'mongoose'
import chalk from 'chalk'

export async function conectarDB() {
  try {
    const uri = process.env.MONGO_URI

    if (!uri) {
      throw new Error(
        'Falta la variable de entorno MONGO_URI.'
      )
    }

    await mongoose.connect(uri)
    console.log(chalk.green('✔ Conectado a MongoDB correctamente'))
  } catch (error) {
    console.error(chalk.red('✖ Error al conectar a MongoDB:'), error.message)
    process.exit(1)
  }
}
