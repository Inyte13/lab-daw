FROM ubuntu:24.04

# Asume todo por defecto
ENV DEBIAN_FRONTEND=noninteractive

# apt-get, porque es mas estable 
RUN apt-get update && apt-get install -y apache2 && apt-get clean

COPY sites/developers.conf /etc/apache2/sites-available/developers.conf
COPY sites/webapp.conf /etc/apache2/sites-available/webapp.conf
COPY www/developers/ /var/www/developers/
COPY www/webapp/ /var/www/webapp/

# a2dissite 000-default.conf, deshabilitamos este VirtualHost que viene por defecto
# a2ensite developers.conf y a2ensite webapp.conf, activamos estas VirtualHost
RUN a2dissite 000-default.conf && a2ensite developers.conf && a2ensite webapp.conf

# Apache corre en el foreground (corre visible, ocupando la terminal) porque asi docker lo ve
COPY apache2-foreground.sh /usr/local/bin/apache2-foreground.sh

# chmod +x, le agregamos el permiso de ejecuión
RUN chmod +x /usr/local/bin/apache2-foreground.sh

# Solo es informativo
EXPOSE 80

CMD ["/usr/local/bin/apache2-foreground.sh"]