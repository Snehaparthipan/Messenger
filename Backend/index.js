const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const connectDB = require("../Backend/src/Config/db")
const authRoutes = require("../Backend/src/Routes/authRoutes")
const messageRoutes = require("../Backend/src/Routes/messageRoutes")
const { app, server } = require("./src/lib/socket")
app.set("trust proxy", 1)
// ✅ Middlewares
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
  "https://messenger-n218.vercel.app",
  "http://localhost:5174"
]

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like Postman or curl
    if (!origin) return callback(null, true)

    if (allowedOrigins.indexOf(origin) === -1){
      console.log("CORS not allowed for origin:", origin)
      return callback(null, false) // reject CORS without crashing
    }
    callback(null, true)
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
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
