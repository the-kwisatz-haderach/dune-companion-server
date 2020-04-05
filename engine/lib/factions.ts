export interface FactionPower {}

export interface Faction {
  name: string
  shorthand: string
  powers: FactionPower[]
  description: string
  itemsAllowed: number
  freeRevivals: number
  startingSpice: number
  startingItems: number
  startingCity: number
  strategy: string
}

const factions: { [factionId: number]: Faction } = Object.freeze({
  0: {
    name: 'Bene Gesserit',
    shorthand: 'BNG',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategy: '',
    startingCity: null
  },
  1: {
    name: 'House Atreides',
    shorthand: 'ATR',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategy: '',
    startingCity: 0
  },
  2: {
    name: 'House Harkonnen',
    shorthand: 'HAR',
    powers: [],
    description: '',
    itemsAllowed: 8,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategy: '',
    startingCity: 1
  },
  3: {
    name: 'Fremen',
    shorthand: 'FRE',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategy: '',
    startingCity: null
  },
  4: {
    name: 'Spacing Guild',
    shorthand: 'SGU',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategy: '',
    startingCity: 3
  },
  5: {
    name: 'Emperor',
    shorthand: 'EMP',
    powers: [],
    description: '',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategy: '',
    startingCity: null
  }
})

export default factions
