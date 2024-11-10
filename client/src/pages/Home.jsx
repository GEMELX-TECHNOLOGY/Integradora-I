import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Estadistic from "@/components/Estadistic";
import UsersCard from "@/components/UsersCard";
import BetterProduct from "@/components/BetterProduct";
import SaleCard from "@/components/SaleCard";
import { ClientsIcon, NewOrders, PendingOrderIcon, SalesIcon, EstadisticIcon, EstadisticLowIcon } from "@/icons/Icons";

function Home() {
  const { user } = useUser();

  useEffect(() => {
    console.log("Usuario o rol cambiado:", user);
  }, [user]);

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
                <SaleCard title="Nuevos Clientes" text="text-green-500" Count="40,689" percentageChange="10" time="Desde ayer" icon={<EstadisticIcon/>} cardIcon={<ClientsIcon/>}/>
                <SaleCard title="Ordenes Nuevas" text="text-green-500" Count="10,293" percentageChange="1.3" time="Semana pasada" icon={<EstadisticIcon/>} cardIcon={<NewOrders/>}/>
                <SaleCard title="Ordenes Pendientes" text="text-green-500" Count="2,040" percentageChange="1.8" time="Semana pasada" icon={<EstadisticIcon/>} cardIcon={<PendingOrderIcon/>}/>
                <SaleCard title="Ventas Totales" text="text-red-500" Count="$89,000" percentageChange="4.3" time="Desde ayer" icon={<EstadisticLowIcon/>} cardIcon={<SalesIcon/>}/>
              </div>
              <Estadistic title="Detalle Ventas"/>
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
