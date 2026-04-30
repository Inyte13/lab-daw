import { DiaService } from '../services/diaService.js'
import { format } from '../utils/format.js'

export class DiaController {
  constructor() {
    this.diaService = new DiaService()
  }

  readAllDias = async (req, res) => {
    try {
      const dias = await this.diaService.readAllDias()
      const diasFormat = dias.map(format)
      res.json(diasFormat)
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}
