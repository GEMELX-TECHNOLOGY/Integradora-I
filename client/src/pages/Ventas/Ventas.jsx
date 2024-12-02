import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [newVenta, setNewVenta] = useState({
    referencia: "",
    producto: "",
    uv: 1,
    pv: 1,
    amt: 0,
  });
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  useEffect(() => {
    fetchVentas();
    fetchProductos();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await api.get("api/v1/ventas/");
      setVentas(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
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
    setNewVenta({ ...newVenta, [name]: value });
    if (name === "uv" || name === "pv") {
      calculateAmt(name, value);
    }
  };

  const calculateAmt = (name, value) => {
    const updatedVenta = { ...newVenta, [name]: value };
    const amt = updatedVenta.uv * updatedVenta.pv;
    setNewVenta({ ...updatedVenta, amt });
  };

  // Función para generar el reporte en PDF
  const generatePDF = async () => {
    try {
      // Endpoint para generar y descargar el PDF
      const response = await api.get("/api/v1/sales-report-pdf/", {
        responseType: "blob", // Para manejar el archivo binario
      });

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_ventas.pdf"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error al generar el reporte PDF:", error);
    }
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
            Agregar Venta
          </button>
          <button
          className="bg-white w-[200px] h-[36px] rounded-[10px] shadow-lg text-center self-end mr-5"
          onClick={generatePDF} // Llamada a la función de generación de PDF
        >
          Generar Reporte
        </button>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-center">
            <thead className="bg-[#045E9C] text-white">
              <tr>
                <th className="p-2">REFERENCIA DE VENTA</th>
                <th className="p-2">PRODUCTO</th>
                <th className="p-2">UNIDADES VENDIDAS</th>
                <th className="p-2">PRECIO VENTA</th>
                <th className="p-2">MONTO TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr
                  key={venta.id}
                  className="border-b hover:bg-gray-100 text-gray-800"
                >
                  <td className="p-2">{venta.referencia}</td>
                  <td className="p-2">{venta.producto.nombre}</td>
                  <td className="p-2">{Number(venta.uv).toLocaleString()}</td>
                  <td className="p-2">${Number(venta.pv).toLocaleString()}</td>
                  <td className="p-2">${Number(venta.amt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar Venta */}
      {isModalAddOpen && (
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
          <div className="relative">
            <h2 className="text-xl font-semibold">Agregar Venta</h2>
            <form
              onSubmit={handleAddSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
            >
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
                    <option
                      key={producto.cod_producto}
                      value={producto.cod_producto}
                    >
                      {producto.nombre} ({producto.referencia})
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Unidades vendidas
                <input
                  type="number"
                  name="uv"
                  value={newVenta.uv}
                  onChange={handleChange}
                  min={1}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Precio de venta
                <input
                  type="number"
                  name="pv"
                  min={1}
                  value={newVenta.pv}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Monto Total
                <input
                  type="number"
                  name="amt"
                  value={newVenta.amt}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
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
