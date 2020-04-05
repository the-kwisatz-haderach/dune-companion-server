import { Schema, Document } from 'mongoose'
import { ICity } from './city.schema'
import { IFaction } from './faction.schema'

export interface IPlayer extends Document {
  name: string
  faction: IFaction
  spiceHeld: number
  itemsHeld: number
  citiesHeld: ICity[]
  allies: IPlayer[]
}

export const PlayerSchema: Schema = new Schema({
  name: String,
  faction: {
    type: Schema.Types.ObjectId,
    ref: 'Faction'
  },
  spiceHeld: Number,
  itemsHeld: Number,
  citiesHeld: [
    {
      type: Schema.Types.ObjectId,
      ref: 'City'
    }
  ],
  allies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
})
