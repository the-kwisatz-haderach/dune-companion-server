import User from './user.model'
import { IUser } from './user.schema'

export default class DatabaseAdapter {
  static async findAll(): Promise<IUser[]> {
    return await User.find().exec()
  }

  static async findOne(id: string): Promise<IUser> {
    return await User.findById(id).exec()
  }

  static async create(userDetails: IUser): Promise<IUser['id']> {
    const user = await new User(userDetails).save()
    return user.id
  }

  static async update({ id, username, creationDate }: IUser): Promise<IUser> {
    return await User.findByIdAndUpdate(id, { username, creationDate }).exec()
  }

  static async delete(id: IUser['id']): Promise<IUser['id']> {
    const deleteStatus = await User.deleteOne({ _id: id }).exec()
    return !!deleteStatus.ok
  }
}
