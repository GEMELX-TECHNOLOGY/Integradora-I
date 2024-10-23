import React from "react";
import { SearchIcon } from "@/icons/Icons";

function Inbox() {
  return (
    <div className="flex max-w-[1440px] mx-auto">
      {/* Box contacts */}
      <div className="w-[400px] h-[810px] bg-white rounded-xl shadow-lg pt-10">
        <h1 className="text-[#555555] font-bold pb-10 pl-6 text-[20px]">
          Buzon de mensajes
        </h1>
        <search className="flex flex-row max-w-max pl-10">
          <form action="" className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Buscar contacto..."
              className="max-w-max h-10 px-6 py-4 border-[#555555] border-2 rounded-lg pl-10"
            />
          </form>
        </search>
        
      </div>
      {/*Box chat*/}
      <div className="w-[1230px] bg-white px-6 py-4 shadow-lg rounded-xl ml-6 flex flex-col h-[810px]">
        {/*Profile data*/}
        <div className="flex flex-row p-4 items-center">
          <img
            src="/download.jpeg"
            alt="profile's"
            className="flex mr-4 w-[60px] h-[60px] rounded-full"
          />
          <div>
            <h1 className="font-bold text-[16px] text-black">
              Michelle Ortega
            </h1>
            <span className="text-[#555555]">Admin</span>
          </div>
        </div>
        <hr className="my-4 border-t border-gray-300 max-w-[1500px]" />

        {/*Box messages*/}
        <div className="flex-1 overflow-y-auto pr-2">
          {/* MESSAGE LEFT */}
          <div className="flex flex-row items-center mb-2">
            <div>
              <img
                src="/download.jpeg"
                alt="profile's"
                className="flex mr-4 w-[40px] h-[40px] rounded-full"
              />
            </div>
            <div className="flex-shrink-1 border-2 border-[#045E9C] text-[#045E9C] rounded-xl py-2 px-3 ml-3 text-justify w-auto max-w-[500px]">
              Lorem ipsum dolor sit amet consectetur, adipisicig elit. Nihil
              voluptatum eaque nemo similique eius dolorem doloes ea odio
              impedit. Laudantium, ea architecto eligendi liber perspiciatis
              incidunt dolor consequatur necessitatibus officia.
            </div>
          </div>
          <div className="ml-[68px] text-xs text-[#333333]">10:00 pm</div>

          {/* MESSAGE RIGHT */}
          <div className="flex flex-row-reverse items-center mb-2">
            <div>
              <img
                src="/conejojotkei.jpeg"
                alt="profile's"
                className="flex w-[40px] h-[40px] rounded-full ml-3"
              />
            </div>
            <div className="flex-shrink-1 bg-[#045E9C] text-white rounded-xl py-2 px-3 ml-3 text-justify w-auto max-w-[500px]">
              Lorem ipsum dolor sit amet consectetur, adipisicig elit. Nihil
              voluptatum eaque nemo similique eius dolorem doloes ea odio
              impedit. Laudantium, ea architecto eligendi liber perspiciatis
              incidunt dolor consequatur necessitatibus officia.
            </div>
          </div>
          <div className="text-end mr-[68px] text-xs text-[#333333]">
            10:00 pm
          </div>
          
        </div>
        

        {/*Input Send */}
        <footer className="w-full p-4 h-auto">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Escribe un mensaje"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mr-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Inbox;
