const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;
const AGENDA_DIR = path.join(__dirname, 'agenda');

// Habilitar recepción de formularios y archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use('/lab03', express.static(path.join(__dirname, 'public')));

// Crear carpeta agenda si no existe [cite: 249, 250]
if (!fs.existsSync(AGENDA_DIR)) {
    fs.mkdirSync(AGENDA_DIR);
}

// API para obtener los datos de la agenda (Movido desde el antiguo app.get('/lab03'))
app.get('/api/eventos', (req, res) => {
    const fechas = fs.readdirSync(AGENDA_DIR); // [cite: 259]
    let datos = [];

    fechas.forEach(fecha => {
        const rutaFecha = path.join(AGENDA_DIR, fecha);
        const archivos = fs.readdirSync(rutaFecha);

        archivos.forEach(file => {
            const contenido = fs.readFileSync(path.join(rutaFecha, file), 'utf8');
            datos.push({
                fecha: fecha,
                hora: file.replace('.md', ''),
                contenido: contenido
            });
        });
    });
    res.json(datos); 
});

// Crear evento (Mantiene tu lógica de reemplazo de caracteres)
app.post('/lab03/crear', (req, res) => {
    const { fecha, hora, contenido } = req.body;

    const fechaDir = fecha.replace(/-/g, '.');
    const horaFile = hora.replace(':', '.') + '.md';

    const rutaFecha = path.join(AGENDA_DIR, fechaDir);

    if (!fs.existsSync(rutaFecha)) {
        fs.mkdirSync(rutaFecha, { recursive: true }); // [cite: 250]
    }

    fs.writeFileSync(path.join(rutaFecha, horaFile), contenido); // [cite: 256]

    res.redirect('/lab03/index.html'); // Redirige al archivo estático
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}/lab03/index.html`); // 
});