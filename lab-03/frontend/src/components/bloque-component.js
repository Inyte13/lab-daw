export class BloqueComponent extends HTMLElement {
  connectedCallback() {
    this.render()
    this.setupListeners()
  }

  render() {
    const hora = this.getAttribute('hora')
    const descripcion = this.getAttribute('descripcion')
    this.innerHTML = `
      <article>
        <time>${hora}</time>
        <p>${descripcion}</p>
        <div>
          <button class="btn-editar">Editar</button>
          <button class="btn-eliminar">Eliminar</button>
        </div>
      </article>
    `
  }

  setupListeners() {
    const btnEditar = this.querySelector('.btn-editar')
    const btnEliminar = this.querySelector('.btn-eliminar')

    btnEditar.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('bloque-editar', {
          detail: {
            fecha: this.getAttribute('fecha'),
            hora: this.getAttribute('hora'),
            descripcion: this.getAttribute('descripcion'),
          },
          bubbles: true, // Hace que el evento suba (burbujee) hasta llegar al main.js
          composed: true, // Permite que atraviese componentes anidados
        })
      )
    })

    btnEliminar.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('bloque-eliminar', {
          detail: {
            fecha: this.getAttribute('fecha'),
            hora: this.getAttribute('hora'),
          },
          bubbles: true,
          composed: true,
        })
      )
    })
  }
}

customElements.define('bloque-component', BloqueComponent)
