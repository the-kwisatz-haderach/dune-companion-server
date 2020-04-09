import { WsEffect } from '@marblejs/websockets'
import { matchEvent } from '@marblejs/core'
import { map, mergeMap } from 'rxjs/operators'
import GameModule from './game.module'
import {
  Events,
  GameInput,
  GameOutput,
  AddPlayerInput,
  AddPlayerOutput,
  DeletePlayerInput,
  DeletePlayerOutput
} from './types'

export const createGame$: WsEffect<GameInput, GameOutput> = event$ =>
  event$.pipe(
    matchEvent(Events.CREATE_GAME),
    map(({ payload }) => payload),
    mergeMap(GameModule.createGame),
    map(game => ({ type: Events.CREATE_GAME, payload: game }))
  )

export const addPlayer$: WsEffect<AddPlayerInput, AddPlayerOutput> = event$ =>
  event$.pipe(
    matchEvent(Events.ADD_PLAYER),
    map(({ payload }) => payload),
    mergeMap(({ gameId, playerName }) =>
      GameModule.addPlayer(gameId, playerName)
    ),
    map(player => ({ type: Events.ADD_PLAYER, payload: player }))
  )

export const deletePlayer$: WsEffect<
  DeletePlayerInput,
  DeletePlayerOutput
> = event$ =>
  event$.pipe(
    matchEvent(Events.DELETE_PLAYER),
    map(({ payload }) => payload),
    mergeMap(({ gameId, playerId }) =>
      GameModule.removePlayer(gameId, playerId)
    ),
    map(players => ({ type: Events.DELETE_PLAYER, payload: players }))
  )
