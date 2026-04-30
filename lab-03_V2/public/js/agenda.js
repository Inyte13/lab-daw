document.addEventListener('DOMContentLoaded', () => {
    const contenedorEventos = document.getElementById('eventos-lista');

    // Función para cargar y mostrar los eventos
    fetch('/api/eventos')
        .then(response => response.json())
        .then(eventos => {
            if (eventos.length === 0) {
                contenedorEventos.innerHTML = '<p>No hay eventos programados.</p>';
                return;
            }

            // Agrupar por fecha para mantener tu estructura de <h3> y <ul>
            const agrupados = {};
            eventos.forEach(ev => {
                if (!agrupados[ev.fecha]) agrupados[ev.fecha] = [];
                agrupados[ev.fecha].push(ev);
            });

            let html = '';
            for (const fecha in agrupados) {
                html += `<h3>${fecha}</h3><ul>`;
                agrupados[fecha].forEach(ev => {
                    html += `<li><strong>${ev.hora}</strong>: ${ev.contenido}</li>`;
                });
                html += '</ul>';
            }
            contenedorEventos.innerHTML = html;
        })
        .catch(err => console.error('Error al cargar eventos:', err));
});