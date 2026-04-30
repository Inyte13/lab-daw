import './components/dia-component.js'
import { getDias } from './services/diaService.js'
import {
  deleteBloque,
  createBloque,
  updateBloque,
} from './services/bloqueService.js'

document.addEventListener('DOMContentLoaded', async () => {
  const diasContainer = document.getElementById('dias-container')
  diasContainer.innerHTML = '<p id="loading">Cargando eventos...</p>'

  try {
    const dias = await getDias()
    console.log(dias)
    diasContainer.innerHTML = ''
    if (dias.length === 0) {
      diasContainer.innerHTML = '<p>No hay eventos programados.</p>'
      return
    }
    const fragment = document.createDocumentFragment()

    dias.forEach(dia => {
      const diaComponent = document.createElement('dia-component')
      diaComponent.setAttribute('fecha', dia.fecha)
      diaComponent.bloques = dia.bloques
      fragment.appendChild(diaComponent)
    })

    diasContainer.appendChild(fragment)
  } catch {
    diasContainer.innerHTML = '<p>Error al cargar los eventos.</p>'
  }

  // Escuchamos los Custom Events que emiten los componentes
  diasContainer.addEventListener('bloque-editar', e => {
    const { fecha, hora, descripcion } = e.detail

    document.getElementById('edit-mode').value = 'true'
    document.getElementById('fecha-original').value = fecha
    document.getElementById('hora-original').value = hora

    document.getElementById('fecha').value = fecha
    document.getElementById('hora').value = hora
    document.getElementById('descripcion').value = descripcion

    document.querySelector('aside h2').textContent = 'Editar evento'
  })

  diasContainer.addEventListener('bloque-eliminar', async e => {
    const { fecha, hora } = e.detail
    try {
      await deleteBloque(fecha, hora)
      location.reload()
    } catch (err) {
      console.error('Error al eliminar el bloque', err)
    }
  })

  const btnNuevo = document.getElementById('btn-create')
  if (btnNuevo) {
    btnNuevo.addEventListener('click', () => {
      document.getElementById('edit-mode').value = 'false'
      document.getElementById('fecha-original').value = ''
      document.getElementById('hora-original').value = ''
      document.querySelector('form').reset()
      document.querySelector('aside h2').textContent = 'Crear evento'
    })
  }

  document.getElementById('btn-cancel').addEventListener('click', () => {
    document.getElementById('edit-mode').value = 'false'
    document.getElementById('fecha-original').value = ''
    document.getElementById('hora-original').value = ''
    document.querySelector('form').reset()
    document.querySelector('aside h2').textContent = 'Crear evento'
  })

  document.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault()

    const isEditMode = document.getElementById('edit-mode').value === 'true'
    const fecha = document.getElementById('fecha').value
    const hora = document.getElementById('hora').value
    const descripcion = document.getElementById('descripcion').value

    // Los datos que enviaremos al backend
    const data = { fecha, hora, descripcion }

    try {
      if (isEditMode) {
        const fechaOriginal = document.getElementById('fecha-original').value
        const horaOriginal = document.getElementById('hora-original').value

        await updateBloque(fechaOriginal, horaOriginal, data)
      } else {
        await createBloque(fecha, hora, data)
      }

      location.reload()
    } catch (err) {
      console.error('Error al guardar el evento', err)
    }
  })
})
