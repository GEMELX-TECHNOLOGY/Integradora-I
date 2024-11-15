import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

function Nominas() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeTab, setActiveTab] = useState("Información básica");

  const totalPages = 1;

  const openAddModal = () => {
    setModalContent("Agregar nomina");
    setIsModalAddOpen(true);
  };
  const closeAddModal = () => {
    setIsModalAddOpen(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1">
        <Header />
        <button
          className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
          onClick={openAddModal}
        >
          Agregar empleado
        </button>
        <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />
        <div className="flex flex-col ml-11 underline-offset-1">
          <div className="flex justify-between max-w-[1500px]">
            <span className="pt-2 font-400 text-[#849AA9]">
              Página {currentPage} de {totalPages}
            </span>
            <div className="pr-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="mx-1 px-4 py-2 rounded"
              >
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="mx-1 px-4 py-2 rounded"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <table className="min-w-[1450px] bg-white shadow-md rounded-lg text-center">
            <thead className=" bg-[#045E9C] text-white">
              <tr>
                <th className="p-2 text-center">NUMERO DE NOMINA</th>
                <th className="p-2 text-center">FECHA DE PAGO</th>
                <th className="p-2 text-center">SALARIO BASE</th>
                <th className="p-2 text-center">SALARIO NETO</th>
                <th className="p-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:gb-gray-100 text-gray-800">
                <td className="p-2">
                  <div className="font-bold">0000001</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">15/XX/XXXX</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">$10,000</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">$9,000</div>
                </td>
                <td className="p-2 flex space-x-2 justify-center items-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => openEditModal(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => openDeleteModal(user)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalAddOpen}
        onClose={closeAddModal}
        title="Agregar Nomina"
      >
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value=""
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Apellido
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el apellido"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Ingresa el email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rol
            </label>
            <select
              className="bg-white border-transparent shadow-lg w-full h-[36px] rounded-[10px] text-center"
              value={employeeRol}
              onChange={(e) => setEmployeeRol(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role.id_rol} value={role.id_rol}>
                  {role.nombre_rol}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-1">
              Imagen del empleado
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEmployeeImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Agregar empleado
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Nominas;
