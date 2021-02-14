import { RedisClient } from 'redis'
import { CacheUtilities } from './types'

export default function createCacheUtilities(
  redisClient: RedisClient
): CacheUtilities {
  const get: CacheUtilities['get'] = resourceId =>
    new Promise((resolve, reject) => {
      redisClient.get(resourceId, (err, data) => {
        if (err) {
          reject(err)
        }
        const parsed = JSON.parse(data)
        resolve(parsed)
      })
    })

  const update: CacheUtilities['update'] = (id, resource) =>
    new Promise((resolve, reject) => {
      redisClient.set(id, JSON.stringify(resource), (err, status) => {
        if (err) {
          reject(err)
        }
        resolve(status === 'OK')
      })
    })

  const exists: CacheUtilities['exists'] = resourceId =>
    new Promise((resolve, reject) => {
      redisClient.exists(resourceId, (err, ok) => {
        if (err) {
          reject(err)
        } else {
          resolve(ok === 1)
        }
      })
    })

  return {
    get,
    update,
    exists
  }
}
