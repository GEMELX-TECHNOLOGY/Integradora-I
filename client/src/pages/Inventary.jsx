import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import CardProduct from "@/components/CardProduct";
import ProductModal from "@/components/ProductModal"; // Asegúrate de importar el modal
import api from "@/lib/api";
import { SearchIcon } from "@/icons/Icons";
import { toast } from "react-hot-toast";

function Inventary() {
  const [search, setSearch] = useState(""); // Estado para búsqueda
  const [products, setProducts] = useState([]); // Estado para productos
  const [category, setCategory] = useState([]); // Estado para categorías
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para categoría seleccionada
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const productsPerPage = 8; // Productos por página
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Cargar productos al iniciar
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("api/productos/");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  // Cargar categorías al iniciar
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("api/categorias/");
        setCategory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  // Obtener el nombre de la categoría por ID
  const getCategoryName = (categoryId) => {
    const categoryItem = category.find((c) => c.id_categoria === categoryId);
    return categoryItem ? categoryItem.nombre_categoria : "Sin categoria";
  };

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = products.filter((product) => {
    const searchCategory =
      selectedCategory === "" || product.categoria === parseInt(selectedCategory);

    const searchProduct = product.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    return searchCategory && searchProduct;
  });

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Obtener productos de la página actual
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Manejar cambio de categoría
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  // Manejar cambio de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Cambiar a la página anterior
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cambiar a la siguiente página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Manejar eliminación de producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Desea eliminar el producto?")) {
      try {
        await api.delete(`api/productos/${id}/`);
        toast.success("Producto eliminado");
        // Recargar productos después de eliminar
        setProducts(products.filter(product => product.cod_producto !== id));
      } catch (err) {
        toast.error("Error al eliminar el producto");
      }
    }
  };

  // Manejar edición de producto
  const handleEdit = (id) => {
    console.log("Editar producto:", id);
    // Aquí puedes redirigir a un nuevo formulario de edición
  };

  // Manejar visualización de producto
  const handleView = (product) => {
    const categoryName = getCategoryName(product.categoria);
    const productWithDetails = {
      ...product,
      categoriaNombre: categoryName,
    };
    setSelectedProduct(productWithDetails);
    setIsModalOpen(true);
};


  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1">
        <Header />
        <div className="flex flex-col ml-11 underline-offset-1">
          <div className="flex item-center max-w-[1450px]">
            <select
              className="bg-white border-transparent shadow-lg w-[116px] h-[36px] rounded-[10px] ml-4 text-center"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Todas</option>
              {category.map((category) => (
                <option
                  key={category.id_categoria}
                  value={category.id_categoria}
                >
                  {category.nombre_categoria.trim()}
                </option>
              ))}
            </select>
            <div className="flex flex-row max-w-max pl-10">
              <div className="relative ml-96">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  placeholder="Buscar producto..."
                  value={search}
                  className="max-w-max h-10 px-6 py-4 shadow-lg border-2 rounded-lg pl-10"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />
          <div className="flex justify-between max-w-[1500px]">
            <span className="pt-2 font-400 text-[#849AA9]">
              Página {currentPage} de {totalPages}
            </span>
            <div className="pr-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="mx-1 px-4 py-2 rounded"
              >
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="mx-1 px-4 py-2 rounded"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 max-w-[1400px] ml-36 pt-3">
          {currentProducts.map((product, index) => (
            <CardProduct
              key={index}
              title={product.nombre}
              price={product.precio}
              quantity={product.stock}
              image={product.product_image}
              category={getCategoryName(product.categoria)}
              onEdit={() => handleEdit(product.cod_producto)} // Editar
              onDelete={() => handleDelete(product.cod_producto)} // Eliminar
              onView={() => handleView(product)} // Ver
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default Inventary;
