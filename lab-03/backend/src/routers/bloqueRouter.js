import { Router } from 'express'
import { BloqueController } from '../controllers/bloqueController.js'
import { formatParams } from '../middlewares/formatParams.js'

const router = Router()
const bloqueController = new BloqueController()

router.post('/:fecha/:hora', formatParams, bloqueController.createBloque)

router.put('/:fecha/:hora', formatParams, bloqueController.updateBloque)

router.delete('/:fecha/:hora', formatParams, bloqueController.deleteBloque)

export default router
