import { WsEffect } from '@marblejs/websockets'
import { playerActions, engineActions } from 'dune'

export type CreateGameEffect = WsEffect<
  ReturnType<typeof playerActions['CREATE_GAME']>,
  ReturnType<typeof engineActions['UPDATE_GAME']>
>

export type JoinGameEffect = WsEffect<
  ReturnType<typeof playerActions['JOIN_GAME']>,
  void
>

export type UpdateGameEffect = WsEffect<
  ReturnType<typeof playerActions[keyof typeof playerActions]>,
  void
>
