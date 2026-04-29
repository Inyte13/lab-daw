import { ValidationError } from '../utils/errors.js'

export class Dia {
  constructor(fecha) {
    this.validate(fecha)
    this.fecha = fecha
    this.bloques = []
  }

  validate(fecha) {
    // Verifica el formato exacto: YYYY.MM.DD
    const regex = /^\d{4}\.\d{2}\.\d{2}$/
    if (!regex.test(fecha)) {
      throw new ValidationError(
        `Formato de fecha inválido: '${fecha}'. Debe ser YYYY.MM.DD`
      )
    }

    const [anio, mes, dia] = fecha.split('.').map(Number)
    if (anio <= 0) {
      throw new ValidationError(`El año '${anio}' es inválido.`)
    }
    // Convertimos lo mandando en un Date
    const date = new Date(anio, mes - 1, dia)
    if (
      date.getFullYear() !== anio ||
      date.getMonth() !== mes - 1 ||
      date.getDate() !== dia
    ) {
      throw new ValidationError(`La fecha '${fecha}' es inválida.`)
    }
  }
}
