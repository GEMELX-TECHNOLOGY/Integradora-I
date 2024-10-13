import React from 'react';
import Dashboard from '../components/Dashboard';
import UserCard from '../components/UserCard';
import Card from '../components/Card';

function Home() {
  return (
    <>
    
    <Dashboard />
    <Card/>
    <UserCard route='api/user' rol='api/rol' />
    
    </>
  );
}

export default Home;
