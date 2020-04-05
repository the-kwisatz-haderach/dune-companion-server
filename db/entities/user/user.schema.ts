import { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  creationDate: Date
}

const UserSchema: Schema = new Schema({
  username: String,
  creationDate: Date
})

export default UserSchema
