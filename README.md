# Gestión de tareas FrontEnd

Este proyecto es un sistema frontend sólido para gestionar tareas. Está desarrollado con Vite, React, Tailwind Css y utiliza TypeScript para la seguridad de tipos y una mejor experiencia para los desarrolladores.

## Características

- Autenticación de usuarios
- Control de acceso mediante Jwt
- Gestión de tareas
- TypeScript para una mejor verificación de tipos y calidad del código

## Tecnologías utilizadas

- React
- Tailwind
- TypeScript
- JSON Web Tokens (JWT) 

## Estructura del proyecto

El proyecto esta estructurado de la siguiente manera:

- `src/`: Contiene el codigo TypeScript necesario
  - `actions/`: Maneja las acciones que se realizan en el sistema
  - `assets/`: Maneja lo referente a imagenes, css entre otros
  - `api/`: Contiene el acceso a las peticiones que se realizan al banckend
  - `components/`: Se encuentra cada uno de los componentes de la aplicación
  - `config/`: Contiene configuracion necesaria de la aplicación
  - `context/`: Se encuentra el manejador de estado global de la aplicación
  - `hooks/`: Contene ganchos personalizados para proveer a la aplicación de acciones requeridas
  - `pages/`: Se encuentra cada una de las páginas de la aplicacion
  - `reducers/`: Se encuentra los manejadores de estado de la aplicación
  - `types/`: Definiciones de tipos de TypeScript
- `dist/`: Código compilado JavaScript

## Requisitos previos

- Node.js (v22)
- Tailwind (3.4.17)

### Instalación

1. Clona el repositorio:

```
git clone https://github.com/your-username/your-repo-name.git
```

2. Configuración del proyecto
```
npm install
```

3. Configura las variables de entorno (crea un archivo `.env` en el directorio raíz):

```
VITE_BACKEND_URL=your_server_backend_connection_string
```

4. Compiles and hot-reloads for development
```
npm run dev
```

### Compilar y minificar a producción
```
npm run build
```


