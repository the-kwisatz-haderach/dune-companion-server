import Game from '../../../engine/Game'
import Player from '../../../engine/Player'
import { GameConditions } from '../../../engine/interfaces'

export interface GameModuleMethod<U, T = undefined> {
  (gameId: Game['id'], payload?: T): Promise<U>
}

export enum Events {
  CREATE_GAME = 'create_game',
  ADD_PLAYER = 'add_player',
  DELETE_PLAYER = 'delete_player'
}

export interface Event<T, U> {
  type: T
  payload: U
}

export type GameInput = Event<Events.CREATE_GAME, GameConditions>

export type GameOutput = Event<Events.CREATE_GAME, Game>

export type AddPlayerInput = Event<
  Events.ADD_PLAYER,
  { gameId: string; playerName: string }
>

export type AddPlayerOutput = Event<Events.ADD_PLAYER, Player>

export type DeletePlayerInput = Event<
  Events.DELETE_PLAYER,
  { gameId: string; playerId: string }
>

export type DeletePlayerOutput = Event<Events.DELETE_PLAYER, Player[]>
