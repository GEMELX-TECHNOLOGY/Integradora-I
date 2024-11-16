import React, {useState} from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal"

function Horarios() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const totalPages = 1;

  const openAddModal = () => {
    setModalContent("Agregar Horario");
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
        <div className="flex justify-end mr-28">
          <button
            className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
            onClick={openAddModal}
          >
            Agregar Horario
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
                <th className="p-2 text-center">NUMERO DE HORARIO</th>
                <th className="p-2 text-center">DIAS TRABAJADOS A LA SEMANA</th>
                <th className="p-2 text-center">HORA DE ENTRADA</th>
                <th className="p-2 text-center">HORA DE SALIDA</th>
                <th className="p-2 text-center">TURNO</th>
              </tr>
            </thead>
            <tbody>
            <tr className="border-b hover:gb-gray-100 text-gray-800">
                <td className="p-2">
                  <div className="font-bold">0000001</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">5</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">7:00</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">16:00</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">Matutino</div>
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
                <label className="block font-bold text-gray-700 mb-1">Dias Trabajados</label>
                <input
                  type="number"
                  placeholder=""
                  min={1}
                  max={8}
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-bold text-gray-700 mb-1">Hora entrada</label>
                <input
                  type="time"
                  placeholder="0000012"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Hora salida</label>
                <input
                  type="time"
                  value=""
                  onChange=""
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2 pr-2">
                <label className="block font-bold text-gray-700 mb-1">Turno</label>
                <input
                  type="text"
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
              Guardar Cotización
            </button>
          </div>
        </div>
      </div>
    </form>
      </Modal>
    </div>
  );
}

export default Horarios;
