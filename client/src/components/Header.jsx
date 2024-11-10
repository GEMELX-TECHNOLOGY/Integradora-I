import React from "react";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import api from "@/lib/api";
const NamePage = {
  "/": "Inicio",
  "/Inventario": "Inventario",
  "/Agregar-Producto": "Agregar Productos",
  "/Chat": "Mensajería",
  "/Empleados": "Empleados",
  "/Ayuda": "Ayuda",
  "/Clientes": "Clientes",
  "/Cotizaciones": "Cotizaciones",
  "/Devoluciones": "Devoluciones",
  "/Reportes-Ventas": "Reporte Ventas"
};

function Header() {
  const [user, setUser] = useState({ first_name: '', last_name: '', rol: '', profile_image: '' });

  useEffect(() => {
      const token = localStorage.getItem('access');
      if (token) {
          getUserDetails(token);
      }
  }, []);

  const getUserDetails = async (token) => {
      try {
          const response = await api.get('/api/v1/user/', {
              headers: {
                  Authorization: `Token ${token}`,
              },
          });
          const { first_name, last_name, rol, profile_image } = response.data;
          const imageUrl = profile_image ? `http://127.0.0.1:8000${profile_image}` : null;
          setUser({ first_name, last_name, rol, profile_image: imageUrl });

      } catch (error) {
          console.error('Error fetching user details:', error);
      }
  };

  const location = useLocation();
  const pageTitle = NamePage[location.pathname];
  return (
    <header className="max-w-[1600px]">
      <div className="flex justify-between items-center p-11">
        <h1 className="text-titlepage font-bold text-[28px]">{pageTitle}</h1>
        <div>
          <div className="flex bg-white rounded-xl px-4 py-2">
            <img src={user.profile_image} alt={`${user.username} profile`} className="rounded-full h-[42px] w-[42px]" />
            <div className="pl-4">
              <span className="text-titlepage font-bold text-sm">
                {user.first_name} {user.last_name}
              </span>
              <p className="text-xs text-black/70 font-medium">{user.rol}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
