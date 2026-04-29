import { BloqueRepository } from '../repositories/bloqueRepository.js'
import { Dia } from '../models/Dia.js'
import { Bloque } from '../models/Bloque.js'
import { NotFoundError, ConflictError } from '../utils/errors.js'

export class BloqueService {
  constructor() {
    this.bloqueRepository = new BloqueRepository()
  }

  async createBloque(fecha, hora, descripcion) {
    const dia = new Dia(fecha)
    const bloque = new Bloque(hora, descripcion)

    // Regla de negocio pura
    if (await this.bloqueRepository.isExist(dia.fecha, bloque.hora)) {
      throw new ConflictError('El bloque ya existe.')
    }

    return await this.bloqueRepository.create(
      dia.fecha,
      bloque.hora,
      bloque.descripcion
    )
  }

  async updateBloque(fecha, hora, descripcion) {
    const dia = new Dia(fecha)
    const bloque = new Bloque(hora, descripcion)

    // Regla de negocio pura
    if (!(await this.bloqueRepository.isExist(dia.fecha, bloque.hora))) {
      throw new NotFoundError('El bloque no existe.')
    }

    return await this.bloqueRepository.update(
      dia.fecha,
      bloque.hora,
      bloque.descripcion
    )
  }

  async deleteBloque(fecha, hora) {
    const dia = new Dia(fecha)
    const bloque = new Bloque(hora, '')

    // Regla de negocio pura
    if (!(await this.bloqueRepository.isExist(dia.fecha, bloque.hora))) {
      throw new NotFoundError('El bloque no existe.')
    }

    return await this.bloqueRepository.delete(dia.fecha, bloque.hora)
  }
}
