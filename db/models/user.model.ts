import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  creationDate: Date
}

const UserSchema: Schema = new Schema({
  username: String,
  creationDate: Date
})

const User = model<IUser>('User', UserSchema)

export default User
