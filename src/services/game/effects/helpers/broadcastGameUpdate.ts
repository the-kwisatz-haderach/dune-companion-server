import { EffectContext } from '@marblejs/core'
import { WebSocketClientConnection } from '@marblejs/websockets'
import { engineActions, Game } from 'dune'
import { pipe, SchedulerLike } from 'rxjs'
import { ignoreElements, tap } from 'rxjs/operators'
import { useRoomManager } from '../../../contextReaders'

const broadcastGameUpdate = (
  ctx: EffectContext<WebSocketClientConnection, SchedulerLike>
) =>
  pipe(
    tap((game: Game): void => {
      const roomManager = useRoomManager(ctx.ask)
      roomManager.getClients(game.id).forEach(client => {
        client.sendResponse(engineActions.UPDATE_GAME({ game }))
      })
    }),
    ignoreElements()
  )

export default broadcastGameUpdate
