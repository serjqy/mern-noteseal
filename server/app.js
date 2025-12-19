import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/conn.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes

// DB Connection
connectDB();

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
