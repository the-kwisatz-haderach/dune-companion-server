import { httpListener, combineRoutes } from '@marblejs/core'
import { logger$ } from '@marblejs/middleware-logger'
import { bodyParser$ } from '@marblejs/middleware-body'
import { game$ } from './services/game'

const apiRouter$ = combineRoutes('/api', {
  effects: [game$]
})

export const listener = httpListener({
  middlewares: [logger$(), bodyParser$()],
  effects: [apiRouter$]
})
