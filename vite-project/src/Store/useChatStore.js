import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../Utills/axios"
import { useAuthStore } from "./useAuthStore"

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
    subscribeToMessages:async (userId) => {
        const{selectedUser}=get()
        if(!selectedUser)return

        const socket=useAuthStore.getState().socket

        socket.on("newMessage",(newMessage)=>{
            const isMessageSentFromUser=newMessage.senderId !==selectedUser._id
            if(!isMessageSentFromUser)return
            set({message:[...get().message,newMessage],})
        })
    },
    unsubscribeFromMessages:async (userId) => {
        const socket=useAuthStore.getState().socket
        socket.off("newMessage")
    },
    setSelectedUser:async (selectedUser) => {
        set({selectedUser})
    }
    }))