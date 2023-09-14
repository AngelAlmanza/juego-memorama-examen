# Juego de memorama hecho en canvas

### Importante tener en cuenta
El proyecto fue hecho y probado utilizando XAMPP en caso de no poder cargar los modulos de JS agregar la siguiente configuración al servidor apache de XAMPP

1. Abrir el archivo de configuración de apache la cual podria estar en
```
xampp\apache\conf\httpd.conf
```
2. Buscar la sección de configuración de tipos de archivo, esta seccion normalmente comienza con **`<IfModule mime_module>`**
3. Agregar la siguiente línea al final de la sección
```
AddType application/javascript .js .mjs
```
4. Guardar los cambios en el archivo
5. Reinciar el servidor de apache

Proyecto realizado por *Angel Almanza*

Para la materia de *Programación Anvanzada en Internet*

**Ingeniería en desarrollo de software - 7mo - TM - UABCS**