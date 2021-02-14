import createRedisClient from './redisClient'
import createCacheUtilities from './createCacheUtilities'

export default () => createCacheUtilities(createRedisClient())
