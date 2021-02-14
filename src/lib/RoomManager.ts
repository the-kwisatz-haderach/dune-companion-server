import { WebSocketClientConnection } from '@marblejs/websockets'

export default class RoomManager {
  private rooms: Record<string, string[]> = {}
  private clientRooms: Record<string, string> = {}
  private clients: Record<string, WebSocketClientConnection> = {}

  create(roomId: string) {
    if (this.rooms[roomId]) {
      throw new Error('Room already exists.')
    }
    this.rooms[roomId] = []
  }

  join(roomId: string, clientId: string, client: WebSocketClientConnection) {
    if (!this.rooms[roomId]) {
      this.create(roomId)
    }
    this.rooms[roomId].push(clientId)
    this.clientRooms[clientId] = roomId
    this.clients[clientId] = client
  }

  leave(clientId: string) {
    const roomId = this.clientRooms[clientId]
    if (!roomId) {
      throw new Error('Client is not part of any room.')
    }
    this.rooms[roomId].splice(this.rooms[roomId].indexOf(clientId), 1)
    delete this.clientRooms[clientId]
    delete this.clients[clientId]
  }

  getClients(roomId: string): WebSocketClientConnection[] {
    return [...this.rooms[roomId].map(id => this.clients[id])]
  }

  getRoom(clientId: string) {
    return this.clientRooms[clientId]
  }

  getRooms() {
    return { ...this.rooms }
  }
}
