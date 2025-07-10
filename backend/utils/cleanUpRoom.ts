import { Server } from "socket.io";

export function cleanUpRoom(io: Server, rooms: Set<string>, roomId: string) {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room || room.size === 0) {
    rooms.delete(roomId);
  }
}
