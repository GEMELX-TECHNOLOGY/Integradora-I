import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { ViewIcon, DeleteIcon, EditIcon } from "@/icons/Icons";

function Ventas() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [currentVenta, setCurrentVenta] = useState(null);
  const [newVenta, setNewVenta] = useState({
    producto: "",
    referencia: "",
    uv: "",
    pv: "",
    amt: "",
  });

  const totalPages = Math.ceil(ventas.length / 10);

  useEffect(() => {
    fetchVentas();
    fetchProductos();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await api.get("api/v1/ventas/");
      setVentas(response.data);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await api.get("api/v1/productos/"); // Suponiendo que hay una endpoint para productos
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleView = (venta) => {
    setCurrentVenta(venta);
    setIsModalViewOpen(true);
  };

  const handleEdit = (venta) => {
    setCurrentVenta(venta);
    setIsModalEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `api/v1/ventas/actualizar/${currentVenta.id}/`,
        currentVenta
      );
      setVentas(
        ventas.map((venta) =>
          venta.id === response.data.id ? response.data : venta
        )
      );
      setIsModalEditOpen(false);
      toast.success("Venta actualizada correctamente.");
    } catch (error) {
      toast.error("Error al actualizar la venta.");
      console.error(error);
    }
  };

  const handleDelete = async (ventaId) => {
    try {
      await api.delete(`api/v1/ventas/eliminar/${ventaId}/`);
      setVentas(ventas.filter((venta) => venta.id !== ventaId));
      toast.success("Venta eliminada correctamente.");
    } catch (error) {
      toast.error("Error al eliminar la venta.");
      console.error(error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/v1/ventas/crear/", newVenta);
      setVentas([...ventas, response.data]);
      setIsModalAddOpen(false);
      toast.success("Venta agregada correctamente.");
    } catch (error) {
      toast.error("Error al agregar la venta.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isModalEditOpen) {
      setCurrentVenta({ ...currentVenta, [name]: value });
    } else {
      setNewVenta({ ...newVenta, [name]: value });
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
            onClick={() => setIsModalAddOpen(true)}
          >
            Agregar Venta
          </button>
        </div>
        <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />
        <div className="container mx-auto p-4">
          <table className="min-w-[1450px] bg-white shadow-md rounded-lg text-center">
            <thead className="bg-[#045E9C] text-white">
              <tr>
                <th className="p-2 text-center">PRODUCTO</th>
                <th className="p-2 text-center">REFERENCIA</th>
                <th className="p-2 text-center">UV</th>
                <th className="p-2 text-center">PV</th>
                <th className="p-2 text-center">AMT</th>
                <th className="p-2 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {ventas
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((venta) => (
                  <tr
                    key={venta.id}
                    className="border-b hover:bg-gray-100 text-gray-800"
                  >
                    <td className="p-2">{venta.producto}</td>
                    <td className="p-2">{venta.referencia}</td>
                    <td className="p-2">{venta.uv}</td>
                    <td className="p-2">{venta.pv}</td>
                    <td className="p-2">{venta.amt}</td>
                    <td className="p-2 flex justify-center space-x-2">
                      <button onClick={() => handleView(venta)}>
                        <ViewIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleEdit(venta)}>
                        <EditIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
                      </button>
                      <button onClick={() => handleDelete(venta.id)}>
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
      {isModalViewOpen && currentVenta && (
        <Modal isOpen={isModalViewOpen} closeModal={() => setIsModalViewOpen(false)}>
          <div className="relative">
            <button
              onClick={() => setIsModalViewOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-2xl">&times;</span> {/* "x" icon */}
            </button>
            <h2 className="text-xl font-semibold">Detalles de Venta</h2>
            <p><strong>Producto:</strong> {currentVenta.producto}</p>
            <p><strong>Referencia:</strong> {currentVenta.referencia}</p>
            <p><strong>UV:</strong> {currentVenta.uv}</p>
            <p><strong>PV:</strong> {currentVenta.pv}</p>
            <p><strong>AMT:</strong> {currentVenta.amt}</p>
          </div>
        </Modal>
      )}

      {/* Modal Editar */}
      {isModalEditOpen && currentVenta && (
        <Modal isOpen={isModalEditOpen} closeModal={() => setIsModalEditOpen(false)}>
          <div className="relative">
            <button
              onClick={() => setIsModalEditOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-2xl">&times;</span> {/* "x" icon */}
            </button>
            <h2 className="text-xl font-semibold">Editar Venta</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4 mt-4">
              <label>
                Producto
                <select
                  name="producto"
                  value={currentVenta.producto}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccionar Producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Referencia
                <input
                  type="text"
                  name="referencia"
                  value={currentVenta.referencia}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                UV
                <input
                  type="number"
                  name="uv"
                  value={currentVenta.uv}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                PV
                <input
                  type="number"
                  name="pv"
                  value={currentVenta.pv}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                AMT
                <input
                  type="number"
                  name="amt"
                  value={currentVenta.amt}
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
          </div>
        </Modal>
      )}

      {/* Modal Agregar Venta */}
      {isModalAddOpen && (
        <Modal isOpen={isModalAddOpen} closeModal={() => setIsModalAddOpen(false)}>
          <div className="relative">
            <button
              onClick={() => setIsModalAddOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-2xl">&times;</span> {/* "x" icon */}
            </button>
            <h2 className="text-xl font-semibold">Agregar Venta</h2>
            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 gap-4 mt-4">
              <label>
                Producto
                <select
                  name="producto"
                  value={newVenta.producto}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccionar Producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Referencia
                <input
                  type="text"
                  name="referencia"
                  value={newVenta.referencia}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                UV
                <input
                  type="number"
                  name="uv"
                  value={newVenta.uv}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                PV
                <input
                  type="number"
                  name="pv"
                  value={newVenta.pv}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                AMT
                <input
                  type="number"
                  name="amt"
                  value={newVenta.amt}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Guardar Venta
              </button>
            </form>
          </div>
        </Modal>
      )}

      <Toaster />
    </div>
  );
}

export default Ventas;
