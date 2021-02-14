import { CacheUtilities } from '../redis/types'

export default class GameModuleMock {
  store: CacheUtilities

  constructor() {
    this.store = {
      get: () => Promise.resolve({}),
      exists: () => Promise.resolve(true),
      update: () => Promise.resolve(true)
    }
  }

  async createGame() {
    return {}
  }

  async joinGame() {
    return {}
  }

  async updateGame() {
    return {}
  }
}
