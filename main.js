import { createServer } from './src/server.js'
import { networkInterfaces } from 'os'
const [IP] = networkInterfaces()['en0'].filter((net) => net.family === 'IPv4')

try {
  const server = await createServer(8080)
  console.log(
    `Server listening on: http://${IP.address}:${server.address().port}`
  )
} catch (err) {
  console.log(err)
}
