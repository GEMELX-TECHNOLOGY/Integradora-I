import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCotizacion, setNewCotizacion] = useState({
    cliente: "",
    producto: "",
    referencia_producto: "",
    cantidad: 1,
    total_cotizacion: 0,
  });
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const clientesResponse = await api.get("api/v1/clientes/");
        setClientes(clientesResponse.data);

        const cotizacionesResponse = await api.get("api/v1/cotizaciones/");
        setCotizaciones(cotizacionesResponse.data);

        const productosResponse = await api.get("api/v1/productos/");
        setProductos(productosResponse.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "producto") {
      const productoSeleccionado = productos.find(
        (producto) => producto.cod_producto === value
      );
      setNewCotizacion((prevCotizacion) => ({
        ...prevCotizacion,
        [name]: value,
        referencia_producto: productoSeleccionado ? productoSeleccionado.referencia : "",
      }));
      calculateTotalCotizacion(newCotizacion.cantidad, value);
    } else if (name === "cantidad") {
      const cantidad = parseInt(value, 10) || 0;
      setNewCotizacion((prevCotizacion) => ({
        ...prevCotizacion,
        cantidad: cantidad,
      }));
      calculateTotalCotizacion(cantidad, newCotizacion.producto);
    } else {
      setNewCotizacion((prevCotizacion) => ({
        ...prevCotizacion,
        [name]: value,
      }));
    }
  };

  const calculateTotalCotizacion = (cantidad, productoId) => {
    const productoSeleccionado = productos.find(
      (producto) => producto.cod_producto === productoId
    );
    const total = productoSeleccionado ? cantidad * productoSeleccionado.precio : 0;
    setNewCotizacion((prevCotizacion) => ({
      ...prevCotizacion,
      total_cotizacion: total,
    }));
  };

  const getProductoNombre = (id) => {
    if (!id) return "No disponible";
    const producto = productos.find((producto) => String(producto.cod_producto) === String(id));
    return producto ? `${producto.nombre} (${producto.referencia})` : "No disponible";
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!newCotizacion.cliente || !newCotizacion.producto) {
      toast.error("Por favor, seleccione un cliente y un producto.");
      return;
    }

    try {
      // Asegurémonos de que los datos estén en el formato correcto
      const cotizacionData = {
        cliente: Number(newCotizacion.cliente),
        producto: String(newCotizacion.producto),
        referencia_producto: String(newCotizacion.referencia_producto),
        cantidad: Number(newCotizacion.cantidad),
        total_cotizacion: Number(newCotizacion.total_cotizacion)
      };

      console.log("Datos a enviar:", cotizacionData);

      const response = await api.post("api/v1/cotizaciones/crear/", cotizacionData);
      console.log("Respuesta exitosa:", response.data);
      
      const cotizacionesResponse = await api.get("api/v1/cotizaciones/");
      setCotizaciones(cotizacionesResponse.data);
      
      setNewCotizacion({
        cliente: "",
        producto: "",
        referencia_producto: "",
        cantidad: 1,
        total_cotizacion: 0,
      });
      
      setIsModalAddOpen(false);
      toast.success("Cotización creada exitosamente");
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Datos de la respuesta:", error.response?.data);
      
      // Mostrar un mensaje de error más específico
      let errorMessage = "Error al crear la cotización: ";
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          // Si es un objeto de errores, mostrar cada campo con error
          const errorMessages = Object.entries(error.response.data)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
          errorMessage += errorMessages;
        } else {
          errorMessage += error.response.data;
        }
      } else {
        errorMessage += "Error desconocido";
      }
      
      toast.error(errorMessage);
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
            Agregar Cotización
          </button>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        
        {loading ? (
          <div className="text-center py-4">Cargando datos...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg text-center">
              <thead className="bg-[#045E9C] text-white">
                <tr>
                  <th className="p-2">Cliente ID</th>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Referencia</th>
                  <th className="p-2">Cantidad</th>
                  <th className="p-2">Total Cotización</th>
                  <th className="p-2">Fecha Creación</th>
                </tr>
              </thead>
              <tbody>
                {cotizaciones.map((cotizacion) => (
                  <tr key={cotizacion.id} className="border-b hover:bg-gray-100 text-gray-800">
                    <td className="p-2">{cotizacion.cliente}</td>
                    <td className="p-2">{getProductoNombre(cotizacion.producto)}</td>
                    <td className="p-2">{cotizacion.referencia_producto}</td>
                    <td className="p-2">{cotizacion.cantidad}</td>
                    <td className="p-2">{cotizacion.total_cotizacion}</td>
                    <td className="p-2">{new Date(cotizacion.fecha_creacion).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Agregar Cotización */}
      {isModalAddOpen && (
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
          <div className="relative">
            <h2 className="text-xl font-semibold">Agregar Cotización</h2>
            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <label>
                Cliente
                <select
                  name="cliente"
                  value={newCotizacion.cliente}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccionar Cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
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
                Referencia
                <input
                  type="text"
                  name="referencia_producto"
                  value={newCotizacion.referencia_producto}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Cantidad
                <input
                  type="number"
                  name="cantidad"
                  value={newCotizacion.cantidad}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <label>
                Total Cotización
                <input
                  type="number"
                  value={newCotizacion.total_cotizacion}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
              >
                Guardar
              </button>
            </form>
          </div>
        </Modal>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default Cotizaciones;