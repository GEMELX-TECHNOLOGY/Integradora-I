import React from "react";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

function CardProduct({ index, title, category, image, price, quantity, onEdit, onDelete, onView }) {
  const handleDelete = (e) => {
    onDelete();
  };

  return (
    <div>
      <ul>
        <li key={index}>
          <div className="flex flex-col w-[291px] h-[341px] bg-white shadow-lg rounded-lg items-center justify-center px-6 py-4 text-center">
            <img src={image} alt={title} className="w-auto h-[146px]" />
            <div>
              <span className="text-base font-medium">{title}</span>
              <p className="text-sm font-semibold text-black/50">Categoría: {category}</p>
            </div>

            <hr className="my-4 w-full border-t border-gray-300" />
            <div className="flex justify-between w-full">
              <span className="text-base font-medium">Cantidad: {quantity}</span>
              <span className="text-base font-medium">Precio: ${price}</span>
            </div>
            <div className="flex justify-between w-full mt-4">
              <button className="text-blue-500" onClick={onView}>
                <FaEye />
              </button>
              <button className="text-yellow-500" onClick={onEdit}>
                <FaEdit />
              </button>
              <button className="text-red-500" onClick={handleDelete}>
                <FaTrash />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CardProduct;
