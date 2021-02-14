import { matchEvent } from '@marblejs/core'
import { mergeMap, tap, ignoreElements } from 'rxjs/operators'
import { playerActions, engineActions, Game } from 'dune'
import { UpdateGameEffect } from '../types'
import { useGameModule, useRoomManager } from '../../contextReaders'

const events: any = Object.keys(playerActions)

const updateGame$: UpdateGameEffect = (event$, ctx) =>
  event$.pipe(
    matchEvent(events),
    mergeMap<
      ReturnType<typeof playerActions[keyof typeof playerActions]>,
      Promise<Game>
    >(action => {
      const gameModule = useGameModule(ctx.ask)
      return gameModule.updateGame(action)
    }),
    tap((game: Game) => {
      const rooms = useRoomManager(ctx.ask)
      rooms.getClients(game.id).forEach(client => {
        client.sendResponse(engineActions.UPDATE_GAME({ game }))
      })
    }),
    ignoreElements()
  )

export default updateGame$
