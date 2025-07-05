import http from "http";
import { Server } from "socket.io";
import app from "./app";

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

// 3. Listen for io conection

io.on("connection", () => {});

// 4. Listen for server start
server.listen(PORT, () => {
  console.log(`Listening to server at PORT ${PORT}`);
});
