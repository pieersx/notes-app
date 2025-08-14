const app = require('./app')
const logger = require('./middleware/logger')
const { PORT } = require('./config/database')

app.listen(PORT, () => {
  logger.info(`\nServidor ejecutándose en http://localhost:${PORT}`)
})
