const entrada = document.querySelector('.entrada')
const salida = document.querySelector('.salida')
const numBtns = document.querySelectorAll('.numero')
const operadorBtns = document.querySelectorAll('.operador')
const limpiarBtn = document.querySelector('.limpiar')
const deleteButton = document.querySelector('.eliminar')
const equalButton = document.querySelector('.igual')

class Calculadora {
  constructor(entrada, salida) {
    this.entrada = entrada
    this.salida = salida
  }

  limpiar() {
    this.entrada = ''
    this.salida = ''
  }

  eliminar() {
    this.entrada = this.entrada.toString().slice(0, -1)
  }

  calcular() {
    const operadores = {
      '*': 3
    
  }
}


