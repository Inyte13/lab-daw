Intengrantes del grupo-02 de Desarrollo de Aplicaciones Web
Profesor: Julio Vera
- García Daza, Luis Alberto 
- Condori Catasi, Jonnier Angel 
- Justo Vilca, Alessandro Josue
- 
# Lab 01 - Apache con Docker

## Requisitos
- Docker instalado
- Agregar al `/etc/hosts`:

```
127.0.0.1   developers www.developers
127.0.0.1   webapp     www.webapp
```

## Estructura
```
lab-01/
├── Dockerfile
├── apache2-foreground.sh
├── sites/
│   ├── developers.conf
│   └── webapp.conf
└── www/
    ├── developers/
    └── webapp/
```

## Comandos

### Construir la imagen
```bash
docker build -t ubuntu-apache .
```

### Correr el contenedor
```bash
docker run -d -p 8080:80 --name servidor ubuntu-apache
```

### Ver logs
```bash
docker logs servidor
```

### Parar y reanudar
```bash
docker stop servidor
docker start servidor
```

### Reconstruir después de cambios
```bash
docker stop servidor
docker rm servidor
docker build -t ubuntu-apache .
docker run -d -p 8080:80 --name servidor ubuntu-apache
```

### Actualizar archivos sin rebuildar
```bash
docker cp www/webapp/ servidor:/var/www/webapp/
docker cp www/developers/ servidor:/var/www/developers/
```

## Acceso
- http://developers:8080
- http://webapp:8080
