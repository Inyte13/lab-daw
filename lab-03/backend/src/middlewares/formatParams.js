export const formatParams = (req, res, next) => {
  // Si en la URL viene una fecha, la convertimos a punto
  if (req.params.fecha) {
    req.params.fecha = req.params.fecha.replace(/-/g, '.')
  }
  // Si en la URL viene una hora, la convertimos a punto
  if (req.params.hora) {
    req.params.hora = req.params.hora.replace(/:/g, '.')
  }
  next()
}
