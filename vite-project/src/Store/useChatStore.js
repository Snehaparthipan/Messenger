import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../Utills/axios"

export const useChatStore=create((set,get)=>({
    message:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMesssagesLoading:false,

    getUser:async () => {
        set({isUsersLoading:true})
        try {
            const res=await axiosInstance.get("/message/users")
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async (userId) => {
        set({isMesssagesLoading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`)
            set({message:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isMesssagesLoading:false})
        }
    },
    sendMessages:async (messageData) => {
        const{selectedUser,message}=get()
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({message:[...message,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    setSelectedUser:async (selectedUser) => {
        set({selectedUser})
    }
}))