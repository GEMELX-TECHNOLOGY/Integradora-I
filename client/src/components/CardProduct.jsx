import React from "react";

function CardProduct({ index, title, category, image, price, quantity }) {
  return (
    <div>
      <ul>
        <li key={index}>
          <button className="flex flex-col w-[291px] h-[341px] bg-white shadow-lg rounded-lg items-center justify-center px-6 py-4">
            <img src={image} alt={title} className="w-auto h-[146px]" />
            <div>
              <span className="text-base font-medium">{title}</span>
              <p className="text-sm font-semibold text-black/50">Categoria: {category}</p>
            </div>

            <hr className="my-4 w-full border-t border-gray-300" />
            <div className="flex justify-between w-full">
              <span className="text-base font-medium">
                Cantidad: {quantity}
              </span>
              <span className="text-base font-medium">Precio: ${price}</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CardProduct;
