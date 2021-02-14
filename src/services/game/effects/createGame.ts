import { EffectContext, matchEvent } from '@marblejs/core'
import { WebSocketClientConnection } from '@marblejs/websockets'
import { engineActions, Game, playerActions } from 'dune'
import { SchedulerLike } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { useGameModule, useRoomManager } from '../../contextReaders'
import { CreateGameEffect } from '../types'

const createGameRoom = (
  ctx: EffectContext<WebSocketClientConnection, SchedulerLike>
) =>
  tap((game: Game): void => {
    const rooms = useRoomManager(ctx.ask)
    rooms.create(game.id)
  })

const createGame$: CreateGameEffect = (event$, ctx) =>
  event$.pipe(
    matchEvent(playerActions.CREATE_GAME.type),
    mergeMap<ReturnType<typeof playerActions['CREATE_GAME']>, Promise<Game>>(
      action => {
        const gameModule = useGameModule(ctx.ask)
        return gameModule.createGame(action)
      }
    ),
    createGameRoom(ctx),
    map(game => engineActions.UPDATE_GAME({ game }))
  )

export default createGame$
