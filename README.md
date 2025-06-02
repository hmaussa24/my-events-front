# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

La página se recargará si realizas cambios.
También verás cualquier error de lint en la consola.


### `npm run build`

Construye la aplicación para producción en la carpeta `build`.
React se empaqueta en modo producción y optimiza el build para el mejor rendimiento.

El build es minificado y los nombres de archivo incluyen hashes.
¡Tu app está lista para ser desplegada!

tambien realizara un `postbuild` para ofuscacion del codigo


## Docker

Para levantar el proyecto usando Docker y Nginx:

1. Construye la imagen:

   ```sh
   docker build -t my-events-front .
   ```

2. Ejecuta el contenedor exponiendo el puerto 3000:

   ```sh
   docker run -p 3000:3000 my-events-front
   ```

3. Accede a la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000)

> El contenedor usa Nginx y sirve la app desde `/usr/share/nginx/html`. Puedes personalizar el archivo `nginx.conf` si necesitas cambiar la configuración del servidor.
