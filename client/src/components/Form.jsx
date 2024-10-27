import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom"; // Asegúrate de que este hook esté disponible

function UpdateProductForm() {
  const { cod_producto } = useParams(); // Obtiene el código del producto de la URL
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productModel, setProductModel] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [category, setCategories] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const successUpdate = () => toast.success("El producto se ha actualizado correctamente");
  const errorUpdate = () => toast.error("Ha ocurrido un error al actualizar el producto");

  const loadCategories = async () => {
    try {
      const res = await api.get("api/categorias/");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProductData = async () => {
    try {
      const res = await api.get(`api/productos/${cod_producto}/`);
      const product = res.data;
      setProductName(product.nombre);
      setProductQuantity(product.stock);
      setProductCode(product.cod_producto);
      setProductCategory(product.categoria);
      setProductDescription(product.descripcion);
      setProductPrice(product.precio);
      setProductModel(product.modelo);
      setProductBrand(product.marca);
      // Si hay imagen, manejarla si es necesario
    } catch (error) {
      console.error("Error al cargar los datos del producto:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let categoriaId = productCategory;

    // Si se seleccionó "otra", crear una nueva categoría
    if (customCategory) {
      try {
        const newCategoryResponse = await api.post("api/categorias/crear", {
          nombre_categoria: customCategory,
          referencia_categoria: "Ref1234",
        });
        categoriaId = newCategoryResponse.data.id_categoria;
        setCategories((prevCategories) => [
          ...prevCategories,
          { id_categoria: categoriaId, nombre_categoria: customCategory },
        ]);
      } catch (error) {
        console.error("Error al crear la categoría:", error);
        alert("Hubo un error al crear la categoría: " + error.message);
        return;
      }
    }

    const formData = new FormData();
    formData.append("nombre", productName);
    formData.append("descripcion", productDescription);
    formData.append("referencia", productCode);
    formData.append("modelo", productModel);
    formData.append("marca", productBrand);
    formData.append("precio", productPrice);
    formData.append("stock", productQuantity);
    formData.append("categoria", categoriaId);
    if (productImage) {
      formData.append("imagen", productImage);
    }

    try {
      await api.put(`api/productos/${cod_producto}/actualizar/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Limpiar el formulario después de enviar
      setProductName("");
      setProductQuantity("");
      setProductCode("");
      setProductCategory("");
      setCustomCategory("");
      setProductDescription("");
      setProductPrice("");
      setProductImage(null);
      setProductModel("");
      setProductBrand("");
      successUpdate();
    } catch (error) {
      console.error("Error al actualizar el producto:", error.response ? error.response.data : error.message);
      errorUpdate();
    }
  };

  useEffect(() => {
    loadCategories(); // Cargar categorías al montar el componente
    loadProductData(); // Cargar datos del producto
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <div className="flex flex-row bg-gray-100 max-w-[1550px] mx-auto">
        <div className="flex-3 p-5">
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Actualizar Producto</h2>
            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-1/2 pl-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={productQuantity}
                    min={1}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Referencia</label>
                  <input
                    type="text"
                    placeholder="1234567890"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-1/2 pl-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Categoría</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  >
                    <option value="" disabled required>
                      Seleccionar Categoria
                    </option>
                    {category.map((cat) => (
                      <option key={cat.id_categoria} value={cat.id_categoria}>
                        {cat.nombre_categoria}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-bold text-gray-700 mb-1">Descripción</label>
              <textarea
                placeholder="Descripción del producto..."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 h-24"
              ></textarea>
            </div>

            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    placeholder="Precio"
                    value={productPrice}
                    min={1}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-1/2 pl-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Imagen del Producto</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Modelo</label>
                  <input
                    type="text"
                    placeholder="Modelo del producto"
                    value={productModel}
                    onChange={(e) => setProductModel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-1/2 pl-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">Marca</label>
                  <input
                    type="text"
                    placeholder="Marca del producto"
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-bold text-gray-700 mb-1">Agregar nueva categoría</label>
              <input
                type="text"
                placeholder="Nombre de nueva categoría"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
              type="submit"
            >
              Actualizar Producto
            </button>
          </div>
        </div>

        <div className="flex-1 ml-5 p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Vista previa</h2>
          <div className="border border-gray-300 p-5 rounded-lg shadow-md text-center flex flex-col items-center">
            {productImage && (
              <img
                src={productImage}
                alt="Imagen del producto"
                className="w-full max-w-xs mb-3"
              />
            )}
            <h3 className="text-lg text-gray-700 mb-2">{productName || ""}</h3>
            <div className="flex flex-row w-full justify-center">
              <p className="mr-10">
                {productQuantity ? "Cantidad: " + productQuantity : ""}
              </p>
              <p>{productPrice ? "Precio: $" + productPrice : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdateProductForm;
