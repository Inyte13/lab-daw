# Backend para Gestión de Agenda con Markdown (Arquitectura por Capas)

Este plan detalla la creación de un backend en Node.js (Vanilla JS + Express) para gestionar una "agenda" persistida en archivos `.md`. Se respetará la estructura actual del proyecto (`priv` para datos, `pub` para frontend, y `index.js` como entrypoint) utilizando `pnpm` como gestor de paquetes y aplicando los patrones de la skill `nodejs-backend-patterns`.

## User Review Required

> [!IMPORTANT]
> Revisa los cambios finales. He modificado el "Traer todo" para que incluya de una sola vez todo el contenido de los markdowns, y he añadido una aclaración sobre qué es un "logger". Si todo está OK, dame luz verde.

## 1. Árbol de Elementos del Proyecto

Mantendremos tu plantilla existente, añadiendo la carpeta `src` para organizar la arquitectura del backend:

```text
lab-03/
├── index.js                  # [MODIFY] Punto de entrada (app.listen, middlewares CORS/json, express.static('pub'))
├── package.json              # [EXISTING] Ya configurado con "dev": "node --watch index.js"
├── pnpm-lock.yaml            # [EXISTING]
├── pub/                      # [EXISTING] Frontend estático
├── priv/                     # [EXISTING] Carpeta raíz de Markdowns de la agenda
│   └── 2026.05.10/           # Subcarpetas por fecha (YYYY.MM.DD)
│       └── 11.00.md          # Archivos por hora (HH.MM.md)
└── src/                      # [NEW] Arquitectura del Backend
    ├── routes/
    │   └── agendaRoutes.js   # Definición de rutas del CRUD de agenda
    ├── controllers/
    │   └── agendaController.js # Procesa la petición y retorna la respuesta HTTP
    ├── services/
    │   └── agendaService.js    # Lógica de negocio (ej. asegurar que el archivo sea .md, chequear existencia)
    ├── repositories/
    │   └── agendaRepository.js # Operaciones con fs/promises (leer/crear directorios y archivos)
    ├── middleware/
    │   ├── errorHandler.js     # Manejador de errores global
    │   └── logger.js           # Imprime en consola información útil de cada petición que llega (ej: "GET /api/agenda")
    └── utils/
        └── errors.js           # Clases AppError, NotFoundError, etc.
```

## 2. Endpoints Requeridos (Router `agenda`)

Se implementará un CRUD bajo el prefijo `/api/agenda`:

- **`GET /api/agenda`**: Traer todo. Analiza la carpeta `priv` recursivamente, abre **todos** los archivos `.md`, extrae sus contenidos en crudo y retorna un JSON global con toda la agenda y sus textos de una sola vez. (Eliminado el endpoint de vista individual).
- **`POST /api/agenda`**: Crea un nuevo registro de agenda. Body esperado: `{ "date": "YYYY.MM.DD", "time": "HH.MM", "content": "# Título..." }`. Creará la carpeta si no existe y escribirá el archivo.
- **`PUT /api/agenda/:date/:time`**: Actualiza (o sobreescribe) el contenido de un `.md` existente enviando el nuevo contenido en el body.
- **`DELETE /api/agenda/:date/:time`**: Elimina el archivo `.md`. (Si la carpeta de la fecha queda vacía tras borrar el archivo, la eliminaremos también para mantener limpio el proyecto).

## 3. Configuraciones Base
- **Middlewares Externos**: Instalaremos `cors` usando `pnpm`.
- **Frontend**: Serviremos el contenido de la carpeta `/pub` usando `express.static('pub')` en `index.js`.
- **Body Parser**: Se incluirá `express.json()` para recibir los JSON de POST y PUT.

## Verification Plan

- Arrancar la aplicación con `pnpm run dev`.
- Verificar que el navegador sirva el frontend correctamente (aunque no haya nada en él).
- Llamar a la API (`GET /api/agenda`, `POST /api/agenda`, etc.) vía `curl` para certificar que el repositorio crea y elimina archivos físicos en `/priv` correctamente, y que el "Traer todo" incluye verdaderamente TODO el contenido de los archivos de una vez.
