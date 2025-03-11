import "dotenv/config";
import { Server } from "socket.io";

let io;
const userSocketMap = {};

const getReceiverSocketId = (userId) => userSocketMap[userId];

function initilizeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.CROSS_ORIGIN,
        },
    });

    // use to store online users
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap[userId] = socket.id;
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // disconnect user
        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
}

export { io, initilizeSocket, getReceiverSocketId };
