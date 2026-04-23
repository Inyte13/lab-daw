// Contenedor principal
const formBN = document.createElement("div");
formBN.style.maxWidth = "700px";
formBN.style.margin = "20px auto";
formBN.style.color = "white";
document.body.appendChild(formBN);

// Función utilitaria mejorada
function crearFila(labelText, controls, alignTop = false) {
    const fila = document.createElement("div");
    fila.style.display = "flex";
    fila.style.alignItems = alignTop ? "flex-start" : "center";
    fila.style.marginBottom = "1.5rem";

    const etiqueta = document.createElement("label");
    etiqueta.innerText = labelText;
    etiqueta.style.width = "200px";
    etiqueta.style.textAlign = "right";
    etiqueta.style.marginRight = "15px";
    etiqueta.style.fontWeight = "normal";
    etiqueta.style.fontSize = "0.9rem";

    const contenedorInputs = document.createElement("div");
    contenedorInputs.style.display = "flex";
    contenedorInputs.style.gap = "20px";
    contenedorInputs.style.flex = "1";

    controls.forEach(control => contenedorInputs.appendChild(control));

    fila.appendChild(etiqueta);
    fila.appendChild(contenedorInputs);
    formBN.appendChild(fila);
}

// Sección Banco
const selectBanco = document.createElement('select');
const bancos = ["Multired Global Débito", "BCP", "Caja Arequipa"];
bancos.forEach(nombre => {
    const opt = document.createElement('option');
    opt.textContent = nombre;
    selectBanco.appendChild(opt);
});
crearFila("Seleccione:", [selectBanco]);

// Sección Número Tarjeta
const inputTarjeta = document.createElement('input');
inputTarjeta.type = "text";
inputTarjeta.value = "4214";
inputTarjeta.style.width = "100%";
crearFila("Número de tarjeta:", [inputTarjeta]);

// Sección tipo y Nro de Documento
const selectDoc = document.createElement('select');
["Seleccione...", "DNI", "Carnet Ext.", "Pasaporte"].forEach(tipo => {
    const opt = document.createElement('option');
    opt.textContent = tipo;
    selectDoc.appendChild(opt);
});
const inputDoc = document.createElement('input');
inputDoc.style.width = "150px";
crearFila("Tipo y N° Documento:", [selectDoc, inputDoc]);

// Sección teclado y Clave

// Input de clave
const inputClave6 = document.createElement("input");
inputClave6.type = "password";
inputClave6.style.width = "150px";
inputClave6.readOnly = true; 
inputClave6.maxLength = 6;

const tecladoContenedor = document.createElement("div");
tecladoContenedor.style.display = "grid";
tecladoContenedor.style.gridTemplateColumns = "repeat(3, 45px)";
tecladoContenedor.style.gap = "5px";

// Función para desordenar y renderizar botones
function renderizarTeclado() {

    tecladoContenedor.innerHTML = "";
    
    let numerosBase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    for (let i = numerosBase.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numerosBase[i], numerosBase[j]] = [numerosBase[j], numerosBase[i]];
    }

    numerosBase.forEach(num => {
        const btn = document.createElement("button");
        btn.innerText = num;
        btn.style.padding = "8px 0";
        btn.style.backgroundColor = "#eee";
        btn.style.border = "1px solid #ccc";
        btn.style.color = "#333";
        btn.style.cursor = "pointer";
        btn.style.fontWeight = "bold";

        btn.onclick = () => {
            if (inputClave6.value.length < 6) {
                inputClave6.value += num;
            }
        };
        tecladoContenedor.appendChild(btn);
    });

    // Botón Limpiar
    const btnLimpiar = document.createElement("button");
    btnLimpiar.innerText = "LIMPIAR";
    btnLimpiar.style.gridColumn = "span 2";
    btnLimpiar.style.backgroundColor = "#666";
    btnLimpiar.style.color = "white";
    btnLimpiar.style.fontSize = "0.7rem";
    btnLimpiar.style.cursor = "pointer";
    btnLimpiar.style.border = "none";

    btnLimpiar.onclick = () => {
        inputClave6.value = "";
        renderizarTeclado(); 
    };
    tecladoContenedor.appendChild(btnLimpiar);
}

