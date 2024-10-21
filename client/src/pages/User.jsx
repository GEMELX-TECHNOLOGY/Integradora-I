import React from 'react'
import Dashboard from '../components/Dashboard';
import '../Styles/Estilodash.css';
import '../Styles/header.css'




function User() {
  return (
    <>
      <Dashboard/>
     
      <div className="header">
      <h1>Empleados</h1>
      <div className="actions">
       
        <select>
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
        <div>
        <input className='entrada' type="text" placeholder="Search Users by Name, Email or Date" />
        </div>
        <div>
        <button className="add-employee">Agregar empleado</button>
        </div>
      </div>
      
      </div>
  
      

     
    </>
  )
}

export default User

