import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Settings from './Pages/Settings'
import Profile from './Pages/Profile'
import { useAuthStore } from './Store/useAuthStore'
export default function App() {
    const {authUser,checkAuth,isCheckingAuth}=useAuthStore

    useEffect(()=>{
      checkAuth();
    },
    [checkAuth])

    console.log({authUser})
    if(isCheckingAuth  && !authUser) return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/signup"  element={<Signup/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/settings"  element={<Settings/>} />
        <Route path="/profile"  element={<Profile/>} />
      </Routes>

    </div>
  )
}
