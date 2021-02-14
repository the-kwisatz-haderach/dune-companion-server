import redis, { RedisClient } from 'redis'

export default function createRedisClient(): RedisClient {
  const client = redis.createClient({
    url: global.config.REDIS_URI
  })

  client.on('connect', () => {
    console.log('Connected to redis store')
  })

  client.on('error', err => {
    console.error('Error: ', err)
  })

  client.on('end', () => {
    console.log('Redis connection closed')
  })

  return client
}
