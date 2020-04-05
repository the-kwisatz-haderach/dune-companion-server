import { Schema, Document } from 'mongoose'

export interface ICity extends Document {
  name: string
  description: string
  specialRules: []
}

const CitySchema: Schema = new Schema({
  name: String,
  description: String,
  specialRules: []
})

export default CitySchema
