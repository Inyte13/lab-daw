import fs from 'fs/promises'
import path from 'path'

const PRIV_PATH = path.resolve('priv')

export class DiaRepository {
  async readAll() {
    const dias = []
    // Te devuelve fs.Dirent, entradas del directorio
    const diasDir = await fs.readdir(PRIV_PATH, { withFileTypes: true })

    for (const diaDir of diasDir) {
      if (!diaDir.isDirectory()) continue
      const diaPath = path.join(PRIV_PATH, diaDir.name)
      const bloques = []
      const bloquesDir = await fs.readdir(diaPath, { withFileTypes: true })

      for (const bloqueDir of bloquesDir) {
        if (!bloqueDir.isFile() || !bloqueDir.name.endsWith('.md')) continue
        const hora = bloqueDir.name.replace('.md', '')
        const bloquePath = path.join(diaPath, bloqueDir.name)
        const descripcion = await fs.readFile(bloquePath, 'utf-8')

        bloques.push({
          hora: hora,
          descripcion: descripcion,
        })
      }
      bloques.sort((a, b) => a.hora.localeCompare(b.hora))

      dias.push({
        fecha: diaDir.name,
        bloques: bloques,
      })
    }
    dias.sort((a, b) => a.fecha.localeCompare(b.fecha))

    return dias
  }
}
