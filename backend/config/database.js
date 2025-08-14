const mongoose = require('mongoose')
require('dotenv').config()

// process.loadEnvFile()

// Configuración para evitar advertencias de consultas estrictas
mongoose.set('strictQuery', false)

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV, PORT } = process.env
const mongoURI = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI

// Conexión a la base de datos mongodb
const connectToMongoDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURI)
    console.log(
      `✅ Conectado a MongoDB: ${connection.connection.host}/${connection.connection.name}`
    )
  } catch (err) {
    console.log('\n❌ Error de conexión a MongoDB:', err.message)
    process.exit(1)
  }
}

module.exports = {
  connectToMongoDB,
  PORT,
}
