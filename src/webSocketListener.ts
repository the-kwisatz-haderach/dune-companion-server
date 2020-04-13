import { webSocketListener, WsErrorEffect } from '@marblejs/websockets'
import { map } from 'rxjs/operators'
import gameEffects from './services/game'

const errorHandler$: WsErrorEffect = event$ =>
  event$.pipe(
    map(error => {
      console.log('### ERROR ###')
      console.log(error)
      return {
        type: 'error',
        payload: {
          name: error.name,
          message: error.message
        }
      }
    })
  )

export default webSocketListener({
  middlewares: [],
  effects: gameEffects,
  error$: errorHandler$
})
