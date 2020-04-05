import { webSocketListener, WsEffect } from '@marblejs/websockets'
import { matchEvent } from '@marblejs/core'
import { mapTo } from 'rxjs/operators'

const helloWorld$: WsEffect = event$ =>
  event$.pipe(
    matchEvent('HELLO'),
    mapTo({ type: 'HELLO', payload: 'Hello, world!' })
  )

export default webSocketListener({
  middlewares: [],
  effects: [helloWorld$]
})
