import React from 'react';

const SaleCard = ({ title, Count, text, percentageChange, time, icon, cardIcon}) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 w-auto h-[161px] ml-[45px]">
      {/* Contenido */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 pt-4">{title}</h3>
        <div className="text-3xl font-bold text-gray-900 pt-4">{Count}</div>
        <div className="flex flex-row text-sm text-gray-500 pt-5">
          <span className={`${text} flex pr-2`}>
            {icon}
            {percentageChange}%
          </span>{" "}
          {time}
        </div>
      </div>

      {/* Icono */}
      <div className=" p-3 rounded-full ml-auto">
        {cardIcon}
      </div>
    </div>
  );
}

export default SaleCard;
