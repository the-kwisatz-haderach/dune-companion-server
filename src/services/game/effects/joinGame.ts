import { matchEvent } from '@marblejs/core'
import { mergeMap, tap, ignoreElements } from 'rxjs/operators'
import { playerActions, engineActions, Game } from 'dune'
import { JoinGameEffect } from '../types'
import { useGameModule, useRoomManager } from '../../contextReaders'

const joinGame$: JoinGameEffect = (event$, ctx) =>
  event$.pipe(
    matchEvent(playerActions.JOIN_GAME.type),
    mergeMap<ReturnType<typeof playerActions['JOIN_GAME']>, Promise<Game>>(
      action => {
        const gameModule = useGameModule(ctx.ask)
        return gameModule.joinGame(action)
      }
    ),
    tap((game: Game) => {
      const rooms = useRoomManager(ctx.ask)
      rooms.join(game.id, ctx.client.id, ctx.client)
      const clients = rooms.getClients(game.id)
      clients.forEach(client => {
        client.sendResponse(engineActions.UPDATE_GAME({ game }))
      })
    }),
    ignoreElements()
  )

export default joinGame$
