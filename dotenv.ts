/* eslint-disable @typescript-eslint/no-namespace */
import { config } from 'dotenv'

declare global {
  namespace NodeJS {
    interface Global {
      config: {
        MONGO_URI: string
        REDIS_URI: string
      }
    }
  }
}

const { parsed } = config({ path: '.env' })

global.config = {
  MONGO_URI: parsed.MONGO_URI,
  REDIS_URI: parsed.REDIS_URI
}
