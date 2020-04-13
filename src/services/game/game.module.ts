import Game from '../../../engine/Game'
import cacheUtils from './game.utils'
import { GameConditions } from '../../../engine/interfaces'
import { GameModuleMethod } from './types'

export default class GameModule {
  static createGame = async (gameConditions: GameConditions): Promise<Game> => {
    try {
      const game = new Game(gameConditions)
      await cacheUtils.set(game)
      return game
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static addPlayer: GameModuleMethod<Game, string> = async (
    gameId,
    playerName
  ) => {
    const game = await cacheUtils.get(gameId)
    game.addPlayer(playerName)
    await cacheUtils.set(game)
    return game
  }

  static removePlayer: GameModuleMethod<Game, string> = async (
    gameId,
    playerId
  ) => {
    const game = await cacheUtils.get(gameId)
    game.removePlayer(playerId)
    return game
  }

  static advanceTurn: GameModuleMethod<number> = async gameId => {
    const game = await cacheUtils.get(gameId)
    return game.advanceTurn()
  }

  static advancePhase: GameModuleMethod<number> = async gameId => {
    const game = await cacheUtils.get(gameId)
    return game.advancePhase()
  }
}
