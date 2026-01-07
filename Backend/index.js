const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 
const path=require("path")

const connectDB = require("../Backend/src/Config/db");
const authRoutes = require("../Backend/src/Routes/authRoutes");
const messageRoutes = require("../Backend/src/Routes/messageRoutes");
const { app, server } = require("./src/lib/socket");

const PORT = process.env.PORT || 5000; 
const _dirname=path.resolve()

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(_dirname,"../vite-project/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname,"../vite-project","dist","index.html"))
  })
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
