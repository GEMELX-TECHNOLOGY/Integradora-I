import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { ViewIcon, DeleteIcon, EditIcon } from "@/icons/Icons";

function Nomina() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [nominass, setNominas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [currentNomina, setCurrentNomina] = useState(null);
  const [newNomina, setNewNomina] = useState({
    fecha_pago: "",
    salario_base: "",
    bonos: "",
    salario_nto: "",
    empleado: "",
  });

  const totalPages = Math.ceil(nominass.length / 10);

  useEffect(() => {
    fetchNominas();
    fetchEmpleados();
  }, []);

  const fetchNominas = async () => {
    try {
      const response = await api.get("api/v1/nominas/");
      setNominas(response.data);
    } catch (error) {
      console.error("Error al obtener las nóminas:", error);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await api.get("api/v1/users/");
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
    }
  };

  const handleView = (nomina) => {
    setCurrentNomina(nomina);
    setIsModalViewOpen(true);
  };

  const handleEdit = (nomina) => {
    setCurrentNomina(nomina);
    setIsModalEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `api/v1/nominas/editar/${currentNomina.id_nom}/`,
        currentNomina
      );
      setNominas(
        nominass.map((nomina) =>
          nomina.id_nom === response.data.id_nom ? response.data : nomina
        )
      );
      setIsModalEditOpen(false);
      toast.success("Nómina actualizada correctamente.");
    } catch (error) {
      toast.error("Error al actualizar la nómina.");
      console.error(error);
    }
  };

  const handleDelete = async (nominaId) => {
    try {
      await api.delete(`api/v1/nominas/eliminar/${nominaId}/`);
      setNominas(nominass.filter((nomina) => nomina.id_nom !== nominaId));
      toast.success("Nómina eliminada correctamente.");
    } catch (error) {
      toast.error("Error al eliminar la nómina.");
      console.error(error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/v1/nominas/crear/", newNomina);
      setNominas([...nominass, response.data]);
      setIsModalAddOpen(false);
      toast.success("Nómina agregada correctamente.");
    } catch (error) {
      toast.error("Error al agregar la nómina.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isModalEditOpen) {
      setCurrentNomina({ ...currentNomina, [name]: value });
    } else {
      setNewNomina({ ...newNomina, [name]: value });
    }
  };

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 overflow-hidden">
        <Header />
        <div className="flex justify-end mr-8 sm:mr-4">
          <button
            className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
            onClick={() => setIsModalAddOpen(true)}
          >
            Agregar Nómina
          </button>
        </div>
        <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />
        <div className="container mx-auto p-4">
          <table className="min-w-full bg-white shadow-md rounded-lg text-center">
            <thead className="bg-[#045E9C] text-white">
              <tr>
                <th className="p-2 text-center">FECHA DE PAGO</th>
                <th className="p-2 text-center">SALARIO BASE</th>
                <th className="p-2 text-center">BONOS</th>
                <th className="p-2 text-center">SALARIO NETO</th>
                <th className="p-2 text-center">EMPLEADO</th>
                <th className="p-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {nominass
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((nomina) => (
                  <tr
                    key={nomina.id_nom}
                    className="border-b hover:bg-gray-100 text-gray-800"
                  >
                    <td className="p-2">{nomina.fecha_pago}</td>
                    <td className="p-2">{nomina.salario_base}</td>
                    <td className="p-2">{nomina.bonos}</td>
                    <td className="p-2">{nomina.salario_nto}</td>
                    <td className="p-2">{nomina.empleado}</td>
                    <td className="p-2 flex justify-center space-x-2">
                      <button onClick={() => handleView(nomina)}>
                        <ViewIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleEdit(nomina)}>
                        <EditIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
                      </button>
                      <button onClick={() => handleDelete(nomina.id_nom)}>
                        <DeleteIcon className="h-6 w-6 text-red-500 hover:text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ver */}
      {isModalViewOpen && currentNomina && (
        <Modal isOpen={isModalViewOpen} closeModal={() => setIsModalViewOpen(false)}>
          <div className="relative">
            <button
              onClick={() => setIsModalViewOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold">Detalles de Nómina</h2>
            <p><strong>Fecha de Pago:</strong> {currentNomina.fecha_pago}</p>
            <p><strong>Salario Base:</strong> {currentNomina.salario_base}</p>
            <p><strong>Bonos:</strong> {currentNomina.bonos}</p>
            <p><strong>Salario Neto:</strong> {currentNomina.salario_nto}</p>
            <p><strong>Empleado:</strong> {currentNomina.empleado}</p>
          </div>
        </Modal>
      )}

      {/* Modal Editar */}
      {isModalEditOpen && currentNomina && (
        <Modal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)}>
          <div className="relative">
            <button
              onClick={() => setIsModalEditOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >

            </button>
            <h2 className="text-xl font-semibold">Editar Nómina</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4 mt-4">
              <label>
                Fecha de Pago
                <input
                  type="date"
                  name="fecha_pago"
                  value={currentNomina.fecha_pago}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Salario Base
                <input
                  type="number"
                  name="salario_base"
                  value={currentNomina.salario_base}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Bonos
                <input
                  type="number"
                  name="bonos"
                  value={currentNomina.bonos}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Salario Neto
                <input
                  type="number"
                  name="salario_nto"
                  value={currentNomina.salario_nto}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Empleado
                <select
                  name="empleado"
                  value={currentNomina.empleado}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccionar Empleado</option>
                  {empleados.map((empleado) => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.username} ({empleado.email})
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </Modal>
      )}

      {/* Modal Agregar Nómina */}
      {isModalAddOpen && (
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
          <div className="relative"><span className="text-2xl">&times;</span>
            <button
              onClick={() => setIsModalAddOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              
            </button>
            <h2 className="text-xl font-semibold">Agregar Nómina</h2>
            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 gap-4 mt-4">
              <label>
                Fecha de Pago
                <input
                  type="date"
                  name="fecha_pago"
                  value={newNomina.fecha_pago}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Salario Base
                <input
                  type="number"
                  name="salario_base"
                  value={newNomina.salario_base}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Bonos
                <input
                  type="number"
                  name="bonos"
                  value={newNomina.bonos}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Salario Neto
                <input
                  type="number"
                  name="salario_nto"
                  value={newNomina.salario_nto}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Empleado
                <select
                  name="empleado"
                  value={newNomina.empleado}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccionar Empleado</option>
                  {empleados.map((empleado) => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.username} ({empleado.email})
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Guardar Nómina
              </button>
            </form>
          </div>
        </Modal>
      )}

      <Toaster />
    </div>
  );
}

export default Nomina;
