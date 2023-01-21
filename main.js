import { createServer } from './src/server.js'
import { networkInterfaces } from 'os'
import { logger } from './src/config/logger.js'
import { vars } from './src/config/vars.js'
const [IP] = networkInterfaces()['en0'].filter((net) => net.family === 'IPv4')

try {
  const server = await createServer(vars.port || 8080)
  logger.info(
    `Server listening on: http://${IP.address}:${server.address().port}`
  )
} catch (err) {
  logger.error(err)
}
