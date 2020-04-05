import { combineRoutes } from '@marblejs/core'
import {
  createGame$,
  getGameDetails$,
  addPlayer$,
  deletePlayer$
} from './game.effects'

export const game$ = combineRoutes('/games', {
  effects: [createGame$, getGameDetails$, addPlayer$, deletePlayer$]
})