renderizarTeclado();

// Genera tu Clave e Ingresar Clave
const claveInternetLateral = document.createElement("div");
claveInternetLateral.style.fontSize = "0.8rem";

// Olvide mi clave
function mostrarMensajeLoSentimos() {
    document.body.innerHTML = "";
    
    const contenedorError = document.createElement("div");
    contenedorError.style.textAlign = "center";
    contenedorError.style.marginTop = "100px";
    contenedorError.style.fontFamily = "Arial, sans-serif";

    contenedorError.innerHTML = `
        <h1 style="color: #666;">Lo sentimos</h1>
        <p style="font-size: 1.2rem; color: #999;">Esta opción no está disponible en este momento.</p>
        <div style="font-size: 5rem; margin: 20px 0;">⚠️</div>
        <button onclick="location.reload()" style="padding:10px 20px; cursor:pointer; border:1px solid #ccc; background: black;">Volver</button>
    `;
    
    document.body.appendChild(contenedorError);
}

// Generar Clave
const linkGenerar = document.createElement("a");
linkGenerar.href = "javascript:void(0);";
linkGenerar.innerHTML = "<b>&#10041; Genera tu Clave de Internet</b>";
linkGenerar.style.color = "#ffffff"; 
linkGenerar.style.textDecoration = "underline";
linkGenerar.onclick = mostrarMensajeLoSentimos;

const txtClave = document.createElement("p");
txtClave.innerText = "Ingresa tu Clave de\nInternet (06 dígitos)";
txtClave.style.margin = "10px 0 5px 0";

// Link Olvidé mi Clave
const linkOlvide = document.createElement("div");
linkOlvide.style.marginTop = "15px";

linkOlvide.innerHTML = `
    <span style="background:#ffffff; color:#666; border-radius:50%; padding:0 6px; margin-right:5px; font-weight:bold">!</span> 
    <a href="javascript:void(0);" id="btnOlvide" style="color:#ffffff; text-decoration: underline;">Olvidé-mi-clave</a>
`;

claveInternetLateral.append(linkGenerar, txtClave, inputClave6, linkOlvide);

// Asignar el evento al link de "Olvidé mi clave"
setTimeout(() => {
    const btnO = document.getElementById("btnOlvide");
    if(btnO) btnO.onclick = mostrarMensajeLoSentimos;
}, 0);

crearFila("Ingresa tu clave usando\nel teclado virtual:", [tecladoContenedor, claveInternetLateral], true);

// Capcha

const captchaContenedor = document.createElement("div");
captchaContenedor.style.display = "flex";
captchaContenedor.style.flexDirection = "column";
captchaContenedor.style.alignItems = "center";

const captchasBase = [
    "https://placehold.jp/24/d32f2f/ffffff/120x40.png?text=WR4FK",
    "https://placehold.jp/24/004488/ffffff/120x40.png?text=99B2A",
    "https://placehold.jp/24/336633/ffffff/120x40.png?text=PX7QR"
];

let indiceActual = 0;

const imagenElemento = document.createElement("img");
imagenElemento.src = captchasBase[indiceActual];
imagenElemento.alt = "captcha";
imagenElemento.style.border = "1px solid #ddd";
imagenElemento.style.display = "block";

const linkCambiar = document.createElement("a");
linkCambiar.href = "javascript:void(0);";
linkCambiar.innerHTML = "&#8634; Cambiar texto";
linkCambiar.style.color = "#ffffff";
linkCambiar.style.fontSize = "0.8rem";
linkCambiar.style.textDecoration = "none";
linkCambiar.style.marginTop = "5px";
linkCambiar.style.cursor = "pointer";

