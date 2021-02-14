import { mocked } from 'ts-jest/utils'
import { playerActions } from 'dune'
import { of } from 'rxjs'
import createGame$ from './createGame'
import { useGameModule } from '../../contextReaders'

jest.mock('../../contextReaders')
jest.mock('../../../lib/GameModule')
jest.mock('../../../lib/redis')

const mockedUseGameModule = mocked(useGameModule)

const mockCtx = {
  ask: () => {}
}

describe('createGame$', () => {
  it('creates a game', () => {
    const observable = of(playerActions.CREATE_GAME({ gameId: 'test' }))
    return new Promise<void>(resolve => {
      createGame$(observable, mockCtx as any).subscribe(payload => {
        expect(mockedUseGameModule).toHaveBeenCalledTimes(1)
        resolve()
      })
    })
  })
})
