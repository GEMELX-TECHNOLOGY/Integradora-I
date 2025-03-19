import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { ViewIcon, DeleteIcon, EditIcon } from "@/icons/Icons";

function Horario() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [currentHorario, setCurrentHorario] = useState(null);
  const [newHorario, setNewHorario] = useState({
    dia_semana: "",
    hora_entrada: "",
    hora_salida: "",
    turno: "",
  });

  const totalPages = Math.ceil(horarios.length / 10);

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const response = await api.get("api/v1/horarios/");
      setHorarios(response.data);
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
    }
  };

  const handleView = (horario) => {
    setCurrentHorario(horario);
    setIsModalViewOpen(true);
  };

  const handleEdit = (horario) => {
    setCurrentHorario(horario);
    setIsModalEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `api/v1/horarios/editar/${currentHorario.id_horario}/`,
        currentHorario
      );
      setHorarios(
        horarios.map((horario) =>
          horario.id_horario === response.data.id_horario ? response.data : horario
        )
      );
      setIsModalEditOpen(false);
      toast.success("Horario actualizado correctamente.");
    } catch (error) {
      toast.error("Error al actualizar el horario.");
      console.error(error);
    }
  };

  const handleDelete = async (horarioId) => {
    try {
      await api.delete(`api/v1/horarios/eliminar/${horarioId}/`);
      setHorarios(horarios.filter((horario) => horario.id_horario !== horarioId));
      toast.success("Horario eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el horario.");
      console.error(error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/v1/horarios/crear/", newHorario);
      setHorarios([...horarios, response.data]);
      setIsModalAddOpen(false);
      toast.success("Horario agregado correctamente.");
    } catch (error) {
      toast.error("Error al agregar el horario.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isModalEditOpen) {
      setCurrentHorario({ ...currentHorario, [name]: value });
    } else {
      setNewHorario({ ...newHorario, [name]: value });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Navigation />
      <div className="flex-1 overflow-hidden">
        <Header />
        <div className="flex justify-end mr-8 sm:mr-4">
          <button
            className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
            onClick={() => setIsModalAddOpen(true)}
          >
            Agregar Horario
          </button>
        </div>
        <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />
        <div className="container mx-auto p-4">
          <table className="min-w-full bg-white shadow-md rounded-lg text-center">
            <thead className="bg-[#045E9C] text-white">
              <tr>
                <th className="p-2 text-center">TURNO</th>
                <th className="p-2 text-center">DIAS LABORALES</th>
                <th className="p-2 text-center">HORA DE ENTRADA</th>
                <th className="p-2 text-center">HORA DE SALIDA</th>
                <th className="p-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {horarios
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((horario) => (
                  <tr
                    key={horario.id_horario}
                    className="border-b hover:bg-gray-100 text-gray-800"
                  >
                    <td className="p-2">{horario.turno}</td>
                    <td className="p-2">{horario.dia_semana}</td>
                    <td className="p-2">{horario.hora_entrada}</td>
                    <td className="p-2">{horario.hora_salida}</td>
                    <td className="p-2 flex justify-center space-x-2">
                      <button onClick={() => handleEdit(horario)}>
                        <EditIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Editar */}
      {isModalEditOpen && currentHorario && (
        <Modal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)}>
          <h2 className="text-xl font-semibold">Editar Horario</h2>
          <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4 mt-4">
            <label>
              Día de la Semana
              <input
                type="text"
                name="dia_semana"
                value={currentHorario.dia_semana}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Hora de Entrada
              <input
                type="time"
                name="hora_entrada"
                value={currentHorario.hora_entrada}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Hora de Salida
              <input
                type="time"
                name="hora_salida"
                value={currentHorario.hora_salida}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Turno
              <input
                type="text"
                name="turno"
                value={currentHorario.turno}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
          </form>
        </Modal>
      )}

      {/* Modal Agregar Horario */}
      {isModalAddOpen && (
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
          <h2 className="text-xl font-semibold">Agregar Horario</h2>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 gap-4 mt-4">
            <label>
              Día de la Semana
              <input
                type="text"
                name="dia_semana"
                value={newHorario.dia_semana}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Hora de Entrada
              <input
                type="time"
                name="hora_entrada"
                value={newHorario.hora_entrada}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Hora de Salida
              <input
                type="time"
                name="hora_salida"
                value={newHorario.hora_salida}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Turno
              <input
                type="text"
                name="turno"
                value={newHorario.turno}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar Horario
            </button>
          </form>
        </Modal>
      )}

      <Toaster />
    </div>
  );
}

export default Horario;
