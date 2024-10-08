import React from "react";
import Estadistica from "../Assets/img/est.png";
import '../Styles/stylecard.css'
function Card() {
  return (
    <>
      <section>
        Ventas
        <img src={Estadistica} alt="graficoestadistico"/>
      </section>
    </>
  );
}

export default Card;
