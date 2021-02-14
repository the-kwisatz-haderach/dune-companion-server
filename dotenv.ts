/* eslint-disable @typescript-eslint/no-namespace */
import { config } from 'dotenv'

declare global {
  namespace NodeJS {
    interface Global {
      config: {
        MONGO_URI: string
        REDIS_URI: string
        HOST: string
        HTTP_PORT: number
        WEBSOCKET_PORT: number
      }
    }
  }
}

const { parsed } = config({ path: '.env' })

if (process.env.NODE_ENV === 'test') {
  global.config = {
    MONGO_URI: 'parsed.MONGO_URI',
    REDIS_URI: 'parsed.REDIS_URI',
    HOST: 'parsed.HOST',
    HTTP_PORT: 3000,
    WEBSOCKET_PORT: 2000
  }
} else {
  global.config = {
    MONGO_URI: parsed.MONGO_URI,
    REDIS_URI: parsed.REDIS_URI,
    HOST: parsed.HOST,
    HTTP_PORT: Number.parseInt(parsed.HTTP_PORT),
    WEBSOCKET_PORT: Number.parseInt(parsed.WEBSOCKET_PORT)
  }
}
