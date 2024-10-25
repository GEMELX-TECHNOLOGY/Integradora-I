import React, { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis,} from "recharts";
import api from "@/lib/api"


function Estadistic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = await api.get("api/ventas/");
        const res = await query.data

        const shuffled = res.sort(() => 0.5 - Math.random());

        const randomMasVendidos = shuffled.slice(0, 5);
        setData(randomMasVendidos);
        console.log(randomMasVendidos)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shortenName = (referencia, maxLength = 10) => {
    return referencia.length > maxLength ? referencia.slice(0, maxLength) + "..." : referencia;
  };


  return (
    <section className="w-[1190px] bg-white h-[540px] shadow-lg rounded-xl px-6 py-4 ml-11">
      <h5 className="text-center text-[18px] font-bold text-black/70">
        Ventas
      </h5>
      <div className="flex items-center justify-center">
        <AreaChart
          fill="#000"
          width={1190}
          height={500}
          data={data}
          margin={{ top: 5, right: 2, bottom: 5, left: 0 }}
        >
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#045E9C" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="referencia" tickFormatter={(name) => shortenName(name)} />
          <YAxis />
        </AreaChart>
      </div>
    </section>
  );
}

export default Estadistic;
