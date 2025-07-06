import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import app from "./app";

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

// 3. Listen for io conection

io.on("connection", () => {});

mongoose.connect(DB).then(() => console.log("Connected to Database!"));

// 4. Listen for server start
server.listen(PORT, () => {
  console.log(`Listening to server at PORT ${PORT}`);
});
