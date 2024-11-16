import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUser } from "@/context/UserContext";

// GENERAL
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/NotFound";
import NoAuthorized from "@/context/NoAuthorized";

// INVENTARIO
import Inventary from "@/pages/Inventario/Inventary";
import AddProduct from "@/pages/Inventario/AddProduct";
import Proveedores from '@/pages/Inventario/Proveedores';

// RECURSOS HUMANOS
import Employee from "@/pages/RH/Employee";
import Horarios from '@/pages/RH/Horarios';
import Nominas from '@/pages/RH/Nominas';

// VENTAS
import Clientes from "@/pages/Ventas/Clientes";
import Cotizaciones from "@/pages/Ventas/Cotizaciones";
import Devoluciones from "@/pages/Ventas/Devoluciones";
import ReportesVentas from "@/pages/Ventas/Reporte_ventas";
import Ventas from '@/pages/Ventas/Ventas';

function Rutas() {
    const { resetUser } = useUser();

    function Logout() {
        localStorage.clear();
        resetUser();
        return <Navigate to="/login" />;
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* ANY USER */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute allowedRoles={['Administrador', 'Ventas', 'Recursos Humanos', 'Inventario']}><Home /></ProtectedRoute>} />
                <Route path="/Chat" element={<ProtectedRoute allowedRoles={['Administrador', 'Ventas', 'Recursos Humanos', 'Inventario']}><Chat /></ProtectedRoute>} />
                
                {/* INVETARY USER */}
                <Route path="/Inventario" element={<ProtectedRoute allowedRoles={['Administrador', 'Ventas', 'Inventario']}><Inventary /></ProtectedRoute>} />
                <Route path="/Agregar-Producto" element={<ProtectedRoute allowedRoles={['Administrador', 'Inventario']}><AddProduct /></ProtectedRoute>} />
                <Route path='/Proveedores' element={<ProtectedRoute><Proveedores/></ProtectedRoute>}/>
                
                {/* HUMAN RESOURCES  USER*/}
                <Route path="/Empleados" element={<ProtectedRoute allowedRoles={['Administrador', 'Recursos Humanos']}><Employee /></ProtectedRoute>} />
                <Route path="/Horarios" element={<ProtectedRoute><Horarios/></ProtectedRoute>}/>
                <Route path="/Nominas" element={<ProtectedRoute><Nominas/></ProtectedRoute>}/>

                {/* SALES USER */}
                <Route path="/Clientes" element={<ProtectedRoute><Clientes/></ProtectedRoute>}/>
                <Route path="/Ventas" element={<ProtectedRoute><Ventas/></ProtectedRoute>}/>
                <Route path="/Cotizaciones" element={<ProtectedRoute><Cotizaciones/></ProtectedRoute>}/>
                <Route path="/Devoluciones" element={<ProtectedRoute><Devoluciones/></ProtectedRoute>}/>
                <Route path="/Reportes-Ventas" element={<ProtectedRoute><ReportesVentas/></ProtectedRoute>}/>

                {/* SYSTEM */}
                <Route path="*" element={<ProtectedRoute allowedRoles={['Administrador', 'Ventas', 'Recursos Humanos', 'Inventario']}><NotFound /></ProtectedRoute>} />
                <Route path="/unauthorized" element={<NoAuthorized />} />
                <Route path="/Logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;
