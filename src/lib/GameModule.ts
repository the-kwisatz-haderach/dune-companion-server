import { v4 as uuid } from 'uuid'
import dune, { playerActions, Game, createGame } from 'dune'
import { CacheUtilities } from './redis/types'

export default class GameModule {
  private readonly store: CacheUtilities

  constructor(store: CacheUtilities) {
    this.store = store
  }

  async createGame(
    action: ReturnType<typeof playerActions['CREATE_GAME']>
  ): Promise<Game> {
    const gameId = action.payload.gameId ?? uuid()
    if (await this.store.exists(gameId)) {
      throw new Error('Game id is already in use.')
    }

    const game = createGame(gameId)

    if (await this.store.update(gameId, game)) {
      return game
    }
  }

  async joinGame(
    action: ReturnType<typeof playerActions['JOIN_GAME']>
  ): Promise<Game> {
    if (await !this.store.exists(action.payload.gameId)) {
      throw new Error(`No game exists with id: ${action.payload.gameId}`)
    }
    const game = (await this.store.get(action.payload.gameId)) as Game
    const updatedGame = dune(game, action)
    if (await this.store.update(action.payload.gameId, updatedGame)) {
      return updatedGame
    } else {
      return game
    }
  }

  async updateGame(
    action: ReturnType<typeof playerActions[keyof typeof playerActions]>
  ): Promise<Game> {
    const game = (await this.store.get(action.payload.gameId)) as Game
    const updatedGame = dune(game, action)
    if (await this.store.update(action.payload.gameId, updatedGame)) {
      return updatedGame
    } else {
      return game
    }
  }
}
