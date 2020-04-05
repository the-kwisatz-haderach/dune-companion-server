import { model } from 'mongoose'
import UserSchema, { IUser } from './user.schema'

const User = model<IUser>('User', UserSchema)

export default User
