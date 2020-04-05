import { r } from '@marblejs/core'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import GameModule from './game.module'
import { GameConditions } from '../../../engine/interfaces'
import cacheUtils from './game.utils'

export const createGame$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      map(({ body }) => body as GameConditions),
      mergeMap(GameModule.createGame),
      map(id => ({ body: id }))
    )
  )
)

export const getGameDetails$ = r.pipe(
  r.matchPath('/:id'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      map(({ params }: any) => params.id as string),
      switchMap(cacheUtils.get),
      map(game => ({ body: game }))
    )
  )
)

export const addPlayer$ = r.pipe(
  r.matchPath('/:id/players'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      map(({ params, body }: any) => ({
        gameId: params.id as string,
        playerName: body as string
      })),
      mergeMap(({ gameId, playerName }) =>
        GameModule.addPlayer(gameId, playerName)
      ),
      map(playerId => ({ body: playerId }))
    )
  )
)

export const deletePlayer$ = r.pipe(
  r.matchPath('/:id/players/:pid'),
  r.matchType('DELETE'),
  r.useEffect(req$ =>
    req$.pipe(
      map(({ params }: any) => ({
        gameId: params.id as string,
        playerId: params.pid as string
      })),
      mergeMap(({ gameId, playerId }) =>
        GameModule.removePlayer(gameId, playerId)
      ),
      map(players => ({ body: players }))
    )
  )
)
