import '../dotenv'
import { bindTo, createServer } from '@marblejs/core'
import { createWebSocketServer } from '@marblejs/websockets'
import httpListener from './httpListener'
import webSocketListener from './webSocketListener'
import connectDatabase from '../db/connectDatabase'
import {
  roomManagerContextReader,
  RoomManagerContextToken,
  redisStoreContextReader,
  RedisStoreContextToken,
  gameModuleContextReader,
  GameModuleContextToken
} from './services/contextReaders'

const { WEBSOCKET_PORT, HTTP_PORT, HOST } = global.config

const webSocketServer = createWebSocketServer({
  options: {
    port: WEBSOCKET_PORT,
    host: HOST,
    clientTracking: true
  },
  listener: webSocketListener,
  dependencies: [
    bindTo(RoomManagerContextToken)(roomManagerContextReader),
    bindTo(RedisStoreContextToken)(redisStoreContextReader),
    bindTo(GameModuleContextToken)(gameModuleContextReader)
  ]
})

const httpServer = createServer({
  port: HTTP_PORT,
  hostname: HOST,
  listener: httpListener
})

const main = async () => {
  connectDatabase()
  await (await httpServer)()
  console.log(`Http server listening to port ${HTTP_PORT}`)
  await (await webSocketServer)()
  console.log(`WebSocket server listening to port ${WEBSOCKET_PORT}`)
}

main()
