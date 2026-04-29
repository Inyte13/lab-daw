import 'dotenv/config'
import express from 'express'

import diaRouter from './src/routers/diaRouter.js'
import bloqueRouter from './src/routers/bloqueRouter.js'

import path from 'path'
import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api', diaRouter)
app.use('/api', bloqueRouter)

// // Servir el frontend estático
// app.use(express.static(path.join(__dirname, 'pub')));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
