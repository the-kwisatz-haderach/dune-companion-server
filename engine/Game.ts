import { v4 as uuid } from 'uuid'
import { IGame, GameConditions } from './interfaces'
import Auction from './Auction'
import Player from './Player'
import * as lib from './lib'

export default class Game implements IGame {
  currentTurn: number
  currentPhase: number
  maxPlayers: number
  advancedMode: boolean
  maxTurns: number
  readonly id: string
  readonly players: Player[]

  constructor(
    conditions: GameConditions = {
      maxTurns: 10,
      advancedMode: false,
      maxPlayers: 6,
      currentPhase: 0,
      currentTurn: 0,
      players: [],
      id: null
    }
  ) {
    this.maxTurns = conditions.maxTurns
    this.maxPlayers = conditions.maxPlayers
    this.advancedMode = conditions.advancedMode
    this.currentTurn = conditions.currentTurn || 0
    this.currentPhase = conditions.currentPhase || 0
    this.players = conditions.players || []
    this.id = conditions.id || uuid()
  }

  addPlayer(playerName: string): Player {
    const newPlayer = new Player(playerName)
    this.players.push(newPlayer)
    return newPlayer
  }

  removePlayer(playerId: string): Player[] {
    return this.players.filter(player => player.id !== playerId)
  }

  advanceTurn(): number {
    this.currentTurn += 1
    return this.currentTurn
  }

  advancePhase(): number {
    this.currentPhase += 1
    return this.currentPhase
  }

  initiateAuction(): Auction {
    const participants = this.players.map(player => ({
      id: player.id,
      spice: player.spice,
      itemsHeld: player.itemsHeld,
      itemsAllowed: lib.factions[player.factionId].itemsAllowed
    }))
    return new Auction(participants)
  }
}
