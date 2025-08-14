# Notes API Express

Backend API para gestión de notas con autenticación de usuarios.

## 🚀 Características

- ✅ API REST completa para notas y usuarios
- ✅ Autenticación con bcrypt
- ✅ Base de datos MongoDB con Mongoose
- ✅ Pruebas con Jest y Supertest
- ✅ Middleware de manejo de errores
- ✅ Validación de datos
- ✅ CORS configurado

## 🛠️ Tecnologías

- Node.js
- Express.js
- MongoDB & Mongoose
- Jest (Testing)
- bcrypt (Password hashing)
- ESLint (Code quality)

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/pieersx/notes-api-express.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev
```

## 🧪 Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch
```

## 📚 API Endpoints

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear usuario

### Notas
- `GET /api/notes` - Obtener todas las notas
- `GET /api/notes/:id` - Obtener nota por ID
- `POST /api/notes` - Crear nueva nota
- `PUT /api/notes/:id` - Actualizar nota
- `DELETE /api/notes/:id` - Eliminar nota

## 🌱 Variables de Entorno

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/notes
MONGODB_URI_TEST=mongodb+srv://user:pass@cluster.mongodb.net/notes-test
PORT=6969
```
