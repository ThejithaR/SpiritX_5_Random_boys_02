import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import playerRouter from "./routes/playerRoutes.js";

const app = express(); // initializing express app
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); // aloowed to send cookies in the response from the express app

// API Endpoints
app.get("/", (req, res) => {
  res.send("API is Working");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/player", playerRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
