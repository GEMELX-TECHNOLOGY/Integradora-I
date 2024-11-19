import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { ViewIcon, DeleteIcon, EditIcon } from "@/icons/Icons";

function Proveedor() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [currentProveedor, setCurrentProveedor] = useState(null);
  const [newProveedor, setNewProveedor] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    calle: "",
    numero: "",
    ciudad: "",
    estado: "",
    codigo_postal: "",
  });

  const totalPages = Math.ceil(proveedores.length / 10);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await api.get("api/v1/proveedores/");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
    }
  };

  // Ver Proveedor
  const handleView = (proveedor) => {
    setCurrentProveedor(proveedor);
    setIsModalViewOpen(true);
  };

  // Editar Proveedor
  const handleEdit = (proveedor) => {
    setCurrentProveedor(proveedor);
    setIsModalEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `api/v1/proveedores/actualizar/${currentProveedor.id_prov}/`,
        currentProveedor
      );
      setProveedores(
        proveedores.map((proveedor) =>
          proveedor.id_prov === response.data.id_prov ? response.data : proveedor
        )
      );
      setIsModalEditOpen(false);
      toast.success("Proveedor actualizado correctamente.");
    } catch (error) {
      toast.error("Error al actualizar el proveedor.");
      console.error(error);
    }
  };

  // Eliminar Proveedor
  const handleDelete = async (proveedorId) => {
    try {
      await api.delete(`api/v1/proveedores/delete/${proveedorId}/`);
      setProveedores(proveedores.filter((proveedor) => proveedor.id_prov !== proveedorId));
      toast.success("Proveedor eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el proveedor.");
      console.error(error);
    }
  };

  // Agregar Proveedor
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/v1/proveedores/crear/", newProveedor);
      setProveedores([...proveedores, response.data]);
      setIsModalAddOpen(false);
      toast.success("Proveedor agregado correctamente.");
    } catch (error) {
      toast.error("Error al agregar el proveedor.");
      console.error(error);
    }
  };

  // Cambio en los inputs (Agregar/Editar)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isModalEditOpen) {
      setCurrentProveedor({ ...currentProveedor, [name]: value });
    } else {
      setNewProveedor({ ...newProveedor, [name]: value });
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
            Agregar Proveedor
          </button>
        </div>
        <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />
        <div className="container mx-auto p-4">
          <table className="min-w-full bg-white shadow-md rounded-lg text-center">
            <thead className="bg-[#045E9C] text-white">
              <tr>
                <th className="p-2 text-center">NOMBRE</th>
                <th className="p-2 text-center">TELÉFONO</th>
                <th className="p-2 text-center">DIRECCIÓN</th>
                <th className="p-2 text-center">CIUDAD</th>
                <th className="p-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {proveedores
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((proveedor) => (
                  <tr
                    key={proveedor.id_prov}
                    className="border-b hover:bg-gray-100 text-gray-800"
                  >
                    <td className="p-2">{proveedor.nombre} {proveedor.apellido_paterno} {proveedor.apellido_materno}</td>
                    <td className="p-2">{proveedor.telefono}</td>
                    <td className="p-2">{proveedor.calle} {proveedor.numero}</td>
                    <td className="p-2">{proveedor.ciudad}</td>
                    <td className="p-2 flex justify-center space-x-2">
                      <button onClick={() => handleView(proveedor)}>
                        <ViewIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleEdit(proveedor)}>
                        <EditIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
                      </button>
                      <button onClick={() => handleDelete(proveedor.id_prov)}>
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
      {isModalViewOpen && currentProveedor && (
        <Modal isOpen={isModalViewOpen} closeModal={() => setIsModalViewOpen(false)}>
          <h2 className="text-xl font-semibold">Detalles del Proveedor</h2>
          <p><strong>Nombre:</strong> {currentProveedor.nombre} {currentProveedor.apellido_paterno} {currentProveedor.apellido_materno}</p>
          <p><strong>Teléfono:</strong> {currentProveedor.telefono}</p>
          <p><strong>Dirección:</strong> {currentProveedor.calle} {currentProveedor.numero}, {currentProveedor.ciudad}, {currentProveedor.estado}</p>
          <p><strong>Código Postal:</strong> {currentProveedor.codigo_postal}</p>
        </Modal>
      )}

      {/* Modal Editar */}
      {isModalEditOpen && currentProveedor && (
        <Modal isOpen={isModalEditOpen} closeModal={() => setIsModalEditOpen(false)}>
          <h2 className="text-xl font-semibold">Editar Proveedor</h2>
          <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4 mt-4">
            <label>
              Nombre
              <input
                type="text"
                name="nombre"
                value={currentProveedor.nombre}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Apellido Paterno
              <input
                type="text"
                name="apellido_paterno"
                value={currentProveedor.apellido_paterno}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Apellido Materno
              <input
                type="text"
                name="apellido_materno"
                value={currentProveedor.apellido_materno}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Teléfono
              <input
                type="text"
                name="telefono"
                value={currentProveedor.telefono}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Calle
              <input
                type="text"
                name="calle"
                value={currentProveedor.calle}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Número
              <input
                type="text"
                name="numero"
                value={currentProveedor.numero}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Ciudad
              <input
                type="text"
                name="ciudad"
                value={currentProveedor.ciudad}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Estado
              <input
                type="text"
                name="estado"
                value={currentProveedor.estado}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Código Postal
              <input
                type="text"
                name="codigo_postal"
                value={currentProveedor.codigo_postal}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Guardar Cambios
            </button>
          </form>
        </Modal>
      )}

      {/* Modal Agregar */}
      {isModalAddOpen && (
        <Modal isOpen={isModalAddOpen} closeModal={() => setIsModalAddOpen(false)}>
          <h2 className="text-xl font-semibold">Agregar Proveedor</h2>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 gap-4 mt-4">
            <label>
              Nombre
              <input
                type="text"
                name="nombre"
                value={newProveedor.nombre}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Apellido Paterno
              <input
                type="text"
                name="apellido_paterno"
                value={newProveedor.apellido_paterno}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Apellido Materno
              <input
                type="text"
                name="apellido_materno"
                value={newProveedor.apellido_materno}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Teléfono
              <input
                type="text"
                name="telefono"
                value={newProveedor.telefono}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Calle
              <input
                type="text"
                name="calle"
                value={newProveedor.calle}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Número
              <input
                type="text"
                name="numero"
                value={newProveedor.numero}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Ciudad
              <input
                type="text"
                name="ciudad"
                value={newProveedor.ciudad}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Estado
              <input
                type="text"
                name="estado"
                value={newProveedor.estado}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label>
              Código Postal
              <input
                type="text"
                name="codigo_postal"
                value={newProveedor.codigo_postal}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Guardar Proveedor
            </button>
          </form>
        </Modal>
      )}

      <Toaster />
    </div>
  );
}

export default Proveedor;
