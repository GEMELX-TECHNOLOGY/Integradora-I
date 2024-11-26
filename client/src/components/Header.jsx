import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";
import Modal from "@/components/Modal";

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
  "/Reportes-Ventas": "Reporte Ventas",
  "/Horarios": "Horarios",
  "/Nominas": "Nominas",
  "/Proveedores": "Proveedores",
};

function Header() {
  const [user, setUser] = useState({
    id: "",
    nombre: "",
    apellido_pa: "",
    rol: "",
    profile_image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChangeProfileImg, setIsModalChangeProfileImg] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [employeeImage, setEmployeeImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      const decode = jwtDecode(token)
      const user_id = decode.user_id;
      getUserDetails(token, user_id);
    }
  }, []);

  const getUserDetails = async (token, user_id) => {
    try {
      const response = await api.get(`/api/v1/empleado/${user_id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const { id, nombre, apellido_pa, profile_image } = response.data;
      const rol = response.data.user.rol.nombre_rol
      setUser({ id, nombre, apellido_pa, rol, profile_image });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const changeProfileImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", employeeImage);

    try {
      const res = await api.put(
        `/api/v1/user/edit/${user.id}/`, // Usa el ID del usuario actual
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );
      // Actualiza el usuario con la nueva imagen de perfil
      setUser((prevUser) => ({
        ...prevUser,
        profile_image: `http://127.0.0.1:8000${res.data.profile_image}`,
      }));
      setIsModalChangeProfileImg(false); // Cierra el modal
      alert("Imagen de perfil actualizada con éxito");
    } catch (error) {
      console.error(
        "Error al actualizar la imagen de perfil:",
        error.response ? error.response.data : error.message
      );
      alert("Error al actualizar la imagen de perfil");
    }
  };

  const openModal = () => {
    setModalContent("Información de Usuario");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openChangeProfileImg = () => {
    setIsModalChangeProfileImg(true);
  };

  const location = useLocation();
  const pageTitle = NamePage[location.pathname];

  return (
    <header className="max-w-[1600px]">
      <div className="flex justify-between items-center p-11">
        <h1 className="text-titlepage font-bold text-[28px]">{pageTitle}</h1>
        <div>
          <button
            onClick={openModal}
            className="flex bg-white rounded-xl px-4 py-2"
          >
            <img
              src={user.profile_image}
              alt={`${user.nombre} profile`}
              className="rounded-full h-[42px] w-[42px]"
            />
            <div className="pl-4">
              <span className="text-titlepage font-bold text-sm">
                {user.nombre} {user.apellido_pa}
              </span>
              <p className="text-xs text-black/70 font-medium">{user.rol}</p>
            </div>
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent}>
          <div className="p-4 flex items-center">
            <div className="flex flex-col max-w-full w-full">
              <img
                src={user.profile_image}
                alt={`${user.first_name} ${user.last_name} profile`}
                className="rounded-full w-[100px] h-[100px] mx-auto md:mx-0 items-center justify-center"
              />
              <button
                className="text-sm mt-2 hover:text-[#045E9C]"
                onClick={() => openChangeProfileImg()}
              >
                Cambiar
              </button>
            </div>

            {/* User Details */}
            <div className="ml-6 w-full">
              <div className="mb-4">
                <label className="block font-semibold">Nombre(s):</label>
                <span>{user.first_name}</span>
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Apellidos:</label>
                <span>{user.last_name}</span>
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Cargo:</label>
                <span>{user.rol}</span>
              </div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isModalChangeProfileImg} onClose={() => setIsModalChangeProfileImg(false)}>
          <div>
            <p>Sube una foto </p>
            <form onSubmit={changeProfileImage}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEmployeeImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Subir Foto
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </header>
  );
}

export default Header;