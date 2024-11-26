import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { ViewIcon, DeleteIcon, EditIcon } from "@/icons/Icons";

function Clientes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [editCliente, setEditCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    calle: "",
    numero: "",
    ciudad: "",
    estado: "",
    codigo_postal: "",
    correo: "",
  });

  const totalPages = Math.ceil(clientes.length / 10);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get("api/v1/clientes/");
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const openAddModal = () => {
    setFormData({
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      telefono: "",
      calle: "",
      numero: "",
      ciudad: "",
      estado: "",
      codigo_postal: "",
      correo: "",
    });
    setIsModalAddOpen(true);
  };

  const openEditModal = (cliente) => {
    setEditCliente(cliente);
    setFormData(cliente);
    setIsModalEditOpen(true);
  };

  const openDeleteModal = (id_cliente) => {
    setEditCliente({ id_cliente });
    setIsModalDeleteOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCliente) {
        await api.put(
          `api/v1/clientes/actualizar/${editCliente.id_cliente}/`,
          formData
        );
        toast.success("Cliente actualizado correctamente.");
      } else {
        await api.post("api/v1/clientes/crear/", formData);
        toast.success("Cliente agregado correctamente.");
      }
      fetchClientes();
      setIsModalAddOpen(false);
      setIsModalEditOpen(false);
    } catch (error) {
      toast.error("Error al procesar la solicitud.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`api/v1/clientes/delete/${editCliente.id_cliente}/`);
      toast.success("Cliente eliminado correctamente.");
      fetchClientes();
      setIsModalDeleteOpen(false);
    } catch (error) {
      toast.error("Error al eliminar el cliente.");
      console.error(error);
    }
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
        <div className="flex justify-end mr-8 md:mr-28">
          <button
            className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
            onClick={openAddModal}
          >
            Agregar Cliente
          </button>
        </div>
        <hr className="my-4 border-t border-gray-300 max-w-full" />
        <div className="container mx-auto p-4">
          <table className="min-w-full bg-white shadow-md rounded-lg text-center">
            <thead className="bg-[#045E9C] text-white">
              <tr>
                <th className="p-2">ID CLIENTE</th>
                <th className="p-2">NOMBRE COMPLETO</th>
                <th className="p-2">TELÉFONO</th>
                <th className="p-2">DIRECCIÓN</th>
                <th className="p-2">CORREO</th>
                <th className="p-2">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {clientes
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((cliente) => (
                  <tr
                    key={cliente.id_cliente}
                    className="border-b hover:bg-gray-100"
                  >
                    <td>{cliente.id_cliente}</td>
                    <td>
                      {cliente.nombre} {cliente.apellido_paterno}{" "}
                      {cliente.apellido_materno}
                    </td>
                    <td>{cliente.telefono}</td>
                    <td>
                      {cliente.calle}, {cliente.numero}, {cliente.ciudad},{" "}
                      {cliente.estado}
                    </td>
                    <td>{cliente.correo}</td>
                    <td className="p-2 flex justify-center space-x-2">
                      <button onClick={() => openEditModal(cliente)}>
                        <EditIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(cliente.id_cliente)}
                      >
                        <DeleteIcon className="h-6 w-6 text-red-500 hover:text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4 mx-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Siguiente
          </button>
        </div>

        {/* Modal Agregar/Editar Cliente */}
        <Modal
          isOpen={isModalAddOpen || isModalEditOpen}
          onClose={() => {
            setIsModalAddOpen(false);  // Cerrar el modal de agregar
            setIsModalEditOpen(false); // Cerrar el modal de editar
          }}
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold">
              {isModalEditOpen ? "Editar Cliente" : "Agregar Cliente"}
            </h2>
            <div className="flex flex-wrap mb-4 max-w-full">
              <div className="flex-1 p-4">
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2 pr-2">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 pl-2">
                      <label>Apellido Paterno</label>
                      <input
                        type="text"
                        name="apellido_paterno"
                        value={formData.apellido_paterno}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2 pr-2">
                      <label>Apellido Materno</label>
                      <input
                        type="text"
                        name="apellido_materno"
                        value={formData.apellido_materno}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 pl-2">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2 pl-2">
                      <label>Calle</label>
                      <input
                        type="text"
                        name="calle"
                        value={formData.calle}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 pl-2">
                      <label>Número EXT</label>
                      <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2 pr-2">
                      <label>Ciudad</label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 pr-2">
                      <label>Estado</label>
                      <input
                        type="text"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2 pl-2">
                      <label>Código Postal</label>
                      <input
                        type="text"
                        name="codigo_postal"
                        value={formData.codigo_postal}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 pl-2">
                      <label>Correo</label>
                      <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Guardar cliente
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>

        {/* Modal de confirmación de eliminación */}
        <Modal
          isOpen={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
        >
          <div className="text-center">
            <p>¿Estás seguro de eliminar este cliente?</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-300 text-black px-5 py-2 rounded-full mx-2"
                onClick={() => setIsModalDeleteOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-full mx-2"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </Modal>

        <Toaster />
      </div>
    </div>
  );
}

export default Clientes;
