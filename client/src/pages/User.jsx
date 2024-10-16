import React from 'react'
import Dashboard from '../components/Dashboard';
import '../Styles/Estilodash.css';
import UserCard from '../components/UserCard';
import Header from '../components/Header'; 




function User() {
  return (
    <>
      <Dashboard/>
      <Header />
      <UserCard/>

     
    </>
  )
}

export default User

