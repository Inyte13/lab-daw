const mensaje = document.createElement("h1");
mensaje.innerText = "Juego del Ahorcado";
document.body.appendChild(mensaje);

const btnInicio = document.createElement("button");
btnInicio.innerText = "Iniciar Juego";
btnInicio.onclick = iniciarJuego;
document.body.appendChild(btnInicio);

const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 250;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const pPalabra = document.createElement("p");
pPalabra.id = "palabra";
document.body.appendChild(pPalabra);

const contenedorLetras = document.createElement("div");
contenedorLetras.id = "letras";
document.body.appendChild(contenedorLetras);

// datos del juego
const palabras = ["AREQUIPA", "MISTI", "CHACHANI", "PAMPACOLCA"];
let palabra = "";
let oculta = [];
let errores = 0;
let maxErrores = 10; // ahora son 10 errores

function iniciarJuego() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)];
  oculta = Array(palabra.length).fill("_");
  errores = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pPalabra.innerText = oculta.join(" ");
  generarBotones();
}

function generarBotones() {
  contenedorLetras.innerHTML = "";
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  letras.split("").forEach(letra => {
    const btn = document.createElement("button");
    btn.innerText = letra;
    btn.style.margin = "2px";
    btn.onclick = () => manejarLetra(letra, btn);
    contenedorLetras.appendChild(btn);
  });
}

function manejarLetra(letra, btn) {
  btn.disabled = true;

  if (palabra.includes(letra)) {
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) oculta[i] = letra;
    }
  } else {
    errores++;
    dibujar(errores);
  }

  pPalabra.innerText = oculta.join(" ");
  verificar();
}

function verificar() {
  if (!oculta.includes("_")) {
    deshabilitarBotones();
    setTimeout(() => alert("¡Ganaste!"), 100);
  } else if (errores >= maxErrores) {
    deshabilitarBotones();
    setTimeout(() => alert("Perdiste. La palabra era: " + palabra), 100);
  }
}

function deshabilitarBotones() {
  const botones = contenedorLetras.querySelectorAll("button");
  botones.forEach(b => b.disabled = true);
}

// Dibujo paso a paso (10 errores)
function dibujar(paso) {
  ctx.lineWidth = 3;

  switch (paso) {
    case 1: ctx.fillRect(10, 230, 180, 5); break; // base
    case 2: ctx.fillRect(30, 50, 5, 180); break; // poste vertical
    case 3: ctx.fillRect(30, 50, 120, 5); break; // poste horizontal
    case 4: ctx.fillRect(150, 50, 5, 20); break; // cuerda

    case 5:
      ctx.beginPath();
      ctx.arc(152, 80, 12, 0, Math.PI * 2);
      ctx.stroke();
      break; // cabeza

    case 6: ctx.fillRect(150, 92, 4, 40); break; // cuerpo

    case 7:
      ctx.beginPath();
      ctx.moveTo(152, 100);
      ctx.lineTo(130, 120);
      ctx.stroke();
      break; // brazo izq

    case 8:
      ctx.beginPath();
      ctx.moveTo(152, 100);
      ctx.lineTo(175, 120);
      ctx.stroke();
      break; // brazo der

    case 9:
      ctx.beginPath();
      ctx.moveTo(152, 130);
      ctx.lineTo(130, 170);
      ctx.stroke();
      break; // pierna izq

    case 10:
      ctx.beginPath();
      ctx.moveTo(152, 130);
      ctx.lineTo(175, 170);
      ctx.stroke();
      break; // pierna der
  }
}
