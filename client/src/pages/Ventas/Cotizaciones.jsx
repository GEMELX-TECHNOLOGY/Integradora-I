import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

function Cotizaciones() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeTab, setActiveTab] = useState("Información básica");

  const totalPages = 1;

  const openModal = () => {
    setModalContent("Informacion de Cotizacion");
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
                <th className="p-2 text-center">NUMERO DE COTIZACION</th>
                <th className="p-2 text-center">NOMBRE DE CLIENTE</th>
                <th className="p-2 text-center">ESTADO</th>
                <th className="p-2 text-center">COSTO TOTAL</th>
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
                  <div className="font-bold">PENDIENTE</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">$10,000.00</div>
                </td>
                <td className="p-2 flex space-x-2 justify-center items-center">
                  <button
                    onClick={() => openModal()}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
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
        <div className="bg-white rounded-lg w-full">
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
              onClick={() => setActiveTab("Detalles Clientes")}
              className={`px-4 py-2 ${
                activeTab === "Detalles Clientes"
                  ? "text-white bg-blue-700"
                  : "text-gray-600"
              } rounded-t-lg`}
            >
              Detalles del cliente
            </button>
            <button
              onClick={() => setActiveTab("Lista Productos")}
              className={`px-4 py-2 ${
                activeTab === "Lista Productos"
                  ? "text-white bg-blue-700"
                  : "text-gray-600"
              } rounded-t-lg`}
            >
              Lista de productos
            </button>
            <button
              onClick={() => setActiveTab("Resumen Costos")}
              className={`px-4 py-2 ${
                activeTab === "Resumen Costos"
                  ? "text-white bg-blue-700"
                  : "text-gray-600"
              } rounded-t-lg`}
            >
              Resumen Costos
            </button>
          </div>

          <div className="mt-6">
            {activeTab === "Información básica" && (
              <div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Numero de cotizacion:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Fecha de cotizacón:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Estado de cotizacón:
                  </label>
                </div>
              </div>
            )}

            {activeTab === "Detalles Clientes" && (
              <div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Nombre Cliente:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Direccion envio y facturacion:
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Contacto:
                  </label>
                </div>
              </div>
            )}

            {activeTab === "Lista Productos" && (
              <div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Lista de productos:
                  </label>
                </div>
              </div>
            )}
            {activeTab === "Resumen Costos" && (
              <div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Total (SIN IMPUESTOS):
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Impuesto aplicados:</label>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Costo total:
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

export default Cotizaciones;
