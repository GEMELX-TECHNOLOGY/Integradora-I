import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import CardProduct from "@/components/CardProduct";
import ProductModal from "@/components/ProductModal"; 
import UpdateProductForm from "@/components/UpdateProductForm"; // Importar el nuevo formulario
import api from "@/lib/api";
import { SearchIcon } from "@/icons/Icons";
import toast, { Toaster } from "react-hot-toast";

function Inventary() {
  const [search, setSearch] = useState(""); 
  const [products, setProducts] = useState([]); 
  const [category, setCategory] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 8; 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); // Estado para controlar el formulario de actualización

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

  const getCategoryName = (categoryId) => {
    const categoryItem = category.find((c) => c.id_categoria === categoryId);
    return categoryItem ? categoryItem.nombre_categoria : "Sin categoría";
  };

  const filteredProducts = products.filter((product) => {
    const searchCategory =
      selectedCategory === "" || product.categoria === parseInt(selectedCategory);
    const searchProduct = product.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    return searchCategory && searchProduct;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
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

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsUpdateFormOpen(true); // Abre el formulario de actualización
    setIsModalOpen(false); // Cierra el modal
  };

  const handleUpdateClose = () => {
    setIsUpdateFormOpen(false);
    setSelectedProduct(null);
    loadProducts(); // Recargar productos después de la actualización
  };
  
  const succesDelete = () =>
    toast.success("El producto se ha eliminado correctamente", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const errorDelete = () =>
    toast.error("Ha ocurrido un error al eliminar el producto", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
  const handleView = (product) => {
    const categoryName = getCategoryName(product.categoria);
    const productWithDetails = {
      ...product,
      categoriaNombre: categoryName,
    };
    setSelectedProduct(productWithDetails);
    setIsModalOpen(true);
  };

  const handleDelete = async (cod_producto) => {
    const confirmDelete = window.confirm("¿Desea eliminar el producto?");
    if (confirmDelete) {
        try {
            await api.delete(`api/productos/delete/${cod_producto}/`);
            // Elimina el producto del estado sin recargar
            setProducts(prevProducts => prevProducts.filter(product => product.cod_producto !== cod_producto));
            succesDelete();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            errorDelete();
        }
    }
};

  return (
    <div className="flex h-screen">
       <Toaster />
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
              onEdit={() => handleEdit(product)} // Editar
              onDelete={() => handleDelete(product.cod_producto)} // Eliminar
              onView={() => handleView(product)} // Ver
            />
          ))}
        </div>
      </div>
      
      {isUpdateFormOpen && (
        <UpdateProductForm 
          product={selectedProduct} 
          onClose={handleUpdateClose} 
        />
      )}

      {isModalOpen && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
          onEdit={() => handleEdit(selectedProduct)} // Pasar la función de editar
          onDelete={handleDelete} // Pasar la función de eliminar
        />
      )}
    </div>
  );
}

export default Inventary;
