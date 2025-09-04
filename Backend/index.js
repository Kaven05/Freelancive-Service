const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const requestRoutes = require("./routes/requestRoutes");
const db = require("./db");
const chatRoutes = require("./routes/chatRoutes");
const Message = require("./models/messageModel");
const cors = require("cors");
const { Server } = require("socket.io");
dotenv.config({ path: "./config.env" });

app.use(express.json());

db();

app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/chat", chatRoutes);

const io = new Server(process.env.PORT, {
  cors: { origin: "*" },
});
const userSocketMap = {};


io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("register", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });
  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
  socket.on("chat message", async ({ roomId, senderId, message }) => {
    try {
      await Message.create({ roomId, senderId, message });
      io.to(roomId).emit("chat message", { senderId, message });
    } catch (error) {
      console.error("Error handling chat message:", error);
      return;
    }
  });
  socket.on("disconnect", () => {
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
      }
    }
  });
});

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port 5000");
});
