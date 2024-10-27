import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast'; //toast muestra notificaciones

const UpdateProductForm = ({ product, onClose }) => { //crea un componente llamado UpdateP.F. y usa la clase producto y on close como props
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [imagen, setImagen] = useState(null);
//un props es una propiedad que pasa datos de un componenete a otro

  // Obtener las categorías y prellenar el formulario
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("api/categorias/");
        setCategorias(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();

    if (product) {
      setNombre(product.nombre);
      setDescripcion(product.descripcion);
      setReferencia(product.referencia);
      setModelo(product.modelo);
      setMarca(product.marca);
      setPrecio(product.precio);
      setStock(product.stock);
      setStock(product.product_image);
      setCategoria(product.categoria.id_categoria); // Asegúrate de que esto sea correcto
    }
  }, [product]);

  const succesEdit = () =>
    toast.success("El registro se ha editado correctamente", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorEdit = () =>
    toast.error("Ha ocurrido un error al editar el registro", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("referencia", referencia);
    formData.append("modelo", modelo);
    formData.append("marca", marca);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("categoria", categoria);
    if (imagen) {
      formData.append("product_image", imagen); // Asegúrate de que el campo en el backend sea product_image
    }

    try {
      const cod_producto = product.cod_producto; // Asegúrate de que esto esté definido
      await api.put(`api/productos/actualizar/${cod_producto}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      succesEdit()
      onClose(); // Cerrar el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar el producto:", error.response.data);
      errorEdit()
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Toaster/>
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Actualizar Producto</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="descripcion">
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="referencia">
              Referencia
            </label>
            <input
              type="text"
              id="referencia"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="modelo">
              Modelo
            </label>
            <input
              type="text"
              id="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="marca">
              Marca
            </label>
            <input
              type="text"
              id="marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="precio">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="categoria">
              Categoría
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre_categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="imagen">
              Imagen
            </label>
            <input
              type="file"
              id="imagen"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black rounded px-4 py-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
