# Notes App 📝

Una aplicación completa de notas con autenticación de usuarios, construida con React y Node.js en un monorepo usando NPM Workspaces.

## 🚀 Características

-  **CRUD completo** - Crear, leer, actualizar y eliminar notas
-  **Autenticación JWT** - Login/logout seguro
-  **Filtrado** - Ver todas las notas o solo las importantes
-  **Responsive** - Funciona en desktop y móvil
-  **UI intuitiva** - Interfaz limpia y fácil de usar
-  **Tiempo real** - Actualizaciones instantáneas
-  **Testing** - Pruebas unitarias y E2E

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP
- **Vitest** - Testing framework
- **Cypress** - E2E testing

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcrypt** - Hashing de contraseñas
- **Jest** - Testing framework

## 📁 Estructura del Proyecto

```
notes-app/
├── backend/                 # API REST
│   ├── controllers/         # Lógica de controladores
│   ├── middleware/          # Middlewares personalizados
│   ├── models/             # Modelos de Mongoose
│   ├── routes/             # Rutas de la API
│   ├── tests/              # Pruebas del backend
│   ├── utils/              # Utilidades
│   └── server.js           # Punto de entrada
├── frontend/               # Aplicación React
│   ├── public/             # Archivos estáticos
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios API
│   │   └── App.jsx         # Componente principal
│   └── cypress/            # Pruebas E2E
├── package.json            # Configuración del monorepo
└── README.md
```

## 🌐 API Endpoints

### Autenticación
```
POST /api/login          # Login de usuario
POST /api/users          # Registro de usuario
```

### Notas
```
GET    /api/notes        # Obtener todas las notas
POST   /api/notes        # Crear nueva nota
PUT    /api/notes/:id    # Actualizar nota
DELETE /api/notes/:id    # Eliminar nota
```

## 🧪 Testing

### Backend (Jest)
```bash
cd backend
npm test
```

### Frontend (Vitest)
```bash
cd frontend
npm test
```

### E2E (Cypress)
```bash
cd frontend
npm run cypress:open
```
