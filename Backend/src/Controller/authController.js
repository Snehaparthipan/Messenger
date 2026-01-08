const User=require("../Model/user.model")
const bcrypt=require("bcryptjs")
const generateToken=require("../lib/utills")
const cloudinary=require("../lib/cloudinary")
const signup=async(req,res)=>{
    const{email,fullName,password}=req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"password must be at least  6 charecters"})
        }
        const user=await User.findOne({email})
        if(user) return res.status(400).json({message:"email already exists"})
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message:"inavlid user data"})
        }
    } catch (error) {
        console.log("error in signup controller",error.messsage)
        res.status(500).json({message:"Internal server error"})
    }
}
const login=async (req,res)=>{
    const{email, password}=req.body
    try {
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credential"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credential"})
        }
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    } catch (error) {
        console.log("error in login controller",error.messsage)
        res.status(500).json({message:"Internal server error"})
    }
}
const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log("error in logout controller",error.messsage)
        res.status(500).json({message:"Internal server error"})
    }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id

    if (!req.file) {
      return res.status(400).json({ message: "Profile pic is required" })
    }

    const uploadResponse = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "profiles" }
    )

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("error in update profile:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}


const checkAuth=async (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in Auth Controller :",error)
        res.status(500).json({message:"Internal server error"})
    }
}


module.exports={signup,login,logout,updateProfile,checkAuth}