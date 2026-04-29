import { ValidationError } from '../utils/errors.js'

export class Bloque {
  constructor(hora, descripcion = '') {
    this.validate(hora)
    if (typeof descripcion !== 'string') {
      throw new ValidationError('La descripción debe ser texto.')
    }
    this.hora = hora
    this.descripcion = descripcion
  }

  validate(hora) {
    const regex = /^\d{2}\.\d{2}$/
    if (!regex.test(hora)) {
      throw new ValidationError(
        `Formato de hora inválido: '${hora}'. Debe ser HH.MM`
      )
    }

    const [horas, minutos] = hora.split('.').map(Number)
    if (horas < 0 || 23 < horas) {
      throw new ValidationError(`La hora '${horas}' es inválida (use 00 a 23).`)
    }
    if (minutos < 0 || 59 < minutos) {
      throw new ValidationError(
        `Los minutos '${minutos}' son inválidos (use 00 a 59).`
      )
    }
  }
}
