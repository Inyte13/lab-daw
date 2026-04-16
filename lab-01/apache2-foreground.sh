echo " Contenedor corriendo en puerto 80"

# Para que Apache encuentre sus propias variables
source /etc/apache2/envvars

# Para que sea el nuevo proceso principal
# -D, quiere decir define esta variable
# FOREGROUND, para que no se vaya al background
exec apache2 -D FOREGROUND