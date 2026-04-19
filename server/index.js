import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      // process.env.FRONTEND_URL_NETLIFY,
      // process.env.FRONTEND_URL_VERCEL,
    ],
    credentials: true,
  }),
);
console.log(process.env.FRONTEND_URL_NETLIFY, "frontend url");
console.log(process.env.FRONTEND_URL, "frontend url");

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use("/login", (req, res) => {
  res.send("Hello World welcome to my The True Topper API");
});

app.get("/", (req, res) => {
  res.send("Hello World welcome to my The True Topper API");
});
app.get("/api", (req, res) => {
  res.send("Hello World welcome to my The True Topper API222");
});

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
