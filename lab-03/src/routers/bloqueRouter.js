import { Router } from 'express'
import { BloqueController } from '../controllers/bloqueController.js'

const router = Router()
const bloqueController = new BloqueController()

router.post('/:fecha/:hora', bloqueController.createBloque)

router.put('/:fecha/:hora', bloqueController.updateBloque)

router.delete('/:fecha/:hora', bloqueController.deleteBloque)

export default router
