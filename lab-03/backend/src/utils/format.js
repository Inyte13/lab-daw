export const format = dia => ({
  fecha: dia.fecha.replace(/\./g, '-'),
  bloques: dia.bloques.map(bloque => ({
    hora: bloque.hora.replace(/\./g, ':'),
    descripcion: bloque.descripcion,
  })),
})
