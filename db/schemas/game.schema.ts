import { Schema, Document } from 'mongoose'
import { IPlayer } from './player.schema'

export interface IGame extends Document {
  currentTurn: number
  currentPhase: number
  players: IPlayer
}

const GameSchema: Schema = new Schema({
  name: String,
  description: String,
  specialRules: []
})

export default GameSchema
