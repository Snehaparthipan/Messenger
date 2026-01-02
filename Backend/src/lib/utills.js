const jwt=require("jsonwebtoken")

const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge:7 * 24 * 60 * 60 * 1000, //MS
        httpOnly:true,//prevent XSS attacks
        sameSite:"strict", //CSRF attack
        secure: process.env.NODE_ENV ==="development"
    })
    return token;
}
module.exports=generateToken