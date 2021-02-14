import { matchEvent } from '@marblejs/core'
import { mergeMap } from 'rxjs/operators'
import { playerActions, Game } from 'dune'
import { UpdateGameEffect } from '../types'
import { useGameModule } from '../../contextReaders'
import broadCastUpdate from './helpers/broadcastGameUpdate'

const events: any = Object.keys(playerActions)

const updateGame$: UpdateGameEffect = (event$, ctx) =>
  event$.pipe(
    matchEvent(events),
    mergeMap<
      ReturnType<typeof playerActions[keyof typeof playerActions]>,
      Promise<Game>
    >(action => useGameModule(ctx.ask).updateGame(action)),
    broadCastUpdate(ctx)
  )

export default updateGame$
