import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

function ProductModal({ product, onClose, onEdit, onDelete }) {
  if (!product) return null;

  const handleDelete = () => {
    const confirmDelete = window.confirm("¿Desea eliminar el producto?");
    if (confirmDelete) {
      onDelete(product.cod_producto);
      onClose(); // Cierra el modal después de eliminar
    }
  };

  const handleEdit = () => {
    onEdit(); // Llama a la función de editar
    onClose(); // Cierra el modal
  };

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
        
        <div className="flex justify-between mt-4">
          <button onClick={handleEdit} className="px-4 py-2 bg-yellow-500 text-white rounded flex items-center">
            <FaEdit className="mr-2" /> Editar
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded flex items-center">
            <FaTrash className="mr-2" /> Eliminar
          </button>
        </div>
        
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
      </div>
    </div>
  );
}

export default ProductModal;
