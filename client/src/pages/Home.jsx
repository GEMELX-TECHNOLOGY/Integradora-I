import React from 'react'
import Dashboard from '../components/Dashboard'
import Card from '../components/Card'
import '../Styles/Estilodash.css'; 
function Home() {
  return (
    <>
    <div classname="flex">
    <Dashboard/>
    <Card/>
    </div>
    </>
  )
}

export default Home