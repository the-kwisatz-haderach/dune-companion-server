import Game from '../../../engine/Game'
import cacheUtils from './game.utils'
import { GameConditions, IPlayer } from '../../../engine/interfaces'

export default class GameModule {
  static async createGame(gameConditions: GameConditions): Promise<Game['id']> {
    const game = new Game(gameConditions)
    await cacheUtils.set(game)
    return game.id
  }

  static async addPlayer(
    gameId: Game['id'],
    playerName: string
  ): Promise<IPlayer> {
    const game = await cacheUtils.get(gameId)
    const player = game.addPlayer(playerName)
    await cacheUtils.set(game)
    return player
  }

  static async removePlayer(
    gameId: string,
    playerId: IPlayer['id']
  ): Promise<IPlayer[]> {
    const game = await cacheUtils.get(gameId)
    return game.removePlayer(playerId)
  }

  static async advanceTurn(gameId: Game['id']): Promise<number> {
    const game = await cacheUtils.get(gameId)
    return game.advanceTurn()
  }

  static async advancePhase(gameId: Game['id']): Promise<number> {
    const game = await cacheUtils.get(gameId)
    return game.advancePhase()
  }
}
