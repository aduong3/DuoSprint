import { io, Socket } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;

type QueueData = {
  userId: string;
  skillLevel: string;
  techStack: string;
  username: string;
};

export const socket: Socket = io(URL, {
  autoConnect: false,
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.removeAllListeners();
    socket.disconnect();
    console.log("disconnected socket!");
  }
};

export const joinQueue = ({
  userId,
  skillLevel,
  techStack,
  username,
}: QueueData) => {
  socket.emit("join_queue", { userId, skillLevel, techStack, username });
};

export const sendMessage = (message: string) => {
  socket.emit("send_message", message);
};
