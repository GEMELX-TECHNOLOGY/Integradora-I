import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { ViewIcon, DeleteIcon, EditIcon } from "@/icons/Icons";

function Proovedores() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeTab, setActiveTab] = useState("Información básica");

  const totalPages = 1;

  const openAddModal = () => {
    setModalContent("Agregar Proveedor");
    setIsModalAddOpen(true);
  };
  const closeAddModal = () => {
    setIsModalAddOpen(false);
  };

  const editModal = () => {
    setModalContent("Editar Proveedor");
    setIsModalEditOpen(true);
  };

  const closeEditmodal = () => {
    setIsModalEditOpen(false);
  };
  const deleteModal = () => {
    setModalContent("Eliminar Proveedor");
    setIsModalDeleteOpen(true);
  };
  const closeDeletemodal = () => {
    setIsModalDeleteOpen(false);
  };
  const openModal = () => {
    setModalContent("Informacion del Proovedor");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <div className="flex justify-end mr-28">
          <button
            className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
            onClick={openAddModal}
          >
            Agregar Proveedor
          </button>
        </div>
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
                <th className="p-2 text-center">NUMERO DE PROOVEDOR</th>
                <th className="p-2 text-center">NOMBRE COMPLETO</th>
                <th className="p-2 text-center">NUMERO TELEFONICO</th>
                <th className="p-2 text-center">DIRECCION</th>
                <th className="p-2 text-center">FECHA REGISTRO</th>
                <th className="p-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:gb-gray-100 text-gray-800">
                <td className="p-2">
                  <div className="font-bold">0000001</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">Gerardo Ontiveros Dávila</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">677-113-5160</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">AV. 20 NOVIEMBRE #501</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">2024-11-10</div>
                </td>
                <td className="p-2 flex space-x-2 justify-center items-center">
                  <button
                    className="flex justify-center items-center"
                    onClick={() => editModal()}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="flex justify-center items-center"
                    onClick={() => openModal()}
                  >
                    <ViewIcon />
                  </button>
                  <button
                    className="flex justify-center items-center"
                    onClick={() => deleteModal()}
                  >
                    <DeleteIcon />
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
        title={modalContent}
      >
    <form>
      <div className="flex flex-row bg-white max-w-[1550px] mx-auto">
        <div className="flex-3 p-5">
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Nombre(s)</label>
                <input
                  type="text"
                  placeholder="Luis Alfredo"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Apellido Paterno</label>
                <input
                  type="text"
                  placeholder="López"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Apellido Materno</label>
                <input
                  type="text"
                  placeholder="Ortiz"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Numero Telefonico</label>
                <input
                  type="number"
                  placeholder="555-555-5555"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-5">
            <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Correo Electronico</label>
                <input
                  type="text"
                  placeholder="email@email.com"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Direccion</label>
                <input
                  type="text"
                  placeholder="5 de Febrero"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-5">
            <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Numero EXT</label>
                <input
                  type="number"
                  placeholder="331"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Numero INT</label>
                <input
                  type="number"
                  placeholder="331"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              
            </div>
            <div className="flex flex-wrap mb-5">
            <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Estado</label>
                <input
                  type="text"
                  placeholder="Durango"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Codigo Postal</label>
                <input
                  type="number"
                  placeholder="34160"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
              type="submit"
            >
              Guardar Proveedor
            </button>
          </div>
        </div>
      </div>
    </form>
      </Modal>

      <Modal
        isOpen={isModalEditOpen}
        onClose={closeEditmodal}
        title={modalContent}
      >
            <form>
      <div className="flex flex-row bg-white max-w-[1550px] mx-auto">
        <div className="flex-3 p-5">
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Nombre(s)</label>
                <input
                  type="text"
                  placeholder="Luis Alfredo"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Apellido Paterno</label>
                <input
                  type="text"
                  placeholder="López"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Apellido Materno</label>
                <input
                  type="text"
                  placeholder="Ortiz"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Numero Telefonico</label>
                <input
                  type="number"
                  placeholder="555-555-5555"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-5">
            <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Correo Electronico</label>
                <input
                  type="text"
                  placeholder="email@email.com"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Direccion</label>
                <input
                  type="text"
                  placeholder="5 de Febrero"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-5">
            <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Numero EXT</label>
                <input
                  type="number"
                  placeholder="331"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Numero INT</label>
                <input
                  type="number"
                  placeholder="331"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              
            </div>
            <div className="flex flex-wrap mb-5">
            <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Estado</label>
                <input
                  type="text"
                  placeholder="Durango"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Codigo Postal</label>
                <input
                  type="number"
                  placeholder="34160"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
              type="submit"
            >
              Guardar Proveedor
            </button>
          </div>
        </div>
      </div>
    </form>
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        onClose={closeDeletemodal}
        title={modalContent}
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            Estas seguro/a de eliminar este registro?
          </h1>
          <p className="text-sm text-black/70 ml-5">
            ESTA ACCION NO SE PUEDE DESHACER
          </p>
          <div className="flex justify-end pt-5">
            <button
              type="submit"
              onClick={() => closeDeleteModal()}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-3"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={() =>
                currentEmployee && deleteEmployee(currentEmployee.id)
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Si, estoy seguro/a
            </button>
          </div>
        </div>  
      </Modal>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent}>
        <div className="bg-white rounded-lg w-full max-w-lg">
          <div className="mt-4 flex border-b">
            <button
              onClick={() => setActiveTab("Información básica")}
              className={`px-4 py-2 ${
                activeTab === "Información básica"
                  ? "text-white bg-blue-700"
                  : "text-gray-600"
              } rounded-t-lg`}
            >
              Información básica
            </button>
            <button
              onClick={() => setActiveTab("Contacto")}
              className={`px-4 py-2 ${
                activeTab === "Contacto"
                  ? "text-white bg-blue-700"
                  : "text-gray-600"
              } rounded-t-lg`}
            >
              Contacto
            </button>
            <button
              onClick={() => setActiveTab("Información adicional")}
              className={`px-4 py-2 ${
                activeTab === "Información adicional"
                  ? "text-white bg-blue-700"
                  : "text-gray-600"
              } rounded-t-lg`}
            >
              Información adicional
            </button>
          </div>

          <div className="mt-6">
            {activeTab === "Información básica" && (
              <div>
                <div className="mb-4">
                  <label className="block font-semibold">Nombre(s):</label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Apellido paterno:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Apellido materno:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Empresa:</label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Fecha de registro:
                  </label>
                </div>
              </div>
            )}

            {activeTab === "Contacto" && (
              <div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Numero Telefonico:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Correo Electronico:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Direccion Domiciliaria:
                  </label>
                </div>
              </div>
            )}

            {activeTab === "Información adicional" && (
              <div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Preferencia de contacto:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Genero:</label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Fecha de nacimiento:
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Proovedores;