const inputCaptcha = document.createElement("input");
inputCaptcha.type = "text";
inputCaptcha.style.width = "120px";
inputCaptcha.style.height = "30px";
inputCaptcha.style.alignSelf = "center";

linkCambiar.onclick = (e) => {
    e.preventDefault();

    indiceActual = (indiceActual + 1) % captchasBase.length;
    
    imagenElemento.src = captchasBase[indiceActual] + "&t=" + Date.now();
    
    inputCaptcha.value = "";
    inputCaptcha.focus();
};

captchaContenedor.append(imagenElemento, linkCambiar);

crearFila("Ingresa el texto de la\nimagen:", [captchaContenedor, inputCaptcha]);

// Boton Ingresar
const footer = document.createElement("div");
footer.style.textAlign = "center";
footer.style.marginTop = "30px";

const btnIngresar = document.createElement("button");
btnIngresar.innerText = "INGRESAR";
btnIngresar.style.backgroundColor = "#100531";
btnIngresar.style.color = "white";
btnIngresar.style.padding = "10px 60px";
btnIngresar.style.borderRadius = "25px";
btnIngresar.style.border = "none";
btnIngresar.style.fontWeight = "bold";
btnIngresar.style.cursor = "pointer";

// Base de Datos Simulación

const usuariosValidos = [
    { 
        dni: "12345678", 
        clave: "123456", 
        tarjeta: "421400", 
        banco: "Multired Global Débito" 
    },
    { 
        dni: "87654321", 
        clave: "654321", 
        tarjeta: "421455", 
        banco: "BCP" 
    }
];

const textosCaptcha = ["WR4FK", "99B2A", "PX7QR"];

btnIngresar.onclick = () => {

    const bancoSeleccionado = selectBanco.value;
    const dniIngresado = inputDoc.value.trim();
    const claveIngresada = inputClave6.value;
    const tarjetaIngresada = inputTarjeta.value.trim();
    const captchaIngresado = inputCaptcha.value.trim().toUpperCase();

    if (captchaIngresado !== textosCaptcha[indiceActual]) {
        alert("El texto del captcha es incorrecto.");
        return;
    }

    if (!dniIngresado || claveIngresada.length < 6) {
        alert("Por favor, complete su DNI y la clave de 6 dígitos.");
        return;
    }

    const usuarioEncontrado = usuariosValidos.find(u => 
        u.dni === dniIngresado && 
        u.clave === claveIngresada &&
        u.tarjeta === tarjetaIngresada &&
        u.banco === bancoSeleccionado
    );

    if (usuarioEncontrado) {
        mostrarMensajeExito(usuarioEncontrado.banco);
    } else {
        alert("Los datos no coinciden. Asegúrese de elegir el banco correcto para ese usuario.");
    }
};
// Mensaje de Ingreso
function mostrarMensajeExito(nombreBanco) {
    document.body.innerHTML = "";
    
    const contenedorExito = document.createElement("div");
    contenedorExito.style.textAlign = "center";
    contenedorExito.style.marginTop = "100px";
    contenedorExito.style.fontFamily = "Arial, sans-serif";

    contenedorExito.innerHTML = `
        <h1 style="color: #ffffff;">${nombreBanco}</h1>
        <h2 style="color: #2e7d32;">¡Felicidades!</h2>
        <p style="font-size: 1.2rem; color: #666;">Has ingresado correctamente a tu banca por internet.</p>
        <div style="font-size: 5rem;">✅</div>
        <button onclick="location.reload()" style="margin-top:20px; padding:10px 40px; cursor:pointer; background:#666; color:white; border:none; border-radius:5px;">Cerrar Sesión</button>
    `;
    
    document.body.appendChild(contenedorExito);
}

footer.appendChild(btnIngresar);
formBN.appendChild(footer);


