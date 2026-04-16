// Referencias a los elementos
const mensaje = document.getElementById('mensaje-js');
const main = document.getElementById('contenedor-estandar');

const btnColor = document.getElementById('btn-color');
const btnFondo = document.getElementById('btn-fondo');
const btnReset = document.getElementById('btn-reset');

// Cambiar color del texto
btnColor.onclick = function() {
    mensaje.style.color = "blue";
    mensaje.innerHTML = "<strong>¡Has cambiado el color del texto!</strong>";
};

// Cambiar fondo (Modo lectura)
btnFondo.onclick = function() {
    main.style.backgroundColor = "#fff9c4"; // Amarillo suave
    main.style.padding = "30px";
};

// Restaurar todo
btnReset.onclick = function() {
    mensaje.style.color = "black";
    mensaje.textContent = "Haz clic en los botones para cambiar este texto y su entorno.";
    main.style.backgroundColor = "white";
};
