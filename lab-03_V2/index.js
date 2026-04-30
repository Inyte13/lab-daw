// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const AGENDA_DIR = path.join(__dirname, 'agenda');

app.use(express.urlencoded({ extended: true }));

// Crear carpeta agenda si no existe
if (!fs.existsSync(AGENDA_DIR)) {
    fs.mkdirSync(AGENDA_DIR);
}

// Home - interfaz única
app.get('/', (req, res) => {
    const fechas = fs.readdirSync(AGENDA_DIR);

    let html = `
    <h1>Agenda Personal</h1>

    <h2>Crear Evento</h2>
    <form method="POST" action="/crear">
        Fecha: <input type="date" name="fecha" required><br>
        Hora: <input type="time" name="hora" required><br>
        Descripción:<br>
        <textarea name="contenido" required></textarea><br>
        <button type="submit">Guardar</button>
    </form>

    <h2>Eventos</h2>
    `;

    fechas.forEach(fecha => {
        const rutaFecha = path.join(AGENDA_DIR, fecha);
        const archivos = fs.readdirSync(rutaFecha);

        html += `<h3>${fecha}</h3><ul>`;

        archivos.forEach(file => {
            const contenido = fs.readFileSync(path.join(rutaFecha, file), 'utf8');
            html += `<li><strong>${file.replace('.md','')}</strong>: ${contenido}</li>`;
        });

        html += '</ul>';
    });

    res.send(html);
});

// Crear evento
app.post('/crear', (req, res) => {
    const { fecha, hora, contenido } = req.body;

    const fechaDir = fecha.replace(/-/g, '.');
    const horaFile = hora.replace(':', '.') + '.md';

    const rutaFecha = path.join(AGENDA_DIR, fechaDir);

    if (!fs.existsSync(rutaFecha)) {
        fs.mkdirSync(rutaFecha);
    }

    fs.writeFileSync(path.join(rutaFecha, horaFile), contenido);

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
