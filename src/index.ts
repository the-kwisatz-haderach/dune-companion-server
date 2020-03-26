import '../dotenv'
import { listener } from './app'
import { createServer } from '@marblejs/core'
import connectDatabase from '../db/connectDatabase'

connectDatabase()

const server = createServer({
  port: 8000,
  hostname: 'localhost',
  listener
})

const main = async () => await (await server)()

main()
