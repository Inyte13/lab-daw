import fs from 'fs/promises'
import path from 'path'

const PRIV_PATH = path.resolve('priv')

export class BloqueRepository {
  async isExist(fecha, hora) {
    const bloquePath = path.join(PRIV_PATH, fecha, `${hora}.md`)
    try {
      // Verificamos que existe el markdown
      await fs.access(bloquePath)
      return true
    } catch {
      return false
    }
  }

  async create(fecha, hora, descripcion) {
    if (await this.isExist(fecha, hora)) {
      throw new Error(`El bloque de las ${hora} ya existe.`)
    }
    const diaPath = path.join(PRIV_PATH, fecha)
    const bloquePath = path.join(diaPath, `${hora}.md`)
    // Si no existe, la crea. Si ya existe, la ignora en silencio.
    await fs.mkdir(diaPath, { recursive: true })
    await fs.writeFile(bloquePath, descripcion, 'utf-8')
    return { fecha, hora, descripcion }
  }

  async update(fecha, hora, descripcion) {
    if (!(await this.isExist(fecha, hora))) {
      throw new Error(
        `El bloque de las ${hora} no existe. No se puede actualizar.`
      )
    }
    const diaPath = path.join(PRIV_PATH, fecha)
    const bloquePath = path.join(diaPath, `${hora}.md`)
    await fs.writeFile(bloquePath, descripcion, 'utf-8')
    return { fecha, hora, descripcion }
  }

  async delete(fecha, hora) {
    if (!(await this.isExist(fecha, hora))) return false
    const diaPath = path.join(PRIV_PATH, fecha)
    const bloquePath = path.join(diaPath, `${hora}.md`)
    // unlink, eliminar del disco
    await fs.unlink(bloquePath)
    return true
  }
}
