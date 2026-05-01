# Gestor de Eventos - Lab 03

Una aplicación Fullstack para gestionar bloques de tiempo y eventos. Construida sin frameworks pesados en el frontend, utilizando Web Components nativos, Vanilla JavaScript, Node.js y un sistema de base de datos basado en el sistema de archivos (File System).

## Arquitectura del Proyecto

El proyecto está dividido en dos microservicios principales, diseñados para estar completamente desacoplados y listos para producción mediante Docker:

1. **Frontend (Vite + Web Components):** Aplicación SPA (Single Page Application) servida de manera ultrarrápida. Los componentes visuales (`dia-component`, `bloque-component`) encapsulan su propia lógica y UI.
2. **Backend (Node.js + Express):** Una API REST pura. Se encarga de la lógica de negocio, validaciones fuertes de datos y persistencia.
3. **Base de Datos (File System):** Almacenamiento ágil mediante archivos Markdown (`.md`) organizados jerárquicamente en la carpeta `priv/` (Ej. `priv/2026.05.02/14.30.md`).

---

## Estructura de Directorios

```text
lab-03/
├── docker-compose.yml       # Orquestador para producción
├── frontend/                # Microservicio del Cliente
│   ├── index.html           # Punto de entrada de Vite
│   ├── vite.config.js       # Configuración del proxy para desarrollo local
│   ├── nginx.conf           # Configuración de Nginx (Reverse Proxy) para producción
│   ├── Dockerfile           # Construcción multi-etapa (Node builder -> Nginx)
│   └── src/
│       ├── main.js          # Lógica principal y manejo de Custom Events
│       ├── components/      # Web Components encapsulados (dia, bloque)
│       ├── services/        # Consumo de la API (fetch)
│       └── styles/          # Hojas de estilo CSS nativas
│
└── backend/                 # Microservicio de la API
    ├── index.js             # Punto de entrada del servidor Express (Puerto 3000)
    ├── Dockerfile           # Construcción de la imagen Node.js
    └── src/
        ├── controllers/     # Orquestación de peticiones HTTP
        ├── middlewares/     # Formateo de URL params (- y : hacia .)
        ├── models/          # Entidades y validaciones Regex (Fail-Fast)
        ├── repositories/    # Persistencia de datos usando fs/promises
        ├── routers/         # Definición de Endpoints
        ├── services/        # Reglas de negocio y control de errores HTTP
        └── utils/           # Utilidades y custom Errors
```

---

## Cómo Ejecutar el Proyecto

Existen dos maneras de ejecutar este proyecto: Modo Desarrollo (para escribir código) y Modo Producción (usando Docker).

### Opción 1: Desarrollo Local (Hot Reloading)

En este modo corres cada servidor por separado. Vite te dará recargas automáticas cuando guardes cambios.

**1. Levantar el Backend:**
```bash
cd backend
pnpm install
pnpm run dev
```
*(El backend correrá en `http://localhost:3000`)*

**2. Levantar el Frontend:**
Abre otra terminal y ejecuta:
```bash
cd frontend
pnpm install
pnpm run dev
```
*(Vite servirá el frontend en `http://localhost:5173` y automáticamente redirigirá las peticiones `/api` al backend gracias a `vite.config.js`)*

---

### Opción 2: Producción (Docker Compose + Nginx)

Este modo empaqueta todo el código frontend (minify) y levanta un servidor web Nginx real que actúa como Reverse Proxy. Es el entorno idéntico a un despliegue real.

**1. Construir y Levantar:**
Desde la raíz del proyecto (donde está el `docker-compose.yml`), ejecuta:
```bash
docker-compose up -d --build
```

**2. Acceder:**
* Abre tu navegador en **`http://localhost:8080`**

*(En producción, Nginx recibe el tráfico en el puerto 8080. Si la URL pide archivos estáticos, los devuelve. Si la URL empieza por `/api`, la redirige internamente al contenedor de Node.js en el puerto 3000).*

---

## API Reference

### Días
*   **`GET /api/dia`**
    *   **Descripción:** Retorna todos los días con sus respectivos bloques de tiempo.
    *   **Respuesta Exitosa:** `200 OK` (Array JSON ordenado cronológicamente).

### Bloques
*   **`POST /api/:fecha/:hora`**
    *   **Descripción:** Crea un nuevo bloque de evento.
    *   **Formato de URL:** `YYYY-MM-DD/HH:MM`
    *   **Body JSON:** `{ "descripcion": "Mi evento" }`
    *   **Respuestas:** `201 Created`, `400 Bad Request` (Datos inválidos), `409 Conflict` (El bloque ya existe).

*   **`PUT /api/:fecha/:hora`**
    *   **Descripción:** Actualiza la descripción de un evento existente.
    *   **Body JSON:** `{ "descripcion": "Nueva descripción" }`
    *   **Respuestas:** `200 OK`, `404 Not Found`.

*   **`DELETE /api/:fecha/:hora`**
    *   **Descripción:** Elimina un evento de forma permanente.
    *   **Respuestas:** `204 No Content` (Éxito sin body), `404 Not Found`.

---
## Video Demostrativo
URL: https://drive.google.com/file/d/1WZ39xT4fCG1_OzJ2IaJ_XHtbFhufOzrB/view?usp=sharing

## Decisiones Técnicas Destacadas
*   **Web Components & Custom Events:** En lugar de usar event delegation excesivo en el `main.js`, cada bloque dispara un `CustomEvent` con `bubbles: true` y `composed: true`, promoviendo una excelente encapsulación.
*   **DRY & Middlewares:** El formateo de fechas de la URL se centralizó en el middleware `formatParams.js` para mantener los controladores lo más puros posibles.
*   **Fail-Fast Validation:** Los modelos de dominio arrojan excepciones de validación en el constructor antes de llegar a la capa de persistencia, garantizando la integridad de los datos en el File System.
