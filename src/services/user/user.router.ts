import { combineRoutes } from '@marblejs/core'
import {
  getUsers$,
  postUser$,
  putUser$,
  getUser$,
  deleteUser$
} from './user.effects'

export const user$ = combineRoutes('/users', {
  effects: [getUsers$, postUser$, putUser$, getUser$, deleteUser$]
})
