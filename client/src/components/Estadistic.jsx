import React, { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";
import api from "@/lib/api";

function Estadistic({ title }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = await api.get("api/v1/ventas/");
        const res = await query.data;

        const shuffled = res.sort(() => 0.5 - Math.random());

        const randomMasVendidos = shuffled.slice(0, 5);
        setData(randomMasVendidos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shortenName = (referencia, maxLength = 10) => {
    return referencia.length > maxLength
      ? referencia.slice(0, maxLength) + "..."
      : referencia;
  };

  return (
    <section className="w-full bg-white h-[600px] shadow-lg rounded-xl px-6 py-4 ml-11">
      <div className="flex item-center max-w-full justify-between">
      <h5 className=" text-[24px] font-bold text-black/70">{title}</h5>
      <select className="bg-white border-transparent shadow-lg w-[116px] h-[36px] rounded-[10px] ml-4 text-center">
        <option value="">Enero</option>
      </select>
      </div>
      <div className="flex items-start justify-start pt-4">
        <AreaChart
          fill="#000"
          width={1440}
          height={550}
          data={data}
          margin={{ top: 5, right: 2, bottom: 5, left: 0 }}
        >
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#045E9C" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="referencia"
            tickFormatter={(name) => shortenName(name)}
          />
          <YAxis />
        </AreaChart>
      </div>
    </section>
  );
}

export default Estadistic;
