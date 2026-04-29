import { DiaService } from '../services/diaService.js'

export class DiaController {
  constructor() {
    this.diaService = new DiaService()
  }

  readAllDias = async (req, res) => {
    try {
      const dias = await this.diaService.readAllDias()
      // Transformamos el formato
      const diasFormat = dias.map(dia => ({
        date: dia.date.replace(/\./g, '-'),
        bloques: dia.bloques.map(b => ({
          hora: b.hora.replace(/\./g, ':'),
          descripcion: b.descripcion,
        })),
      }))
      res.json(diasFormat)
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}
