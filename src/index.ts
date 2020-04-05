import '../dotenv'
import { createServer } from '@marblejs/core'
import { createWebSocketServer } from '@marblejs/websockets'
import httpListener from './httpListener'
import webSocketListener from './webSocketListener'
import connectDatabase from '../db/connectDatabase'

connectDatabase()

const hostname = '192.168.0.27'
const httpPort = 8000
const webSocketPort = 8001

const httpServer = createServer({
  port: httpPort,
  hostname,
  listener: httpListener
})

const webSocketServer = createWebSocketServer({
  options: {
    port: webSocketPort,
    host: hostname
  },
  listener: webSocketListener
})

const main = async () => {
  await (await httpServer)()
  console.log(`Http server listening to port ${httpPort}`)
  await (await webSocketServer)()
  console.log(`WebSocket server listening to port ${webSocketPort}`)
}

main()
