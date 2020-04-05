import { Schema, Document } from 'mongoose'
import { ICity } from './city.schema'

export interface IFaction extends Document {
  name: string
  powers: []
  description: string
  itemsAllowed: number
  freeRevivals: number
  startingSpice: number
  startingItems: number
  startingCity: ICity
  strategy: string
}

const FactionSchema: Schema = new Schema({
  name: String,
  powers: [],
  description: String,
  itemsAllowed: Number,
  freeRevivals: Number,
  startingSpice: Number,
  startingItems: Number,
  startingCity: {
    type: Schema.Types.ObjectId,
    ref: 'City'
  },
  strategy: String
})

export default FactionSchema
