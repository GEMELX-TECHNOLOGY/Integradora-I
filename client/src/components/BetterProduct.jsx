import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";

function BetterProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("api/v1/productos/");
        setProducts(res.data);
      } catch (err) {
        console.error(`Error: ${err}`);  
      }
    };
  
    const loadCategories = async () => {
      try {
        const res = await api.get("api/v1/categorias/");
        setCategories(res.data);
      } catch (err) {
        console.error(`Error: ${err}`);  
      }
    };
  
    loadCategories();
    loadProducts();
  }, []);

  const categoriesMap = categories.reduce((acc, category) => {
    acc[category.id_categoria] = category.nombre_categoria;
    return acc;
  }, {});

  const sortedProducts = products
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 3);

  return (
    <section className="bg-white max-w-full h-auto rounded-xl shadow-lg ml-11 px-6 py-4">
      <div className="flex flex-row justify-between items-center">
        <h5 className="text-center text-[18px] font-bold text-black/70 ml-5">
          Inventario
        </h5>
        <Link
          to="/Inventario"
          className="text-[14px] mr-6 text-black/70 font-semibold hover:text-[#045E9C]"
        >
          Ver mas
        </Link>
      </div>

      {/* Contenedor para la tabla con desplazamiento horizontal si es necesario */}
      <div className="overflow-x-auto mt-4 max-h-[calc(100vh-200px)]"> {/* Limita la altura del contenedor */}
        <table className="min-w-full table-auto rounded-lg text-center">
          <thead className="bg-[#045E9C] text-white">
            <tr>
              <th className="p-2 text-center">Codigo de Producto</th>
              <th className="p-2 text-center">Nombre</th>
              <th className="p-2 text-center">MODELO</th>
              <th className="p-2 text-center">CATEGORIA</th>
              <th className="p-2 text-center">PRECIO</th>
              <th className="p-2 text-center">CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 text-gray-800"
              >
                <td className="p-2">
                  <div className="font-bold">{product.cod_producto}</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">{product.nombre}</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">{product.modelo}</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">{categoriesMap[product.categoria]}</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">${product.precio}</div>
                </td>
                <td className="p-2">
                  <div className="font-bold">{product.stock}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BetterProduct;
