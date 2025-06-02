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

   Luego abre tu navegador y accede a:
   [http://localhost:3000](http://localhost:3000)

> El contenedor usa Nginx y sirve la app desde `/usr/share/nginx/html`. Puedes personalizar el archivo `nginx.conf` si necesitas cambiar la configuración del servidor.

## Resumen de la arquitectura

### 1. Frontend (React + TypeScript)
- El proyecto está basado en Create React App con TypeScript y usa TailwindCSS para estilos.
- **Carpetas clave:**
  - `src/app/`: Configuración global (store de Redux, rutas, request-api para Axios con manejo de autenticación y refresh de tokens).
  - `src/features/`: Funcionalidades agrupadas por dominio, como autenticación (`auth`) y dashboard de eventos (`dashboard`).
  - `src/inicio/`: Componentes y servicios para la página de inicio, registro de usuarios y eventos.
  - `src/shared/`: Componentes reutilizables (layout, spinner, botón de logout, etc.).
- **Gestión de estado:** Usa Redux para manejar la autenticación y otros estados globales.
- **Servicios API:** Los servicios para interactuar con el backend están centralizados en archivos como `eventosService.ts`, `registerUserService.ts`, etc., y utilizan Axios configurado con interceptores para manejar tokens y errores de autenticación.
- **Componentización:** La UI está dividida en componentes reutilizables y páginas, con formularios controlados y manejo de estados de carga, éxito y error.

### 2. Autenticación
- **Login y registro:** El login utiliza un endpoint de token y guarda la sesión con cookies (`withCredentials`). El registro de usuario se realiza desde un modal y se conecta al backend.
- **Protección de rutas:** Se usan rutas privadas y lógica de redirección en caso de expiración de sesión o refresh token inválido.

### 3. Eventos y sesiones
- **CRUD de eventos:** Formularios para crear, editar y eliminar eventos, incluyendo subida de imágenes.
- **Registro a eventos:** Los usuarios autenticados pueden registrarse a eventos. El sistema consulta a qué eventos ya está registrado el usuario y oculta el botón de registro en esos casos.
- **FullCalendar:** Integración para mostrar y gestionar sesiones de eventos.

### 4. Docker y despliegue
- **Dockerfile:** El proyecto se construye en una imagen Node, luego se sirve en producción con Nginx escuchando en el puerto 3000.
- **nginx.conf:** Configuración personalizada para servir la app React y soportar rutas del frontend.

## Rutas principales de la aplicación

- `/` — Página de inicio (listado y búsqueda de eventos, registro/login)
- `/login` — Página de inicio de sesión
- `/events` — Dashboard de eventos (privada, requiere autenticación)
- `/create-events` — Crear nuevo evento (privada)
- `/:eventId/edit-events` — Editar evento (privada)
- `/sessions/:eventId` — Gestión de sesiones de un evento (privada)

Las rutas protegidas requieren que el usuario esté autenticado. Si no lo está, será redirigido a `/login`.
