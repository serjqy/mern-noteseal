import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
