import {
  IAuction,
  AuctionParticipant,
  AuctionResults,
  AuctionRound,
  AuctionBid
} from './interfaces'

export default class Auction implements IAuction {
  rounds: AuctionRound[]
  isOpen: boolean
  private currentRound: number
  private readonly participants: AuctionParticipant[]
  private readonly roundsTotal: number

  constructor(participants: AuctionParticipant[]) {
    this.participants = participants
    this.roundsTotal = this.getTotalNumberOfRounds()
    this.currentRound = 0
    this.rounds = []
    this.isOpen = true
  }

  private getTotalNumberOfRounds(): number {
    return this.participants.reduce((numberOfRounds, participant) => {
      if (participant.itemsHeld < participant.itemsAllowed) {
        return (numberOfRounds += 1)
      }
      return numberOfRounds
    }, 0)
  }

  private getActiveParticipants(): AuctionParticipant[] {
    return this.participants.filter(
      participant =>
        participant.spice > 0 &&
        participant.itemsHeld < participant.itemsAllowed
    )
  }

  private getTopBid(round: number): AuctionBid {
    return this.rounds[round].bids.slice(-1)[0]
  }

  private advanceRound(): number | void {
    if (this.isOpen) {
      this.currentRound += 1
      if (this.currentRound > this.roundsTotal) {
        this.isOpen = false
      }
      return this.currentRound
    }
  }

  initiateNewRound(): AuctionRound[] {
    this.advanceRound()
    if (this.isOpen) {
      this.rounds.push({
        roundParticipants: this.getActiveParticipants(),
        bids: []
      })
      return this.rounds
    }
  }

  bid(participantId: string, value: number): AuctionRound[] | void {
    const currentTopValue = this.getTopBid(this.currentRound).value
    if (value > currentTopValue) {
      this.rounds[this.currentRound].bids.push({
        participantId,
        value
      })
      return this.rounds
    }
  }

  pass(participantId: string): AuctionRound[] {
    this.rounds[this.currentRound].roundParticipants = this.rounds[
      this.currentRound
    ].roundParticipants.filter(participant => participant.id !== participantId)
    return this.rounds
  }

  getResults(): AuctionResults {
    return this.generateResults()
  }

  private generateResults(): AuctionResults {
    return this.rounds.reduce(
      (results, round) => {
        const { value, participantId } = round.bids.slice(-1)[0]
        return {
          ...results,
          totalSpiceSpent: results.totalSpiceSpent += value,
          roundResults: [
            ...results.roundResults,
            {
              winner: participantId,
              highestBidValue: value,
              participants: round.roundParticipants
            }
          ]
        }
      },
      {
        totalSpiceSpent: 0,
        totalItemsAuctioned: this.roundsTotal,
        participants: this.participants,
        roundResults: []
      }
    )
  }
}
