import { v4 as uuid } from 'uuid'
import { IPlayer } from './interfaces'
import * as lib from './lib'

export default class Player implements IPlayer {
  readonly id: string
  readonly name: string
  factionId: number
  spice: number
  itemsHeld: number
  citiesHeld: number[]
  allies: number[]

  constructor(name: string) {
    this.id = uuid()
    this.name = name
    this.allies = []
  }

  selectFaction(factionId: number): void {
    this.factionId = factionId
    this.spice = lib.factions[factionId].startingSpice
    this.itemsHeld = lib.factions[factionId].startingItems
    this.citiesHeld = [lib.factions[factionId].startingCity]
  }

  deselectFaction(): void {
    this.factionId = null
    this.spice = 0
    this.itemsHeld = 0
    this.citiesHeld = []
  }
}
