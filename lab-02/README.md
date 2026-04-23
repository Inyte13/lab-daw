
# Lab 02 - Ejercicios de JavaScript

Este README documenta únicamente los tres ejercicios de `lab-02`:
- `ejercicio-01/js/ejercicio-01.js`
- `ejercicio-02/js/ejercicio-02.js`
- `ejercicio-03/js/ejercicio-03.js`

## Estructura de `lab-02`

- `docker-compose.yml` - Define el servicio NGINX para servir `lab-02` en `http://localhost:8080`
- `nginx.conf` - Configura la ruta `/lab-02/` y los alias para los ejercicios
- `ejercicio-01/` - Formulario bancario con teclado virtual y captcha
- `ejercicio-02/` - Calculadora interactiva con historial de expresiones
- `ejercicio-03/` - Juego del ahorcado con dibujado en canvas

## Ejercicio 01

- Archivo principal: `ejercicio-01/js/ejercicio-01.js`
- Página de entrada: `ejercicio-01/ejercicio-01.html`

### Descripción

Implementa un formulario de banca por internet simulado con:
- selección de banco
- número de tarjeta
- tipo y número de documento
- teclado virtual para clave de 6 dígitos
- captcha con cambio de imagen
- validación de credenciales

### Uso

Abrir en el navegador:

```text
http://localhost:8080/lab-02/ejercicio-01.html
```

## Ejercicio 02

- Archivo principal: `ejercicio-02/js/ejercicio-02.js`
- Página de entrada: `ejercicio-02/ejercicio-02.html`

### Descripción

Crea una calculadora interactiva con botones para:
- ingreso de números y operadores
- borrar caracteres o limpiar todo
- evaluar expresiones con `eval`
- guardar expresiones en un historial visual

### Uso

Abrir en el navegador:

```text
http://localhost:8080/lab-02/ejercicio-02.html
```

## Ejercicio 03

- Archivo principal: `ejercicio-03/js/ejercicio-03.js`
- Página de entrada: `ejercicio-03/ejercicio-03.html`

### Descripción

Implementa el juego del ahorcado con:
- selección aleatoria de palabra
- botones de letras
- conteo de errores hasta 10 intentos
- dibujo progresivo en canvas
- detección de victoria y derrota

### Uso

Abrir en el navegador:

```text
http://localhost:8080/lab-02/ejercicio-03.html
```

## Instrucciones para ejecutar lab-02

1. Iniciar Docker Compose desde `lab-02`:

```bash
cd lab-02
docker compose up -d
```

2. Abrir cualquiera de los ejercicios en el navegador usando las rutas anteriores.

3. Para detener el servicio:

```bash
docker compose down
```