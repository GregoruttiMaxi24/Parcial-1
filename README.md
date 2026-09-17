# API de Componentes de PC y Periféricos — Parcial 1

API RESTful de una tienda de componentes de computadora y periféricos, hecha
con Node.js, Express y MongoDB (Mongoose).

## Datos del proyecto

- **Nombre y Apellido:** Alan Ortiz - Maximo Gregorutti
- **Materia:** Aplicaciones Híbridas
- **Docente:** Jonathan Emanuel Cruz
- **Comisión:** DWN4AV

## Stack utilizado

- Node.js + Express 5
- MongoDB + Mongoose
- bcrypt (hash de contraseñas)
- dotenv (variables de entorno)
- chalk (logs de consola)

## Estructura del proyecto

```
config/         Conexión a MongoDB
controllers/    Lógica de cada recurso (categorías, productos, usuarios)
models/         Esquemas de Mongoose
routes/         Definición de rutas de la API
middlewares/    Validación de ids y manejo de errores
public/         Página HTML informativa de la API
scripts/        Script para cargar datos de ejemplo
index.js        Punto de entrada del servidor
```

### Categorías (`/api/categorias`)

| Método | Endpoint              | Descripción                                                        |
| ------ | ---------------------- | ------------------------------------------------------------------- |
| GET    | `/api/categorias`      | Lista todas. Filtro `?activa=true`, búsqueda `?buscar=texto`        |
| GET    | `/api/categorias/:id`  | Obtiene una por id                                                   |
| POST   | `/api/categorias`      | Crea una (`nombre`, `descripcion`, `activa`)                         |
| PUT    | `/api/categorias/:id`  | Actualiza una existente                                              |
| DELETE | `/api/categorias/:id`  | Elimina una                                                          |

### Productos (`/api/productos`)

| Método | Endpoint              | Descripción                                                        |
| ------ | ---------------------- | ------------------------------------------------------------------- |
| GET    | `/api/productos`       | Lista todos. Filtros combinables: `?categoria=`, `?marca=`, `?destacado=true`, `?enStock=true`, `?precioMin=`, `?precioMax=`. Búsqueda: `?buscar=texto` |
| GET    | `/api/productos/:id`   | Obtiene uno por id                                                   |
| POST   | `/api/productos`       | Crea uno (`nombre`, `precio`, `stock`, `marca`, `categoria`, `imagen`, `destacado`) |
| PUT    | `/api/productos/:id`   | Actualiza uno existente                                              |
| DELETE | `/api/productos/:id`   | Elimina uno                                                          |

`categoria` debe ser el `_id` de una categoría ya creada (o, para probar
rápido a mano, también acepta el **nombre** exacto de la categoría, por
ejemplo `"Procesadores"`).

Si no se envía `imagen`, se genera automáticamente un placeholder con el
nombre del producto (`https://placehold.co/500x400?text=...`).

### Usuarios (`/api/usuarios`)

No cuenta como una de las dos rutas principales del parcial.

| Método | Endpoint                 | Descripción                              |
| ------ | ------------------------- | ------------------------------------------ |
| POST   | `/api/usuarios/registro`  | Crea un usuario (`nombre`, `email`, `password`, `rol`) |
| POST   | `/api/usuarios/login`     | Inicia sesión (`email`, `password`)        |
| GET    | `/api/usuarios`           | Lista usuarios. Filtro `?rol=`, búsqueda `?buscar=texto` |
| GET    | `/api/usuarios/:id`       | Obtiene uno por id                         |
| PUT    | `/api/usuarios/:id`       | Actualiza uno existente                    |
| DELETE | `/api/usuarios/:id`       | Elimina uno                                |

## Validaciones incluidas

- Campos obligatorios (nombre, precio, categoría, email, contraseña, etc.)
  validados tanto a nivel de esquema (Mongoose) como en los controladores.
- El `id` de la URL se valida como `ObjectId` válido de Mongo antes de
  consultar la base (middleware `validarObjectId`).
- Al crear o actualizar un producto, se verifica que la `categoria` indicada
  exista realmente en la base.
- Email con formato válido y único; contraseña con mínimo 6 caracteres,
  guardada siempre hasheada con `bcrypt`.
- Nombre de categoría único (no permite duplicados).
- Manejo centralizado de errores (`middlewares/errorHandler.js`): errores de
  validación de Mongoose, ids duplicados (email/categoría repetida) y
  errores de casteo devuelven respuestas claras con el status HTTP
  correspondiente (400, 404, 409).

## Formato de respuesta

Todas las respuestas devuelven JSON con la forma:

```json
{ "ok": true, "productos": [...] }
```

o, en caso de error:

```json
{ "ok": false, "mensaje": "Descripción del error" }
```
