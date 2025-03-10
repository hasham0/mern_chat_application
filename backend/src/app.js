// import and set dotenv config
import dotenv from "dotenv";
dotenv.config();

// import modules
import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

// import api routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// import global level error handle middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

// set variable
const app = express();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CROSS_ORIGIN,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// set routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// set global level error handling middlwere
app.use(errorMiddleware);

export default app;
