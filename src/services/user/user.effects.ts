import { r } from '@marblejs/core'
import { map, mergeMap } from 'rxjs/operators'
import UserInteractor from '../../../db/entities/user/UserInteractor'
import { IUser } from '../../../db/entities/user/user.schema'

export const getUsers$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap(UserInteractor.findAll),
      map(users => ({ body: users }))
    )
  )
)

export const getUser$ = r.pipe(
  r.matchPath('/:id'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      map((req: any) => req.params.id),
      mergeMap(UserInteractor.findOne),
      map(user => ({ body: user }))
    )
  )
)

export const postUser$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      map(req => req.body as IUser),
      mergeMap(UserInteractor.create),
      map(result => ({ body: result }))
    )
  )
)

export const putUser$ = r.pipe(
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
      mergeMap(UserInteractor.update),
      map(result => ({ body: result }))
    )
  )
)

export const deleteUser$ = r.pipe(
  r.matchPath('/:id'),
  r.matchType('DELETE'),
  r.useEffect(req$ =>
    req$.pipe(
      map(({ params }: any) => params.id),
      mergeMap(UserInteractor.delete),
      map(result => ({ body: result }))
    )
  )
)
