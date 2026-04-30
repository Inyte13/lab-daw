import { DiaRepository } from '../repositories/diaRepository.js'

export class DiaService {
  constructor() {
    this.diaRepository = new DiaRepository()
  }

  async readAllDias() {
    return await this.diaRepository.readAll()
  }
}
