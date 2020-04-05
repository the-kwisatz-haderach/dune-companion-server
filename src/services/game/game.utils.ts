import Game from '../../../engine/Game'
import { RedisClient } from 'redis'
import createRedisClient from '../../../store/redisClient'

const store = createRedisClient()

interface CacheUtilities {
  get: (gameId: string) => Promise<Game>
  set: (game: Game) => Promise<boolean>
}

function createRedisUtilities(redisClient: RedisClient): CacheUtilities {
  const get: CacheUtilities['get'] = gameId =>
    new Promise((resolve, reject) => {
      redisClient.get(gameId, (err, data) => {
        if (err) {
          reject(err)
        }
        const parsed = JSON.parse(data)
        resolve(new Game(parsed))
      })
    })

  const set: CacheUtilities['set'] = game =>
    new Promise((resolve, reject) => {
      redisClient.set(game.id, JSON.stringify(game), (err, status) => {
        if (err) {
          reject(err)
        }
        resolve(status === 'OK')
      })
    })

  return {
    get,
    set
  }
}

export default createRedisUtilities(store)
