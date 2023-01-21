import { createServer } from './src/server.js'
import { logger } from './src/config/logger.js'
import { vars } from './src/config/vars.js'

try {
  const server = await createServer(vars.port || 8080)
  logger.info(`Server listening on port ${server.address().port}`)
} catch (err) {
  logger.error(err)
}
