import React, { useState, useEffect } from "react";
import api from "@/lib/api";

function UsersCard() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("api/users/");
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
        const response = await api.get("api/roles/");
        setRoles(response.data);
        console.log("Respuesta de roles:", response.data);
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

  const rolesMap = roles.reduce((acc, rol) => {
    acc[rol.id_rol] = rol.nombre_rol;
    return acc;
  }, {});
  return (
    <section className="bg-white w-[291px] h-[540px] rounded-xl shadow-lg ml-[30px] px-6 py-4">
      <h5 className="text-center text-[18px] font-bold text-black/70 ">
        Trabajores Activos
      </h5>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {usuarios
            .filter((user) => user.id !== currentUserId)
            .map((user) => (
              <li key={user.id} className="py-3">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.user_profile_image}
                    alt={`${user.username}'s perfil`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.username}
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
