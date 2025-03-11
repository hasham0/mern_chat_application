import http from "http";
import "dotenv/config";
import app from "./app.js";
import connectToDB from "./configurations/db.config.js";
import { initilizeSocket } from "./lib/utils/socket/socket.js";

const serverPort = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket
initilizeSocket(server);

/* Database connection and server start */
(async () => {
    try {
        const dbConnection = await connectToDB();
        server.listen(serverPort, () => {
            const { port } = dbConnection.connection;
            console.log(`✅ Database connected at port: ${port}`);
            console.log(`🚀 Server running on port: ${serverPort}`);
        });
    } catch (error) {
        console.error("❌ Failed to start the server:", error);
        process.exit(1);
    }
})();
