import Game from '../../../engine/Game'
import cacheUtils from './game.utils'
import { GameConditions } from '../../../engine/interfaces'
import Player from '../../../engine/Player'
import { GameModuleMethod } from './types'

export default class GameModule {
  static createGame = async (gameConditions: GameConditions): Promise<Game> => {
    const game = new Game(gameConditions)
    await cacheUtils.set(game)
    return game
  }

  static addPlayer: GameModuleMethod<Player, string> = async (
    gameId,
    playerName
  ) => {
    const game = await cacheUtils.get(gameId)
    const player = game.addPlayer(playerName)
    await cacheUtils.set(game)
    return player
  }

  static removePlayer: GameModuleMethod<Player[], string> = async (
    gameId,
    playerId
  ) => {
    const game = await cacheUtils.get(gameId)
    return game.removePlayer(playerId)
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
