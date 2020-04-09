import { webSocketListener } from '@marblejs/websockets'
import gameEffects from './services/game'

export default webSocketListener({
  middlewares: [],
  effects: gameEffects
})
