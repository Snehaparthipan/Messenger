import { create } from "zustand";
import { axiosInstance } from "../Utills/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'
// const BASE_URL = import.meta.env.VITE_SOCKET_URL;
const BASE_URL="https://messenger-2-yb82.onrender.com"
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSignUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async () => {
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth :",error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async (data) => {
        set({isSignUp:true})
        try {
            const res=await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("Account Created Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSignUp:false})
        }
    },
    login:async (data) => {
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
            toast.success("Logged in Successfully")

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    logout:async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logout successfull")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    updateProfile:async (data) => {
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile Update Successfully")
        } catch (error) {
            toast.error(error)
        }
        finally{
        set({isUpdatingProfile:false})

        }
    },

    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected) return;
        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect();

        set({socket:socket});

        socket.on("getOnlineUsers" ,(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    },

}))