import './bloque-component.js'

export class DiaComponent extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    const fecha = this.getAttribute('fecha')
    const bloques = this.bloques || []
    this.innerHTML = `
      <section>
        <header>
          <time datetime="${fecha}">${fecha}</time>
        </header>
        <div>
          ${bloques
            .map(
              bloque =>
                `<bloque-component fecha="${fecha}" hora="${bloque.hora}" descripcion="${bloque.descripcion}"></bloque-component>`
            )
            .join('')}
        </div>
      </section>
    `
  }
}

customElements.define('dia-component', DiaComponent)
