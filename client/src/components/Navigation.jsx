import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "@/lib/api";
import {
  HomeIcon,
  InventoryIcon,
  ClientIcon,
  AddProductIcon,
  ChatIcon,
  EmployeesIcon,
  LogoutIcon,
  CotizacionIcon,
  ReportVenIcon,
  ProveedoresIcon,
  HorarioIcon,
  NominaIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@/icons/Icons";

// Configuración de navegación
const navigationConfig = {
  Administrador: [
    {
      item: "Inicio",
      icon: <HomeIcon className="mr-4" />,
      url: "/",
    },
    {
      item: "Empleados",
      icon: <EmployeesIcon className="mr-4" />,
      subItems: [
        {
          item: "Empleados",
          icon: <EmployeesIcon className="mr-4" />,
          url: "Empleados",
        },
        {
          item: "Horarios",
          icon: <HorarioIcon className="mr-4" />,
          url: "Horarios",
        },
        {
          item: "Nóminas",
          icon: <NominaIcon className="mr-4" />,
          url: "Nominas",
        },
      ],
    },
    {
      item: "Mensajería",
      icon: <ChatIcon className="mr-4" />,
      url: "/Chat",
    },
    {
      item: "Productos",
      icon: <InventoryIcon className="mr-4" />,
      subItems: [
        {
          item: "Agregar Producto",
          icon: <AddProductIcon className="mr-4"/>,
          url: "Agregar-Producto",
        },
        {
          item: "Invetario",
          icon: <InventoryIcon className="mr-4"/>,
          url: "Inventario",
        },
        {
          item: "Proveedores",
          icon: <ProveedoresIcon className="mr-4"/>,
          url: "Proveedores"
        },
      ]
    },
    {
      item: "Ventas",
      icon: <ReportVenIcon className="mr-4"/>,
      subItems: [

        {
          item: "Cotizaciones",
          icon: <CotizacionIcon className="mr-4"/>,
          url: "Cotizaciones",
        },
        {
          item: "Ventas",
          icon: <ReportVenIcon className="mr-4"/>,
          url: "Ventas",
        },
        {
          item: "Clientes",
          icon: <ClientIcon className="mr-4"/>,
          url: "Clientes"
        },
        {
          item: "Reporte de ventas",
          icon: <ReportVenIcon className="mr-4"/>,
          url: "Reportes-Ventas",
        }
      ]
    },
  ],
  Inventario: [
    {
      item: "Inicio",
      icon: <HomeIcon className="mr-4" />,
      url: "",
    },
    {
      item: "Agregar Producto",
      icon: <AddProductIcon className="mr-4"/>,
      url: "/Agregar-Producto",
    },
    {
      item: "Invetario",
      icon: <InventoryIcon className="mr-4"/>,
      url: "/Inventario",
    },
    {
      item: "Proveedores",
      icon: <ProveedoresIcon className="mr-4"/>,
      url: "/Proveedores"
    }
  ],

  Ventas: [
    {
      item: "Inicio",
      icon: <HomeIcon className="mr-4" />,
      url: "",
    },
    {
      item: "Cotizaciones",
      icon: <CotizacionIcon className="mr-4"/>,
      url: "/Cotizaciones",
    },
    {
      item: "Ventas",
      icon: <ReportVenIcon className="mr-4"/>,
      url: "/Ventas",
    },
    {
      item: "Clientes",
      icon: <ClientIcon className="mr-4" />,
      url: "Clientes",
    },
    {
      item: "Reportes Ventas",
      icon: <ReportVenIcon className="mr-4" />,
      url: "Reportes-Ventas",
    },
  ],
  "Recursos Humanos": [
    {
      item: "Inicio",
      icon: <HomeIcon className="mr-4" />,
      url: "",
    },
    {
      item: "Empleados",
      icon: <EmployeesIcon className="mr-4" />,
      url: "Empleados",
    },
  ],
};

// Componente de navegación
function Navigation() {
  const location = useLocation();
  const [rol, setRol] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) fetchUserRole(token);
  }, []);

  const fetchUserRole = async (token) => {
    try {
      const response = await api.get("/api/v1/user/", {
        headers: { Authorization: `Token ${token}` },
      });
      const { rol } = response.data;
      setRol(rol);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const toggleExpand = (item) => {
    setExpandedItem((prev) => (prev === item ? null : item));
  };

  const getMenu = () => navigationConfig[rol] || [];

  return (
    <nav className="flex flex-col bg-white w-[280px] h-full p-4 shadow-lg items-center">
      {/* Logo */}
      <Link to="/">
        <img
          src="/logo.svg"
          alt="Logo-ALPRO"
          className="flex justify-center items-center py-14"
        />
      </Link>

      {/* Navegación */}
      <ul className="justify-center items-center">
        {getMenu().map(({ item, icon, url, subItems }) => (
          <li key={item} className="w-[220px]">
            <div
              className={`text-black/70 flex items-center justify-between h-14 rounded-[10px] ${
                location.pathname === `/${url}`
                  ? "bg-[#045E9C] text-white"
                  : "hover:text-[#045E9C]"
              }`}
            >
              <Link
                to={url || "#"}
                className="flex items-center pl-7 text-16 font-bold"
                onClick={() => subItems && toggleExpand(item)}
              >
                {icon}
                {item}
              </Link>
              {subItems && (
                <button onClick={() => toggleExpand(item)} className="pr-4">
                  {expandedItem === item ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </button>
              )}
            </div>

            {/* Subenlaces */}
            {subItems && expandedItem === item && (
              <ul className="pl-10">
                {subItems.map(({ item, icon, url }) => (
                  <li
                    key={item}
                    className={`text-black/70 h-12 flex items-center rounded-[10px] hover:text-[#045E9C] ${
                      location.pathname === `/${url}`
                    }`}
                  >
                    <Link
                      to={`/${url}`}
                      className="flex items-center text-14 font-bold"
                    >
                      {icon}
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Cerrar sesión */}
      <div className="justify-start mt-auto text-black/70 w-[220px] flex items-start rounded-[10px] hover:text-[#045E9C]">
        <Link to="/Logout" className="flex items-center pl-7 text-16 font-bold">
          <LogoutIcon className="mr-4" />
          Cerrar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
