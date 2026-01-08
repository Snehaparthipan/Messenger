const express=require("express")
const router=express.Router()
const{ signup, login, logout, updateProfile,checkAuth}=require("../Controller/authController")
const protectRoute = require("../middleware/auth.middleware")
router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

// router.put("/update-profile",protectRoute,updateProfile)
const multer = require("multer")

const storage = multer.diskStorage({})
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } })

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
)
router.get("/check",protectRoute,checkAuth)

module.exports=router

