import React from 'react'
import Navigation from '@/components/Navigation'
import Header from '@/components/Header'
import InboxNoChat from '@/components/InboxNoChat'

function Chat() {
  return (
    <div className="flex h-screen">
    <Navigation />
    <div className="flex-1">
      <Header />
      <div>
        <InboxNoChat/>
      </div>
    </div>
  </div>
  )
}

export default Chat