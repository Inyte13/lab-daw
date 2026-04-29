import { Router } from 'express'
import { DiaController } from '../controllers/diaController.js'

const router = Router()
const diaController = new DiaController()

router.get('/dia', diaController.readAllDias)

export default router
