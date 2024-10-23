import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

function Form() {
  //creacion de la funcion para añádir producto
  const [productName, setProductName] = useState(""); //hook que maneja el estado de los componenetes
  const [productQuantity, setProductQuantity] = useState(""); //Todos inician con una cadena vacia,1,null
  const [productCode, setProductCode] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productModel, setProductModel] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [category, setCategories] = useState([]);
  //los useStates guardan informacion que luego puede cambiar manteniendo un valor inicial primero
  //los hooks son herramientas que permiten extender o personalizar el comportamiento de una aplicación de manera flexible y organizada.

  const handleImageChange = (event) => {
    //cuando en nuestra cajita de texto "seleccione una imagen" cambia para hacer esa seleccion de imagen con su formato
    const file = event.target.files[0]; // elemento del DOM que desencadenó el evento y accede al primer elemento de una lista (imagen seleccionada)
    if (file) {
      //aqui se comprueba si se selecciono una imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file); //esto actualiza en la bd el archivo seleccionado como imagen
    }
  };

  const succesAdd = () =>
    toast.success("El registro se ha agregado correctamente");
  const errorAdd = () =>
    toast.error("Ha ocurrido un error al agregar el registro", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  //funcion que se ejecuta cuando el formulario se envia
  const handleSubmit = async (e) => {
    e.preventDefault(); //evita recargo de pagina al seleccionar crear otra categoria
    let categoriaId = productCategory;

    // Si se seleccionó "otra", crear una nueva categoría
    if (productCategory === "otra" && customCategory) {
      try {
        const newCategoryResponse = await api.post("api/categorias/crear", {
          nombre_categoria: customCategory,
          referencia_categoria: "Ref1234",
        });
        categoriaId = newCategoryResponse.data.id_categoria; // Obtener el ID de la nueva categoría
      } catch (error) {
        console.error(
          "Error al crear la categoría:",
          error.response ? error.response.data : error.message
        );
        alert(
          "Hubo un error al crear la categoría: " +
            (error.response
              ? JSON.stringify(error.response.data)
              : error.message)
        );
        return; // Detener la ejecución si hubo un error
      }
    }

    const formData = new FormData();
    formData.append("cod_producto", productCode);
    formData.append("nombre", productName);
    formData.append("descripcion", productDescription);
    formData.append("referencia", productCode);
    formData.append("modelo", productModel);
    formData.append("marca", productBrand);
    formData.append("precio", productPrice);
    formData.append("stock", productQuantity);
    formData.append("categoria", categoriaId); // Asigna el ID de la categoría
    if (productImage) {
      formData.append("imagen", productImage);
    }

    try {
      await api.post("api/productos/crear", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Limpiar el formulario después de enviar
      setProductName("");
      setProductQuantity("");
      setProductCode("");
      setProductCategory("");
      setProductCategory("");
      setProductDescription("");
      setProductPrice("");
      setProductImage(null);
      setProductModel("");
      setProductBrand("");
      succesAdd();
    } catch (error) {
      console.error(
        "Error al guardar el producto:",
        error.response ? error.response.data : error.message
      );
      errorAdd();
    }
  };
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("api/categorias/");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  return (
    <form action="">
      <Toaster />
      <div className="flex flex-row bg-gray-100 max-w-[1550px] mx-auto">
        <div className="flex-3 p-5">
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex flex-wrap mb-5">
              <div className="w-1/2 pr-2">
                <div className="mb-5">
                  <label className="block font-bold text-gray-700 mb-1">
                    Nombre
                  </label>
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
                  <label className="block font-bold text-gray-700 mb-1">
                    Cantidad
                  </label>
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
                  <label className="block font-bold text-gray-700 mb-1">
                    Referencia
                  </label>
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
                  <label className="block font-bold text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  >
                    <option value="" disabled required>
                      Seleccionar Categoria
                    </option>
                    {category.map((category) => (
                      <option
                        key={category.id_categoria}
                        value={category.id_categoria}
                      >
                        {category.nombre_categoria}
                      </option>
                    ))}
                  </select>        
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-bold text-gray-700 mb-1">
                Descripción
              </label>
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
                  <label className="block font-bold text-gray-700 mb-1">
                    Precio
                  </label>
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
                  <label className="block font-bold text-gray-700 mb-1">
                    Imagen del Producto
                  </label>
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
                  <label className="block font-bold text-gray-700 mb-1">
                    Modelo
                  </label>
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
                  <label className="block font-bold text-gray-700 mb-1">
                    Marca
                  </label>
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

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
              onClick={handleSubmit}
            >
              Guardar Producto
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
                {" "}
                {productQuantity ? "Cantidad: " + productQuantity : ""}
              </p>
              <p> {productPrice ? "Precio: $" + productPrice : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
