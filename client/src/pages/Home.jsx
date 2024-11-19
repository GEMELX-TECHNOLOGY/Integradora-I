import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Estadistic from "@/components/Estadistic";
import UsersCard from "@/components/UsersCard";
import BetterProduct from "@/components/BetterProduct";
import SaleCard from "@/components/SaleCard";
import { 
  ClientsIcon, 
  SalesIcon, 
  EstadisticIcon, 
  EstadisticLowIcon 
} from "@/icons/Icons";
import api from "@/lib/api";

function Home() {
  const { user } = useUser();
  const [ventasTotales, setVentasTotales] = useState(0);
  const [clientes, setClientes] = useState([]); 


  useEffect(() => {
    const fetchVentasTotales = async () => {
      try {
        const response = await api.get("api/v1/ventas/");
        const totalVentas = response.data.reduce((sum, venta) => sum + parseFloat(venta.amt), 0);
        setVentasTotales(totalVentas); // Actualizar el estado
      } catch (error) {
        console.error("Error al obtener las ventas totales:", error);
      }
    };

    fetchVentasTotales();
  }, []);


  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("api/v1/clientes/"); 
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-1">
          {user?.rol === "Administrador" && <UsersCard />}
          {user?.rol === "Ventas" && (
            <div> 
              <div className="flex pb-10 max-w-full justify-between">
                <SaleCard 
                  title="Nuevos Clientes" 
                  text="text-green-500" 
                  Count={clientes.length} 
                  percentageChange="10" 
                  time="Desde ayer" 
                  icon={<EstadisticIcon />} 
                  cardIcon={<ClientsIcon />} 
                />
                
                <SaleCard 
                  title="Ventas Totales" 
                  text="text-green-500" 
                  Count={`$${ventasTotales.toFixed(2)}`} 
                  percentageChange="4.3" 
                  time="Desde ayer" 
                  icon={<EstadisticLowIcon />} 
                  cardIcon={<SalesIcon />} 
                />
              </div>
              <Estadistic title="Detalle Ventas" />
            </div>
          )}
        </div>
        <footer className="pt-3">
          {user?.rol === "Administrador" && <BetterProduct />}
        </footer>
      </div>
    </div>
  );
}

export default Home;
