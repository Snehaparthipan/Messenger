import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkleton from '../Skleton/MessageSkleton'

export default function ChatContainer() {
    const{message,getMessages,isMesssagesLoading,selectedUser}=useChatStore()
    useEffect(()=>{
        getMessages(selectedUser._id)
    },[selectedUser._id,getMessages])
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
      <p>Messages...</p>
      <MessageInput/>
    </div>
  )
}
