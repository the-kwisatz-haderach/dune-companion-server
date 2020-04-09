import { httpListener, combineRoutes } from '@marblejs/core'
import { logger$ } from '@marblejs/middleware-logger'
import { bodyParser$ } from '@marblejs/middleware-body'
import { user$ } from './services/user'

const apiRouter$ = combineRoutes('/api', {
  effects: [user$]
})

export default httpListener({
  middlewares: [logger$(), bodyParser$()],
  effects: [apiRouter$]
})
