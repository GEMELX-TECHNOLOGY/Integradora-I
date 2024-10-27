import React from "react";

function CardProduct({ index, title, category, image, price, quantity, onEdit, onDelete, onView }) {
  const handleDelete = (e) => {
    e.stopPropagation(); // Detiene la propagación del clic
    const confirmDelete = window.confirm("¿Desea eliminar el producto?");
    if (confirmDelete) {
      console.log("Eliminando producto:", title); // Log para depuración
      onDelete(); // Solo llama a onDelete si el usuario confirma
    }
  };

  return (
    <div>
      <ul>
        <li key={index}>
          <button className="flex flex-col w-[291px] h-[341px] bg-white shadow-lg rounded-lg items-center justify-center px-6 py-4">
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
              <button className="text-blue-500" onClick={onView}>Ver</button>
              <button className="text-yellow-500" onClick={onEdit}>Actualizar</button>
              <button className="text-red-500" onClick={handleDelete}>Eliminar</button>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CardProduct;

