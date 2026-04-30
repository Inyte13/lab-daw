const API_URL = '/api'

export async function createBloque(fecha, hora, data) {
  try {
    const response = await fetch(`${API_URL}/${fecha}/${hora}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Error al crear bloque')
    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateBloque(fecha, hora, data) {
  try {
    const response = await fetch(`${API_URL}/${fecha}/${hora}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Error al actualizar bloque')
    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function deleteBloque(fecha, hora) {
  try {
    const response = await fetch(`${API_URL}/${fecha}/${hora}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Error al eliminar bloque')
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}
