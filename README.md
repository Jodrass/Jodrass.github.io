# LoveApp - Dating Application Project

## Descripción del proyecto
Aplicación web de citas (Dating App) desarrollada en React con un fuerte énfasis en arquitectura profesional, responsividad total usando CSS nativo con Tailwind, e interacción con APIs usando Fetch nativo. La aplicación cuenta con un flujo de autenticación, diferentes vistas según el rol del usuario (User vs Admin) y soporte PWA (Progressive Web App). El diseño está garantizado para verse perfecto en resoluciones desde móviles extra-pequeños (480px) hasta monitores FULL HD (1920px).

## Framework + librerías y sus versiones
- **React**: ^18
- **Vite**: ^6 (Build Tool)
- **Tailwind CSS**: ^3 (Styling Engine)
- **react-router-dom**: ^7 (Enrutamiento y vistas protegidas)
- **zustand**: ^5 (Estado de sesión global y Roles de usuario)
- **react-hook-form**: ^7 (Validación de formularios)
- **vite-plugin-pwa**: ^0.21 (Soporte Progressive Web App)

## Licencia de uso
Este proyecto tiene licencia MIT. Siéntete libre de modificar, distribuir y usar el código.

## Guía de instalación

### Requisitos Previos
- Node.js versión 18+ o Docker instalados en tu sistema.

### Método 1: Ejecución local (Node / Vite)
1. Clona este repositorio o abre la carpeta en tu terminal.
2. Instala las dependencias ejecutando: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`
4. Para probar la autenticación y roles, utiliza el correo `admin@loveapp.com` para entrar al panel de administración o cualquier otro email para entrar como usuario.

### Método 2: Ejecución mediante Docker (Entorno Nginx)
1. Construye y ejecuta el contenedor en segundo plano: `docker-compose up -d --build`
2. Accede a la aplicación en `http://localhost:8080`.
