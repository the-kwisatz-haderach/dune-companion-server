import User, { IUser } from './models/user.model'

export default class DatabaseAdapter {
  static async findAll() {
    return await User.find().exec()
  }

  static async findOne(id: string) {
    return await User.findById(id).exec()
  }

  static async create(user: IUser) {
    return await new User(user).save()
  }

  static async update({ id, username, creationDate }: IUser) {
    return await User.findByIdAndUpdate({ _id: id }, { username, creationDate })
  }
}
