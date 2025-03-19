import React from 'react'
import Navigation from '@/components/Navigation'
import Header from '@/components/Header'
import Inbox from '@/components/Inbox'

function Chat() {
  return (
    <div className="flex h-screen">
    <Navigation />
    <div className="flex-1">
      <Header />
      <div>
        <Inbox/>
      </div>
    </div>
  </div>
  )
}

export default Chat