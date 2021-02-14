import { matchEvent } from '@marblejs/core'
import { mergeMap, tap } from 'rxjs/operators'
import { playerActions, Game } from 'dune'
import { JoinGameEffect } from '../types'
import { useGameModule, useRoomManager } from '../../contextReaders'
import broadCastUpdate from './helpers/broadcastGameUpdate'

const joinGame$: JoinGameEffect = (event$, ctx) =>
  event$.pipe(
    matchEvent(playerActions.JOIN_GAME.type),
    mergeMap<ReturnType<typeof playerActions['JOIN_GAME']>, Promise<Game>>(
      action => useGameModule(ctx.ask).joinGame(action)
    ),
    tap((game: Game) =>
      useRoomManager(ctx.ask).join(game.id, ctx.client.id, ctx.client)
    ),
    broadCastUpdate(ctx)
  )

export default joinGame$
