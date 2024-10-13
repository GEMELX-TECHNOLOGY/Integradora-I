import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../Styles/CardProd.css";

const UserCard = ({ route, rol }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get(route);
        console.log("Respuesta de la API:", response.data);
        setUsuarios(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchRoles = async () => {
      try {
        const response = await api.get(rol);
        setRoles(response.data);
        console.log("Respuesta de roles:", response.data);
      } catch (err) {
        console.error("Error al obtener roles:", err);
        setError(err);
      }
    };

    fetchUsuarios();
    fetchRoles();
  }, [route]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const rolesMap = roles.reduce((acc, rol) => {
    acc[rol.id_rol] = rol.nombre_rol;
    return acc;
  }, {});

  return (
    <div className="max-w-md mx-auto">
    <div className="p-4 bg-white rounded-lg border shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold leading-none">Usuarios</h3>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View all</a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {usuarios.map((user) => (
            <li key={user.id} className="py-3">
              <div className="flex items-center space-x-4">
                <img className="w-8 h-8 rounded-full" src={user.user_profile_image} alt={`${user.user_profile_image}'s perfil`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
                  <p className="text-sm text-gray-500 truncate">{rolesMap[user.rol]}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default UserCard;
