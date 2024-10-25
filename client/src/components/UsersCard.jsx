import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";

function UsersCard() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeesCard = 5;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("api/users/");
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
        const response = await api.get("api/roles/");
        setRoles(response.data);
      } catch (err) {
        console.error("Error al obtener roles:", err);
        setError(err);
      }
    };

    fetchUsuarios();
    fetchRoles();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentUserId = localStorage.getItem("id");

  // Mezclar usuarios aleatoriamente y seleccionar 4
  const shuffledUsers = usuarios
    .filter((user) => user.id !== currentUserId)
    .sort(() => Math.random() - 0.5)
    .slice(0, employeesCard);

  const rolesMap = roles.reduce((acc, rol) => {
    acc[rol.id_rol] = rol.nombre_rol;
    return acc;
  }, {});

  return (
    <section className="bg-white w-[291px] h-[540px] rounded-xl shadow-lg ml-[30px] px-6 py-4">
      <div className="flex flex-row justify-between items-center ">
        <h5 className="text-center text-[18px] font-bold text-black/70 ">
          Empleados
        </h5>
        <Link
          to="/Empleados"
          className="text-[14px] mr-6 text-black/70 font-semibold hover:text-[#045E9C]"
        >
          Ver todos
        </Link>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {shuffledUsers.map((user) => (
            <li key={user.id} className="py-3">
              <div className="flex items-center space-x-4">
                <img
                  className="w-16 h-16 rounded-full"
                  src={user.user_profile_image}
                  alt={`${user.username}'s perfil`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {rolesMap[user.rol]}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default UsersCard;
