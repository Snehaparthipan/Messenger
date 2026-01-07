const express=require("express")
const cookiPearser=require("cookie-parser")
const cors=require("cors")
const connectDB=require("../Backend/src/Config/db")
const authRoutes=require("../Backend/src/Routes/authRoutes")
const messageRoutes=require("../Backend/src/Routes/messageRoutes")
const {app,server}=require("./src/lib/socket")
app.use(express.json())
app.use(cors({
    origin:"https://messenger-n218.vercel.app/",
    credentials:true
}))
app.use(cookiPearser())
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
server.listen(5000,()=>{
    console.log("server run in 5000")
    connectDB()
})