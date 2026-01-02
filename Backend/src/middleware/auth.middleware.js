const jwt=require("jsonwebtoken")
const User=require("../Model/user.model")

const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Unauthorized - No token Provided"})
        }
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Token is Invalid"})
        }
        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        req.user=user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware :",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports=protectRoute