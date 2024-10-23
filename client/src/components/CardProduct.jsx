import React from "react";

function CardProduct({title,image,price}) {


  return (
    <div>
          <button className="flex flex-col w-[291px] h-[341px] bg-white shadow-lg rounded-lg items-center justify-center px-6 py-4">
            <img src={image} alt={title} className="w-auto h-[146px]" />
            <span className="text-base font-medium">{title}</span>
            <hr className="my-4 w-full border-t border-gray-300" />
            <div className="flex justify-between w-full">
              <span className="text-base font-medium">Cantidad: XX</span>
              <span className="text-base font-medium">Precio: ${price}</span>
            </div>
          </button>
    </div>
  );
}

export default CardProduct;
