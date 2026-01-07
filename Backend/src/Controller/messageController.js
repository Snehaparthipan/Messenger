const User = require("../Model/user.model")
const Message = require("../Model/message.model")
const cloudinary = require("cloudinary")
const { getReceiverSocketId, io }=require("../lib/socket")
const getUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("error in Getuser :", error.message)
        res.status(500).json({ message: "internal server errror" })
    }
}
const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id
        const message = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                }
            ]
        })
        res.status(200).json(message)
    } catch (error) {
        console.log("error in Getmessage controller :", error.message)
        res.status(500).json({ message: "internal server errror" })
    }
}
const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id
        let imageUrl = null;

        if (image && image.startsWith("data:image")) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        await newMessage.save()

        //todo: realtime functionality goes here =>socket.io
        const receiverSocketId=getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in Sendmessage controller :", error.message)
        res.status(500).json({ message: "internal server errror" })
    }
}
module.exports = { getUser, getMessages, sendMessage }