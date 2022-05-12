# Entrega 3 proyecto: aplicación eCommerce Backend.

El desarrollo del backend de la api está dentro de la carpeta backend trabajando en el puerto 9000 y el front end basado en react trabajando en el puerto 3000

## Backend: Inicializar servidor desde la consola en la carpeta principal con:

-  **npm run start:** inicializa el proyecto
-  **npm run dev:** inicializa en modo development

-  El servidor esta preparado para trabajar de modo local o en la nube.
-  Se puede inicializar en modo cluster con el argumento CLUSTER en la consola.
-  Se implemento el uso de winston para el manejo de los errores moderados y severos en el servidor.
-  Se realizo una prueba de performance con artillery para el listado de productos.

## FrontEnd React:

-  Inicializar desde otra consola en la carpeta frontend con
   -  **npm run start:** inicializa el proyecto frontend

## Database

El proyecto esta programado para trabajar con MongoDB

-  MongoDB (mongoose)

*  Usuarios
*  Productos
*  Carts

## REGISTRO Y LOGIN

-  Registro controlado en el backend con MONGODB
-  El login esta controlado con Passport Local para los inicios de sesión.

## Variables de Entorno

-  MONGO URL
-  PORT

## RUTAS Servidor Backend

El proyecto está dividio en dos grupos de rutas desde http://localhost:PORT

#### PRODUCTOS "/api/productos"

-  GET " / " **Muestra todos los productos en la db productos.txt**
-  GET " /:idProducto " **Muestra el producto por ID**
-  POST " / " **Agrega un producto nuevo al archivo produtcos.txt**
-  PUT " /:idProducto " **Actualiza el producto solicitado por ID por el método PUT**
-  DELETE " /:idProducto " **Borra el producto con el ID selecicionado**

#### CARRITO "/api/carrito"

-  POST " / " **Agrega un carrito nuevo al archivo cartlist.txt**
-  DELETE " /:idcarrito " **Borra el carrito con el ID selecicionado**
-  GET " /:idcarrito/productos " **Muestra todos los productos dentro de un carrito con el ID solicitado**
-  POST " /:idcarrito/productos " **Agrega un producto específico al carrito con un ID específico**
-  DELETE " /:idcarrito/productos/:IDproducto " **Borra un producto específico(id) en el carrito con el ID selecicionado**

> > > > Importante > PARA LA PRUEBA DE ENDPOINTS POST, PUT Y DELETE SE UTILIZO POSTMAN

### Git Ignore

> > > node modules y archivos .DIR

### Dependencies

-  Para el servidor, manejo de rutas [Express JS](https://expressjs.com/es/ "Ver más")
-  Para el timestamp y fechas [Moment JS](https://momentjs.com/ "Ver más")
-  Para la asignación de IDs [uuid](https://www.npmjs.com/package/uuid "Ver más")
-  Se utilizo para la conexión a la instancia de MongoDB y realización de esquemas. [mongoose](https://mongoosejs.com/ "Ver más")
-  Se utilizó la dependencia de firebaseadmin para la configuración, conexión e implementacion de Cloud Firestore [firebase](https://www.npmjs.com/package/firebase-admin "Ver más")
-  Se utilizó la dependencia de dotenv para la implementacion y uso de variables de entorno .env [dotenv](https://www.npmjs.com/package/dotenv "Ver más")

#### Created by: **Ivan Hernández Preza**
