import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Settings from './Pages/Settings'
import Profile from './Pages/Profile'
import { useAuthStore } from './Store/useAuthStore'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './Store/useThemeStore'
export default function App() {
    const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
    const {theme}=useThemeStore()
    useEffect(()=>{
      checkAuth()
    },
    [checkAuth])

    console.log({authUser})
    if (isCheckingAuth && !authUser) {
  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-base-100 flex items-center justify-center"
    >
      <Loader className="size-10 animate-spin" />
    </div>
  );
}
  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <Navbar/>

      <Routes>
        <Route path="/"  element={authUser ? <Home/>: <Navigate to='/login'/>} />
        <Route path="/signup"  element={!authUser ?<Signup/>: <Navigate to='/'/>} />
        <Route path="/login"  element={!authUser ?<Login/>: <Navigate to='/'/>} />
        <Route path="/settings"  element={<Settings/>} />
        <Route path="/profile"  element={authUser ? <Profile/>: <Navigate to='/login'/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}
