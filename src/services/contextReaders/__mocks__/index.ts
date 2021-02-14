import GameModule from '../../../lib/GameModule'
import RoomManager from '../../../lib/RoomManager'

export const useGameModule = jest.fn((ask: any) => new GameModule({} as any))

export const useRoomManager = jest.fn((ask: any) => new RoomManager())

export const useRedisStore = jest.fn((ask: any) => ({}))
