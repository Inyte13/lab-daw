const API_URL = '/api'

export async function getDias() {
  try {
    const response = await fetch(`${API_URL}/dia`)
    if (!response.ok) throw new Error('Error al obtener días')
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}
