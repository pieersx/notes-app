const cors = require('cors')
const express = require('express')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { connectToMongoDB } = require('./config/database')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler
} = require('./middleware/errorMiddleware')

connectToMongoDB()

const app = express()

// Middleware globales
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('../frontend/dist'))

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.end('<h1>API de Notas</h1>')
})

// Rutas de la API
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Middleware para manejar rutas no encontradas y errores
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
