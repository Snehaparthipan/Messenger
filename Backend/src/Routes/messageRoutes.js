const express=require("express")
const protectRoute = require("../middleware/auth.middleware")
const { getUser,getMessages,sendMessage } = require("../Controller/messageController")
const router=express.Router()
router.get("/users",protectRoute,getUser)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)

module.exports=router