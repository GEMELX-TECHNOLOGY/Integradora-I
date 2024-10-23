import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import Inventary from "@/pages/Inventary"
import AddProduct from "@/pages/AddProduct"
import Chat from "@/pages/Chat"
import Employee from "@/pages/Employee"
import NotFound from "@/pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import { UserProvider } from "@/context/UserContext"

function App() {

  function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
  }
  
  return (
    <>
    <UserProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/Inventario" element={<ProtectedRoute><Inventary/></ProtectedRoute>}/>
        <Route path="/Agregar-Producto" element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
        <Route path="/Chat" element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
        <Route path="/Empleados" element={<ProtectedRoute><Employee/></ProtectedRoute>}/>
        <Route path="/Logout" element={<Logout/>}/>
        <Route path="*" element={<ProtectedRoute><NotFound/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
