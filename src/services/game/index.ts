import { combineRoutes } from '@marblejs/core'
import { getGames$, postGame$, putGame$, getGame$ } from './game.effects'

export const game$ = combineRoutes('/game', {
  effects: [getGames$, postGame$, putGame$, getGame$]
})
