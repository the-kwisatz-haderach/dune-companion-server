import { r } from '@marblejs/core'
import { map, mergeMap } from 'rxjs/operators'
import DatabaseAdapter from '../../../db/DatabaseAdapter'
import { IUser } from '../../../db/models/user.model'

export const getGames$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap(DatabaseAdapter.findAll),
      map(users => ({ body: users }))
    )
  )
)

export const getGame$ = r.pipe(
  r.matchPath('/:id'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      map((req: any) => req.params.id),
      mergeMap(DatabaseAdapter.findOne),
      map(user => ({ body: user }))
    )
  )
)

export const postGame$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      map(req => req.body as IUser),
      mergeMap(DatabaseAdapter.create),
      map(result => ({ body: result }))
    )
  )
)

export const putGame$ = r.pipe(
  r.matchPath('/:id'),
  r.matchType('PUT'),
  r.useEffect(req$ =>
    req$.pipe(
      map(
        ({ body, params }: any) =>
          ({
            id: params.id,
            username: body.username,
            creationDate: body.creationDate
          } as IUser)
      ),
      mergeMap(DatabaseAdapter.create),
      map(result => ({ body: result }))
    )
  )
)
