import React from 'react';
import { AiOutlineHome, AiOutlineAppstore, AiOutlinePlusCircle, AiOutlineMessage, AiOutlineUser, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import logoAlpro from '../Assets/img/logoAlpro.png';

function Dashboard() {
  return (
    <nav>
      <ul>
        <li>
        <img src={logoAlpro} alt="Logo" className="logo" />
        </li>
        <li>
          <AiOutlineHome className="icon" /> Inicio
        </li>
        <li>
          <AiOutlineAppstore className="icon" /> Inventario
        </li>
        <li>
          <AiOutlinePlusCircle className="icon" /> Agregar producto
        </li>
        <li>
          <AiOutlineMessage className="icon" /> Chat
        </li>
        <li>
          <AiOutlineUser className="icon" /> Usuarios
        </li>
        <li>
          <AiOutlineQuestionCircle className="icon" /> Ayuda
        </li>
      </ul>

      <ul style={{ marginTop: 'auto' }}> {/* Este estilo empuja las dos últimas opciones hacia abajo */}
        <li>
          <AiOutlineSetting className="icon" /> Configuración
        </li>
        <li>
          <AiOutlineLogout className="icon" /> Cerrar sesión
        </li>
      </ul>
    </nav>
  );
}

export default Dashboard;
