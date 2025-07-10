import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import app from "./app";
import { findMatch } from "./utils/findMatch";

const DB_URI = process.env.DATABASE_URI!;
const DB_USER = process.env.DATABASE_USER!;
const DB_PWD = process.env.DATABASE_PWD!;

const DB = DB_URI?.replace("<user>", DB_USER).replace("<password>", DB_PWD);

const PORT = 3000;

// 1. Create server from Express app
const server = http.createServer(app);

// 2. Create socket.io server and attach it to server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

type User = {
  socketId: string;
  userId: string;
  username: string;
  skillLevel: string;
  techStack: string[];
};

const queue: User[] = [];
const rooms: string[] = [];
// 3. Listen for io conection
io.on("connection", (socket) => {
  // skillLevel = beginner, intermediate, expert
  // techStack = React, JavaScript, Python, etc
  socket.on("join_queue", ({ userId, skillLevel, techStack, username }) => {
    //if the user is already in the queue, then do nothing.
    if (queue.find((queuedUser) => queuedUser.userId === userId)) return;

    //create a new user to push into the queue.
    const newUser = {
      socketId: socket.id,
      userId,
      username,
      skillLevel,
      techStack,
    };
    queue.push(newUser);

    //Look in queue to find someone with similar skillLevel and techStack.
    const matchedUser = findMatch(queue, newUser);

    if (!matchedUser) return;

    //remove both the user and matchedUser from queue.
    for (let i = queue.length - 1; i >= 0; i--) {
      if (
        queue[i].userId === matchedUser.userId ||
        queue[i].userId === newUser.userId
      ) {
        queue.splice(i, 1);
      }
    }
    //create new room, add both to room
    let newRoomId;
    do {
      newRoomId = Math.random().toString(36).substring(0, 8);
    } while (rooms.includes(newRoomId));

    rooms.push(newRoomId);

    const matchedUserSocket = io.sockets.sockets.get(matchedUser.socketId);
    const userSocket = io.sockets.sockets.get(newUser.socketId);

    matchedUserSocket?.join(newRoomId);
    userSocket?.join(newRoomId);

    matchedUserSocket?.emit("match_found", {
      newRoomId,
      partner: newUser.username,
    });
    userSocket?.emit("match_found", {
      newRoomId,
      partner: matchedUser.username,
    });
  });
});

mongoose.connect(DB).then(() => console.log("Connected to Database!"));

// 4. Listen for server start
server.listen(PORT, () => {
  console.log(`Listening to server at PORT ${PORT}`);
});
