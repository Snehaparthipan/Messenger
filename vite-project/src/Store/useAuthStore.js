import { create } from "zustand";
import { axiosInstance } from "../Utills/axios";
import toast from "react-hot-toast";
import { Await } from "react-router-dom";
import axios from "axios";

export const useAuthStore=create((set)=>({
    authUser:null,
    isSignUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async () => {
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data})
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
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSignUp:false})
        }
    },
    login:async (data) => {
        set({isLoggingIng:true})
        try {
            const res=await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
            toast.success("Logged in Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingIng:false})
        }
    },
    logout:async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logout successfull")
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
            toast.error(error.response.data.message)
        }
        finally{
        set({isUpdatingProfile:false})

        }
    }
}))