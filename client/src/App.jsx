import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to="login" />;
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
