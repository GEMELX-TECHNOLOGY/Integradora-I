import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

function Clientes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeTab, setActiveTab] = useState("Información básica");

  const totalPages = 1;

  const openModal = () => {
    setModalContent("Informacion del Cliente");
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
                <th className="p-2 text-center">NUMERO DE CLIENTE</th>
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
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => openModal()}
                  >
                    Ver más
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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
                    <label className="block font-semibold">Numero Telefonico:</label>
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
                    <label className="block font-semibold">Preferencia de contacto:</label>
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold">
                      Genero:
                    </label>
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

export default Clientes;
