import React from 'react';
import { AiOutlineHome, AiOutlineAppstore, AiOutlinePlusCircle, AiOutlineMessage, AiOutlineUser, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import logoAlpro from '../Assets/img/logoAlpro.png';
import { Link } from 'react-router-dom';
function Dashboard() {
  return (
    <nav>
      <ul>
        <li>
        <img src={logoAlpro} alt="Logo" className="logo" />
        </li>
        <li>
          <Link to={"/"}> <AiOutlineHome className="icon" />Inicio</Link>
        </li>
        <li>
          <Link to={"/Inventario"}><AiOutlineAppstore className="icon" />Inventario</Link> 
        </li>
        <li>
          <Link to={"/Agregar-Producto"}><AiOutlinePlusCircle className="icon" /> Agregar producto</Link> 
        </li>
        <li>
          <Link to={"/Chat"}><AiOutlineMessage className="icon" /> Chat</Link>
        </li>
        <li>
          <Link to={"/Usuarios"}><AiOutlineUser className="icon" /> Usuarios</Link>
        </li>
        <li>
          <Link to={"/Ayuda"}><AiOutlineQuestionCircle className="icon" /> Ayuda</Link>
        </li>
      </ul>

      <ul style={{ marginTop: 'auto' }}> {/* Este estilo empuja las dos últimas opciones hacia abajo */}
        <li>
          <Link to={"/Configuracion"}><AiOutlineSetting className="icon" /> Configuración</Link>
        </li>
        <li>
          <Link to={"/Logout"}><AiOutlineLogout className="icon" /> Cerrar sesión</Link> 
        </li>
      </ul>
    </nav>
  );
}

export default Dashboard;
