const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const connectDB = require("../Backend/src/Config/db")
const authRoutes = require("../Backend/src/Routes/authRoutes")
const messageRoutes = require("../Backend/src/Routes/messageRoutes")
const { app, server } = require("./src/lib/socket")

// ✅ Middlewares
app.use(express.json())
app.use(cookieParser())

// ✅ CORS (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5174",
  "https://messenger-n218.vercel.app"
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("CORS not allowed"))
    }
  },
  credentials: true
}))

// ✅ Routes
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

// ✅ Start server correctly (Render compatible)
const PORT = process.env.PORT || 5000

connectDB()

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
