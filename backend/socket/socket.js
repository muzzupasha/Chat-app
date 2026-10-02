import { Server } from "socket.io";

const userSocketMap = {};
let io;

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];
export const getIO = () => io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("user is connected", socket.id);

    const userId = socket.handshake.query.userId
      ? String(socket.handshake.query.userId).trim()
      : undefined;

    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      if (userId !== undefined && userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export default initializeSocket;
