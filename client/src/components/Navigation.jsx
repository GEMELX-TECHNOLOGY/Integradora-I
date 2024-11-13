import React, { useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  InventoryIcon,
  ClientIcon,
  AddProductIcon,
  ChatIcon,
  EmployeesIcon,
  LogoutIcon,
  CotizacionIcon,
  DevolucionIcon,
  ReportVenIcon,
  CapacitacionIcon,
  HorarioIcon,
  NominaIcon,
} from "@/icons/Icons";
import { useLocation } from "react-router-dom";

const PageLinkAdministrador = [
  {
    item: "Inicio",
    icon: <HomeIcon className="mr-4" />,
    url: "",
  },
  {
    item: "Mensajería",
    icon: <ChatIcon className="mr-4" />,
    url: "Chat",
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
  {
    item: "Capacitación",
    icon: <CapacitacionIcon className="mr-4" />,
    url: "Capacitacion",
  },
  {
    item: "Empleados",
    icon: <EmployeesIcon className="mr-4" />,
    url: "Empleados",
  },
  {
    item: "Devoluciones",
    icon: <DevolucionIcon className="mr-4" />,
    url: "Devoluciones",
  },
  {
    item: "Inventario",
    icon: <InventoryIcon className="mr-4" />,
    url: "Inventario",
  },
  {
    item: "Cotizaciones",
    icon: <CotizacionIcon className="mr-4" />,
    url: "Cotizaciones",
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
];

const PageLinkVentas = [
  {
    item: "Inicio",
    icon: <HomeIcon className="mr-4" />,
    url: "",
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
  {
    item: "Mensajería",
    icon: <ChatIcon className="mr-4" />,
    url: "Chat",
  },
  {
    item: "Devoluciones",
    icon: <DevolucionIcon className="mr-4" />,
    url: "Devoluciones",
  },
  {
    item: "Inventario",
    icon: <InventoryIcon className="mr-4" />,
    url: "Inventario",
  },
  {
    item: "Cotizaciones",
    icon: <CotizacionIcon className="mr-4" />,
    url: "Cotizaciones",
  },
];

const PageLinkRH = [
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
  {
    item: "Mensajería",
    icon: <ChatIcon className="mr-4" />,
    url: "Chat",
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
  {
    item: "Capacitación",
    icon: <CapacitacionIcon className="mr-4" />,
    url: "Capacitacion",
  },
];

function Navigation() {
  const location = useLocation();
  const [rol, setRol] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      getUserDetails(token);
    }
  }, []);

  const getUserDetails = async (token) => {
    try {
      const response = await api.get("/api/v1/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const { rol } = response.data;
      setRol({ rol });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getMenu = () => {
    switch (rol.rol) {
      case "Administrador":
        return PageLinkAdministrador;
      case "Ventas":
        return PageLinkVentas;
      case "Recursos Humanos":
        return PageLinkRH;
      default:
        return [];
    }
  };

  const PageLink = getMenu();

  return (
    <nav className="flex flex-col bg-white w-[280px] h-full p-4 shadow-lg items-center">
      <Link to={"/"}>
        <img
          src="/logo.svg"
          alt="Logo-ALPRO"
          className="flex justify-center items-center py-14"
        />
      </Link>
      <ul className="justify-center items-center">
        {PageLink.map(({ item, icon, url }) => (
          <li
            key={item}
            className={`text-black/70  w-[220px] h-14 flex items-center rounded-[10px]  ${
              location.pathname === `/${url}`
                ? "bg-[#045E9C] text-white transition-all"
                : "hover:text-[#045E9C]"
            }`}
          >
            <Link
              to={`/${url}`}
              className="flex items-center pl-7 text-16 font-bold"
            >
              {icon}
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <div className="justify-start mt-auto text-black/70  w-[220px] flex items-start rounded-[10px] hover:text-[#045E9C]">
          <Link
            to={"/Logout"}
            className="flex items-center pl-7 text-16 font-bold"
          >
            <LogoutIcon className="mr-4" />
            Cerrar sesión
          </Link>
      </div>
    </nav>
  );
}

export default Navigation;
