import { BloqueService } from '../services/bloqueService.js'
import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from '../utils/errors.js'

export class BloqueController {
  constructor() {
    this.bloqueService = new BloqueService()
  }

  createBloque = async (req, res) => {
    try {
      const { fecha, hora } = req.params
      const { descripcion } = req.body
      const fechaFormat = fecha.replace(/-/g, '.')
      const horaFormat = hora.replace(/:/g, '.')
      const result = await this.bloqueService.createBloque(
        fechaFormat,
        horaFormat,
        descripcion
      )
      res.status(201).json(result)
    } catch (error) {
      if (error instanceof ValidationError)
        return res.status(400).json({ error: error.message })
      if (error instanceof ConflictError)
        return res.status(409).json({ error: error.message })
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  updateBloque = async (req, res) => {
    try {
      const { fecha, hora } = req.params
      const { descripcion } = req.body
      const fechaFormat = fecha.replace(/-/g, '.')
      const horaFormat = hora.replace(/:/g, '.')
      const result = await this.bloqueService.updateBloque(
        fechaFormat,
        horaFormat,
        descripcion
      )
      res.json(result)
    } catch (error) {
      if (error instanceof ValidationError)
        return res.status(400).json({ error: error.message })
      if (error instanceof NotFoundError)
        return res.status(404).json({ error: error.message })
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  deleteBloque = async (req, res) => {
    try {
      const { fecha, hora } = req.params
      const fechaFormat = fecha.replace(/-/g, '.')
      const horaFormat = hora.replace(/:/g, '.')
      await this.bloqueService.deleteBloque(fechaFormat, horaFormat)
      res.status(204).send()
    } catch (error) {
      if (error instanceof ValidationError)
        return res.status(400).json({ error: error.message })
      if (error instanceof NotFoundError)
        return res.status(404).json({ error: error.message })
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}
