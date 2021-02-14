import {
  ContextProvider,
  createContextToken,
  createReader,
  useContext
} from '@marblejs/core'
import { CacheUtilities } from '../../lib/redis/types'
import RoomManager from '../../lib/RoomManager'
import createRedisStore from '../../lib/redis'
import GameModule from '../../lib/GameModule'

export const RoomManagerContextToken = createContextToken<RoomManager>(
  'RoomManager'
)

export const RedisStoreContextToken = createContextToken<CacheUtilities>(
  'CacheUtilities'
)

export const GameModuleContextToken = createContextToken<GameModule>(
  'GameModule'
)

export const useRoomManager = (ask: ContextProvider) =>
  useContext(RoomManagerContextToken)(ask)

export const useRedisStore = (ask: ContextProvider) =>
  useContext(RedisStoreContextToken)(ask)

export const useGameModule = (ask: ContextProvider) =>
  useContext(GameModuleContextToken)(ask)

export const roomManagerContextReader = createReader(() => new RoomManager())

export const redisStoreContextReader = createReader(() => createRedisStore())

export const gameModuleContextReader = createReader(ask => {
  const redisStore = useRedisStore(ask)
  return new GameModule(redisStore)
})
