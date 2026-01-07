const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

const connectDB = require("../Backend/src/Config/db");
const authRoutes = require("../Backend/src/Routes/authRoutes");
const messageRoutes = require("../Backend/src/Routes/messageRoutes");
const { app, server } = require("./src/lib/socket");

const PORT = process.env.PORT || 5000; // 👈 from .env

app.use(express.json());
app.use(
  cors({
    origin:"https://messenger-n218.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
