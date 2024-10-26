import React from "react";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">{product.nombre}</h2>
        <img src={product.product_image} alt={product.nombre} className="w-full h-auto mb-4" />
        <p><strong>Descripción:</strong> {product.descripcion}</p>
        <p><strong>Referencia:</strong> {product.referencia}</p>
        <p><strong>Modelo:</strong> {product.modelo}</p>
        <p><strong>Marca:</strong> {product.marca}</p>
        <p><strong>Precio:</strong> ${product.precio}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Categoría:</strong> {product.categoriaNombre}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
      </div>
    </div>
  );
}

export default ProductModal;
