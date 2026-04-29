import fs from 'fs/promises'
import path from 'path'

const PRIV_PATH = path.resolve('priv')

export class BloqueRepository {
  async isExist(fecha, hora) {
    const bloquePath = path.join(PRIV_PATH, fecha, `${hora}.md`)
    try {
      await fs.access(bloquePath)
      return true
    } catch {
      return false
    }
  }

  async create(fecha, hora, descripcion) {
    const diaPath = path.join(PRIV_PATH, fecha)
    const bloquePath = path.join(diaPath, `${hora}.md`)
    try {
      await fs.access(diaPath)
    } catch {
      await fs.mkdir(diaPath, { recursive: true })
    }
    await fs.writeFile(bloquePath, descripcion, 'utf-8')
    return { fecha, hora, descripcion }
  }

  async update(fecha, hora, descripcion) {
    const diaPath = path.join(PRIV_PATH, fecha)
    const bloquePath = path.join(diaPath, `${hora}.md`)
    await fs.writeFile(bloquePath, descripcion, 'utf-8')
    return { fecha, hora, descripcion }
  }

  async delete(fecha, hora) {
    const diaPath = path.join(PRIV_PATH, fecha)
    const bloquePath = path.join(diaPath, `${hora}.md`)
    await fs.unlink(bloquePath)
    return true
  }
}
