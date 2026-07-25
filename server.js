require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDB = require("./src/config/database");
const { initializeSocket } = require("./src/socket/socket");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
});
global.io = io;

// Initialize Socket Manager
initializeSocket(io);

// Socket Connection Events
io.on("connection", (socket) => {
    console.log(`🟢 Client Connected : ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`🔴 Client Disconnected : ${socket.id}`);
    });
});

// Start Server
server.listen(PORT, "0.0.0.0", () => {
    console.log("==================================");
    console.log(" Smart Sensory Assist Shoe Server ");
    console.log("==================================");
    console.log(`🚀 Server Running on Port ${PORT}`);
    console.log(`📘 Swagger Docs : /api-docs`);
    console.log("✅ Socket.IO Initialized");
});