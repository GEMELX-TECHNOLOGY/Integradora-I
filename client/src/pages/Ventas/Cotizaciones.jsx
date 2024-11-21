import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [newCotizacion, setNewCotizacion] = useState({
    referencia: "",
    producto: "",
    uv: 0,
    pv: 0,
    total_cotizacion: 0,
  });
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  useEffect(() => {
    fetchCotizaciones();
    fetchProductos();
  }, []);

  const fetchCotizaciones = async () => {
    try {
      const response = await api.get("api/v1/cotizaciones/");
      setCotizaciones(response.data);
    } catch (error) {
      console.error("Error al obtener las cotizaciones:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await api.get("api/v1/productos/");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/v1/cotizaciones/crear/", newCotizacion);
      setCotizaciones([...cotizaciones, response.data]);
      setIsModalAddOpen(false);
      toast.success("Cotización agregada correctamente.");
    } catch (error) {
      toast.error("Error al agregar la cotización.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCotizacion({ ...newCotizacion, [name]: value });
    if (name === "uv" || name === "pv") {
      calculateTotalCotizacion(name, value);
    }
  };

  const calculateTotalCotizacion = (name, value) => {
    const updatedCotizacion = { ...newCotizacion, [name]: value };
    const totalCotizacion = updatedCotizacion.uv * updatedCotizacion.pv;
    setNewCotizacion({ ...updatedCotizacion, total_cotizacion: totalCotizacion });
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Navigation />
      <div className="flex-1 p-4">
        <Header />
        <div className="flex justify-end mb-4">
          <button
            className="bg-white w-full sm:w-[200px] h-[36px] rounded-[10px] shadow-lg text-center"
            onClick={() => setIsModalAddOpen(true)}
          >
            Agregar Cotización
          </button>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-center">
            <thead className="bg-[#045E9C] text-white">
              <tr>
                <th className="p-2">Referencia</th>
                <th className="p-2">Producto</th>
                <th className="p-2">UV</th>
                <th className="p-2">PV</th>
                <th className="p-2">Monto Total</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((cotizacion) => (
                <tr
                  key={cotizacion.id}
                  className="border-b hover:bg-gray-100 text-gray-800"
                >
                  <td className="p-2">{cotizacion.referencia}</td>
                  <td className="p-2">{cotizacion.producto}</td>
                  <td className="p-2">{cotizacion.uv}</td>
                  <td className="p-2">{cotizacion.pv}</td>
                  <td className="p-2">{cotizacion.total_cotizacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar Cotización */}
      {isModalAddOpen && (
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
          <div className="relative">
            <h2 className="text-xl font-semibold">Agregar Cotización</h2>
            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <label>
                Referencia
                <input
                  type="text"
                  name="referencia"
                  value={newCotizacion.referencia}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Producto
                <select
                  name="producto"
                  value={newCotizacion.producto}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccionar Producto</option>
                  {productos.map((producto) => (
                    <option key={producto.cod_producto} value={producto.cod_producto}>
                      {producto.nombre} ({producto.referencia})
                    </option>
                  ))}
                </select>
              </label>
              <label>
                UV
                <input
                  type="number"
                  name="uv"
                  value={newCotizacion.uv}
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
                  value={newCotizacion.pv}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Monto Total
                <input
                  type="number"
                  name="total_cotizacion"
                  value={newCotizacion.total_cotizacion}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
              >
                Guardar Cotización
              </button>
            </form>
          </div>
        </Modal>
      )}

      <Toaster />
    </div>
  );
}

export default Cotizaciones;
