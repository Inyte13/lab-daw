const express = require('express');
const path = require('path');
const fs = require('fs'); 
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.post('/guardar', (req, res) => {
    console.log(req.body);
    res.send(`Datos recibidos: ${req.body.nombre}`);
});

const ruta = './agenda/2026.04.29';
if (!fs.existsSync(ruta)) {
    fs.mkdirSync(ruta, { recursive: true });
    console.log('Carpeta creada');
}

const contenido = "# Reunión\n\nRevisar proyecto";
fs.writeFileSync(`${ruta}/10.00.md`, contenido);
console.log('Archivo creado');

const archivos = fs.readdirSync(ruta);
console.log('Contenido de la carpeta:', archivos);

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});