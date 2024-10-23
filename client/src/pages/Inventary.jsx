import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "../components/Header";
import CardProduct from "../components/CardProduct";
import api from '@/lib/api';

function Inventary() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [category, setCategories] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {

    };

    loadProducts();
  }, []);

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

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "" || product.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1">
        <Header />
        <div className="flex flex-col ml-11 underline-offset-1">
          <select
            className="bg-white border-transparent shadow-lg w-[116px] h-[36px] rounded-[10px] ml-4 text-center"
            onChange={handleCategoryChange}
          >
            <option value="">Todas</option>
            {category.map((category) => (
              <option key={category.id_categoria} value={category.id_cateogiria}>
                {category.nombre_categoria}
              </option>
            ))}
          </select>

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
            <CardProduct/>
        </div>
      </div>
    </div>
  );
}

export default Inventary;
