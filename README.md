# Funcionalidades

- Generador de solicitudes en word, con [validaciones](https://github.com/gabrielmares/front_cartera/blob/main/src/views/Solicitudes/Renovations.js "validaciones")
- Seguimiento a solicitudes en proceso de recabar [documentacion](https://github.com/gabrielmares/front_cartera/blob/main/src/views/Solicitudes/RequestsInProcess.js "documentacion")
- Pantalla con desglose de informacion importante de cada [sucursal](https://github.com/gabrielmares/front_cartera/blob/main/src/views/Dashboard/Dashboard.js "sucursal") de operacion


###Links

Puedes probar la aplicacion Demo en el siguiente [enlace](https://demo-renovaciones.netlify.app/ "enlace").

Con las siguientes credenciales puedes probar la App

    usuario: demo@demo.com	
    password: publico


La aplicacion original esta desplegada en un servidor interno, su uso es en un entorno financiero, por tal motivo no se puede revelar informacion de los clientes.
En la version Demo se usa un JSON como base de datos, de donde la app recoge los datos para mostrarlos en las diferentes tablas. El documento que genera la app es solo demostrativo, no es la version original que utiliza la empresa.

Con [mockaroo](https://www.mockaroo.com/ "mockaro") generamos la base de datos para el DEMO.

##Renovacion del credito

- El nombre del cliente aparece en gris, cuando no puede aplicar para una renovacion
- Los clientes con el nombre en color normal, son los creditos renovables

##  Principales dependencias

- [BackEnd](https://github.com/gabrielmares/semaforo_backend "BackEnd")
- [React](npmjs.com/package/react "React") con hooks, useContext, useState, useEffect, useReducer y algunos hooks personalizados para el manejo de la sesion de usuario y peticiones al backEnd.
- [Reacstrap](https://reactstrap.github.io/ "Reacstrap")
- [Axios](https://github.com/axios/axios "Axios")
- [CoreUI](https://coreui.io/react/ui-components/  "CoreUI")
- [easy-teamplate-x](https://www.npmjs.com/package/easy-template-x "Easy-Teamplate-x")

## Ejemplos

En la version de produccion genere algunas [imagenes](https://github.com/gabrielmares/front_cartera/tree/main/public/ejemplos "imagenes"), pero no se puede mostrar informacion de los clientes por lo que aparecen difuminados los datos privados.