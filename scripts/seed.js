import 'dotenv/config'
import mongoose from 'mongoose'
import chalk from 'chalk'
import { conectarDB } from '../config/db.js'
import Categoria from '../models/Categoria.js'
import Producto from '../models/Producto.js'

const CATEGORIAS = [
  { nombre: 'Procesadores', descripcion: 'CPUs Intel y AMD' },
  { nombre: 'Placas de Video', descripcion: 'Placas gráficas para gaming y diseño' },
  { nombre: 'Memorias RAM', descripcion: 'Memorias DDR4 y DDR5' },
  { nombre: 'Almacenamiento', descripcion: 'Discos SSD y HDD' },
  { nombre: 'Placas Madre', descripcion: 'Motherboards para Intel y AMD' },
  { nombre: 'Fuentes de Poder', descripcion: 'Fuentes ATX certificadas 80+' },
  { nombre: 'Gabinetes', descripcion: 'Gabinetes ATX y micro ATX' },
  { nombre: 'Periféricos', descripcion: 'Teclados, mouses y auriculares' },
  { nombre: 'Monitores', descripcion: 'Monitores para gaming y oficina' },
  { nombre: 'Refrigeración', descripcion: 'Coolers y sistemas de refrigeración líquida' },
]

function img(nombre) {
  return `https://placehold.co/500x400?text=${encodeURIComponent(nombre)}`
}

async function seed() {
  await conectarDB()

  console.log(chalk.yellow('Borrando datos anteriores de productos y categorías...'))
  await Producto.deleteMany({})
  await Categoria.deleteMany({})

  console.log(chalk.yellow('Creando categorías...'))
  const categoriasCreadas = await Categoria.insertMany(CATEGORIAS)
  const idPorNombre = Object.fromEntries(
    categoriasCreadas.map((c) => [c.nombre, c._id])
  )

  const PRODUCTOS = [
    {
      nombre: 'AMD Ryzen 5 5600X',
      descripcion: '6 núcleos / 12 hilos, hasta 4.6GHz',
      precio: 145000,
      stock: 12,
      marca: 'AMD',
      categoria: idPorNombre['Procesadores'],
      destacado: true,
    },
    {
      nombre: 'Intel Core i5-13400F',
      descripcion: '10 núcleos, ideal para gaming',
      precio: 165000,
      stock: 8,
      marca: 'Intel',
      categoria: idPorNombre['Procesadores'],
      destacado: true,
    },
    {
      nombre: 'NVIDIA GeForce RTX 4060',
      descripcion: '8GB GDDR6, ray tracing',
      precio: 420000,
      stock: 5,
      marca: 'NVIDIA',
      categoria: idPorNombre['Placas de Video'],
      destacado: true,
    },
    {
      nombre: 'AMD Radeon RX 7600',
      descripcion: '8GB GDDR6, buen rendimiento en 1080p',
      precio: 380000,
      stock: 6,
      marca: 'AMD',
      categoria: idPorNombre['Placas de Video'],
    },
    {
      nombre: 'Kingston Fury Beast 16GB DDR4',
      descripcion: '3200MHz, un módulo',
      precio: 38000,
      stock: 25,
      marca: 'Kingston',
      categoria: idPorNombre['Memorias RAM'],
    },
    {
      nombre: 'Corsair Vengeance 32GB DDR5',
      descripcion: 'Kit 2x16GB, 5600MHz',
      precio: 95000,
      stock: 10,
      marca: 'Corsair',
      categoria: idPorNombre['Memorias RAM'],
      destacado: true,
    },
    {
      nombre: 'SSD Kingston NV2 1TB NVMe',
      descripcion: 'PCIe 4.0, hasta 3500MB/s',
      precio: 62000,
      stock: 18,
      marca: 'Kingston',
      categoria: idPorNombre['Almacenamiento'],
    },
    {
      nombre: 'HDD Seagate Barracuda 2TB',
      descripcion: '7200RPM, SATA III',
      precio: 55000,
      stock: 14,
      marca: 'Seagate',
      categoria: idPorNombre['Almacenamiento'],
    },
    {
      nombre: 'ASUS Prime B550M-A',
      descripcion: 'Micro ATX, socket AM4',
      precio: 98000,
      stock: 7,
      marca: 'ASUS',
      categoria: idPorNombre['Placas Madre'],
    },
    {
      nombre: 'EVGA 600W 80+ Bronze',
      descripcion: 'Fuente certificada, no modular',
      precio: 58000,
      stock: 20,
      marca: 'EVGA',
      categoria: idPorNombre['Fuentes de Poder'],
    },
    {
      nombre: 'Cooler Master MasterBox Q300L',
      descripcion: 'Micro ATX, panel lateral acrílico',
      precio: 72000,
      stock: 9,
      marca: 'Cooler Master',
      categoria: idPorNombre['Gabinetes'],
    },
    {
      nombre: 'Teclado Mecánico Redragon Kumara',
      descripcion: 'Switches azules, retroiluminado',
      precio: 45000,
      stock: 30,
      marca: 'Redragon',
      categoria: idPorNombre['Periféricos'],
      destacado: true,
    },
    {
      nombre: 'Mouse Logitech G203',
      descripcion: '8000 DPI, RGB',
      precio: 25000,
      stock: 40,
      marca: 'Logitech',
      categoria: idPorNombre['Periféricos'],
    },
    {
      nombre: 'Auriculares HyperX Cloud Stinger',
      descripcion: 'Livianos, con micrófono abatible',
      precio: 48000,
      stock: 22,
      marca: 'HyperX',
      categoria: idPorNombre['Periféricos'],
    },
    {
      nombre: 'Monitor LG 24" Full HD 165Hz',
      descripcion: 'Panel IPS, ideal para gaming',
      precio: 210000,
      stock: 6,
      marca: 'LG',
      categoria: idPorNombre['Monitores'],
      destacado: true,
    },
    {
      nombre: 'Cooler Master Hyper 212',
      descripcion: 'Disipador por aire, doble ventilador',
      precio: 42000,
      stock: 15,
      marca: 'Cooler Master',
      categoria: idPorNombre['Refrigeración'],
    },
  ].map((p) => ({ ...p, imagen: img(p.nombre) }))

  console.log(chalk.yellow('Creando productos...'))
  await Producto.insertMany(PRODUCTOS)

  console.log(
    chalk.green(
      `✔ Listo: ${categoriasCreadas.length} categorías y ${PRODUCTOS.length} productos creados.`
    )
  )

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((error) => {
  console.error(chalk.red('✖ Error al poblar la base:'), error)
  process.exit(1)
})
