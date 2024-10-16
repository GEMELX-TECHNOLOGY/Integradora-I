import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <h1>Empleados</h1>
      <div className="actions">
        <select>
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
        <input type="text" placeholder="Search Users by Name, Email or Date" />
        <button className="add-employee">Agregar empleado</button>
      </div>
      
    </div>
  );
}

export default Header;


