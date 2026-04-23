document.body.innerHTML=`
  <div style="display: flex; gap: 10px">
    <main style="width: 400px; display: flex; flex-direction: column; gap: 8px">
      <header style="display: flex; background-color: #202b55; border-radius: 10px; height: 40px; padding: 10px;">
        <h1 class="expression" style="color: #fff; margin: 0px"></h1>
      </header>
      <div 
        class="wrapper-btns" style="flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(6, 1fr); gap: 4px;">
      </div>
    </main>
    <div class="historial" style="display: flex; flex-direction: column; justify-content: end; width: 100%; gap: 4px"></div>
  </div>
`
const expression = document.querySelector('.expression')
const wrapperBtns = document.querySelector('.wrapper-btns')
const labels = ['AC', 'C', '<-', '/', '(', ')', 'x', 'y', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=', 'Evaluar', 'Ingresar']
const actions = ['AC', 'C', '<-', 'Evaluar', 'Ingresar']
labels.forEach(label => {
  const btn = document.createElement(`button`)
  btn.textContent = label
  btn.style.margin = "0px"
  wrapperBtns.appendChild(btn)
})
wrapperBtns.lastElementChild.style.gridColumn = "1 / -1"
const pila = []
wrapperBtns.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return
  const value = e.target.textContent
  if (value === 'AC') {
    expression.textContent = ''
    return
  }
  if (value === 'C' || value === '<-') {
    expression.textContent = expression.textContent.slice(0, -1)
    return
  }
  if (value === 'Evaluar') {
    expression.textContent = eval(expression.textContent)
    return
  }
  if (value === 'Ingresar') {
    pila.push(expression.textContent)
    renderPila()
    return
  }
  expression.textContent += value
})

const historial = document.querySelector('.historial')
function renderPila() {
  historial.innerHTML = ''
  pila.slice().reverse().forEach(item => {
    const div = document.createElement(`div`)
    div.textContent = item
    div.style.padding = '6px'
    div.style.border = '1px solid #0c151c'
    div.style.borderRadius = "10px"
    div.style.content = '#fff'
    historial.appendChild(div)
  })
}

