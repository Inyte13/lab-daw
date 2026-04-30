import 'dotenv/config'
import express from 'express'
import diaRouter from './src/routers/diaRouter.js'
import bloqueRouter from './src/routers/bloqueRouter.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api', diaRouter)
app.use('/api', bloqueRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
})
