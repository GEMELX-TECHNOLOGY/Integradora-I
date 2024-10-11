import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Inventario from "./pages/Inventario"; // Importar componentes faltantes
import AddProduct from "./pages/AddProduct"; 
import Chat from "./pages/Chat";
import User from "./pages/User";
import Help from "./pages/Help";
import Settings from "./pages/Settings";

export function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>

        <Route path="/Inventario" element={<Inventario/>}/>
        <Route path="/Agregar-Producto" element={<AddProduct/>}/>
        <Route path="/Chat" element={<Chat/>}/>
        <Route path="/Usuarios" element={<User/>}/>
        <Route path="/Ayuda" element={<Help/>}/>

        <Route path="/Configuracion" element={<Settings/>}/>
        <Route path="/Logout" element={<Logout/>}/>

      </Routes>
    </BrowserRouter>
  );
}
