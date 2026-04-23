// --- CONFIGURACIÓN DE UI ---
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
pPalabra.style.fontSize = "2rem";
pPalabra.style.letterSpacing = "5px";
document.body.appendChild(pPalabra);

const contenedorLetras = document.createElement("div");
contenedorLetras.id = "letras";
document.body.appendChild(contenedorLetras);

// --- VARIABLES DEL JUEGO ---
const palabras = ["AREQUIPA", "MISTI", "CHACHANI", "PAMPACOLCA"];
let palabra = "";
let oculta = [];
let errores = 0;
let maxErrores = 6; // Ajustado a las partes del cuerpo humano (sin contar la horca inicial)

// --- LÓGICA PRINCIPAL ---

function iniciarJuego() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)];
  oculta = Array(palabra.length).fill("_");
  errores = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarHorca(); // Dibujamos la estructura desde el inicio
  
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
    dibujarPersonaje(errores);
  }

  pPalabra.innerText = oculta.join(" ");
  verificar();
}

function verificar() {
  if (!oculta.includes("_")) {
    deshabilitarBotones();
    setTimeout(() => alert("¡Ganaste! 🎉"), 100);
  } else if (errores >= maxErrores) {
    deshabilitarBotones();
    setTimeout(() => alert("Perdiste. La palabra era: " + palabra), 100);
  }
}

function deshabilitarBotones() {
  const botones = contenedorLetras.querySelectorAll("button");
  botones.forEach(b => b.disabled = true);
}

// --- DIBUJO EN CANVAS ---

function dibujarHorca() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#333";
  // Base
  ctx.strokeRect(10, 230, 180, 2); 
  // Poste vertical
  ctx.beginPath();
  ctx.moveTo(30, 230);
  ctx.lineTo(30, 20);
  // Poste horizontal
  ctx.lineTo(150, 20);
  // Cuerda
  ctx.lineTo(150, 50);
  ctx.stroke();
}

function dibujarPersonaje(paso) {
  ctx.lineWidth = 3;
  ctx.beginPath();
  switch (paso) {
    case 1: // Cabeza
      ctx.arc(150, 70, 20, 0, Math.PI * 2);
      break;
    case 2: // Cuerpo
      ctx.moveTo(150, 90);
      ctx.lineTo(150, 160);
      break;
    case 3: // Brazo izq
      ctx.moveTo(150, 110);
      ctx.lineTo(120, 140);
      break;
    case 4: // Brazo der
      ctx.moveTo(150, 110);
      ctx.lineTo(180, 140);
      break;
    case 5: // Pierna izq
      ctx.moveTo(150, 160);
      ctx.lineTo(120, 200);
      break;
    case 6: // Pierna der
      ctx.moveTo(150, 160);
      ctx.lineTo(180, 200);
      break;
  }
  ctx.stroke();
}