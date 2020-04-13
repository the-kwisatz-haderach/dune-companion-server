import { use, matchEvent } from '@marblejs/core'
import { WsEffect } from '@marblejs/websockets'
import { t, eventValidator$ } from '@marblejs/middleware-io'
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

const PlayerSchema = t.type({
  id: t.string,
  playerName: t.string
})

const GameConditionsSchema = t.type({
  advancedMode: t.boolean,
  maxPlayers: t.number,
  maxTurns: t.number
})

export const createGame$: WsEffect<GameInput, GameOutput> = event$ =>
  event$.pipe(
    matchEvent(Events.CREATE_GAME),
    use(eventValidator$(GameConditionsSchema)),
    map(({ payload }) => payload),
    mergeMap(GameModule.createGame),
    map(game => ({ type: Events.CREATE_GAME, payload: game }))
  )

export const addPlayer$: WsEffect<any, any> = event$ =>
  event$.pipe(
    matchEvent(Events.CREATE_PLAYER),
    use(eventValidator$(PlayerSchema)),
    map(({ payload }) => payload),
    mergeMap(({ id, playerName }) => GameModule.addPlayer(id, playerName)),
    map(game => ({ type: Events.CREATE_PLAYER, payload: game }))
  )

export const deletePlayer$: WsEffect<any, any> = event$ =>
  event$.pipe(
    matchEvent(Events.DELETE_PLAYER),
    map(({ payload }) => payload),
    mergeMap(({ id, playerId }) => GameModule.removePlayer(id, playerId)),
    map(game => ({ type: Events.DELETE_PLAYER, payload: game }))
  )
