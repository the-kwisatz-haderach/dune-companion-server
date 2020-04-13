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

const factions: Faction[] = [
  {
    name: 'Bene Gesserit',
    shorthand: 'BNG',
    powers: [],
    description:
      'The origins of the Bene Gesserit are not widely known. What is clear is that the Bene Gesserit arose in the political turmoil that followed the Butlerian Jihad, and quickly established themselves as an influential political force. However, during the Butlerian Jihad, the Bene Gesserit already had a Reverend Mother Superior, which seems to show that their hierarchical structure had already formed.',
    itemsAllowed: 4,
    freeRevivals: 0,
    startingSpice: 0,
    startingItems: 1,
    strategy: '',
    startingCity: null
  },
  {
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
  {
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
  {
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
  {
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
  {
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
]

export default factions
