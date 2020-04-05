import Player from './Player'

export interface GameConditions {
  advancedMode: boolean
  maxPlayers: number
  maxTurns: number
  currentTurn?: number
  currentPhase?: number
  readonly id?: string
  readonly players?: Player[]
}

export interface IGame extends GameConditions {
  currentTurn: number
  currentPhase: number
  readonly id: string
  readonly players: Player[]
}

export interface IPlayer {
  id: string
  name: string
  factionId: number
  spice: number
  itemsHeld: number
  citiesHeld: number[]
  allies: number[]
}

export interface AuctionBid {
  value: number
  participantId: AuctionParticipant['id']
}

export interface AuctionRound {
  roundParticipants: AuctionParticipant[]
  bids: AuctionBid[]
}

export interface AuctionParticipant {
  id: string
  spice: number
  itemsHeld: number
  itemsAllowed: number
}

export interface AuctionResults {
  totalSpiceSpent: number
  totalItemsAuctioned: number
  participants: AuctionParticipant[]
  roundResults: {
    winner: AuctionParticipant['id']
    highestBidValue: number
    participants: AuctionParticipant[]
  }[]
}

export interface IAuction {
  isOpen: boolean
}
