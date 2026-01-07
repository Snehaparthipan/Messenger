import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkleton from '../Skleton/MessageSkleton'
import { useAuthStore } from '../Store/useAuthStore'
import { formatMessageTime } from '../Utills/date'
import { useRef } from 'react'

export default function ChatContainer() {
    const{message,getMessages,isMesssagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages}=useChatStore()
    const{authUser}=useAuthStore()
    const messageEndRef=useRef(null)
    useEffect(()=>{
        getMessages(selectedUser._id)
        subscribeToMessages()
        return ()=>unsubscribeFromMessages()
    },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])

    useEffect(()=>{
      if(messageEndRef.current && message){

        messageEndRef.current.scrollIntoView({behavior:"smooth"})
      }
    },[message])
    if(isMesssagesLoading) return( 
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <MessageSkleton/>
        <MessageInput/>
    </div>
    )
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 '>
        {message.map((messages)=>(
          <div
          key={messages._id}
          className={`chat ${messages.senderId===authUser._id ? "chat-end" :"chat-start"}`}
          ref={messageEndRef}>
            <div className=' chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={messages.senderId===authUser._id ? authUser.profilePic || "https://cdn-icons-png.flaticon.com/512/12225/12225881.png": selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/512/12225/12225881.png"} alt="profile Pic" />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>{formatMessageTime(messages.createdAt)}</time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {messages.image && (
                <img src={messages.image} alt="Attatchment" className='sm:max-w-[200px] rounded-md mb-2'/>
              )}
              {messages.text && <p>{messages.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput/>
    </div>
  )
}
