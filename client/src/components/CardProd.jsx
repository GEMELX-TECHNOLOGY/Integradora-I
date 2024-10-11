import React from 'react';
import Camara from "../Assets/img/cam_pro.png";
import '../Styles/CardProd.css';

function CardProd() {
  return (
    <div className="galeria">  
      <section className="producto">
        <img src={Camara} alt="camseguridad" />
        <h2>Camara ONEXPRO</h2>
        
        {/* Sección de cantidad y precio */}
        <div className="producto-info">
          <div className="cantidad">
            <label htmlFor="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" name="cantidad" min="1" defaultValue="1" />
          </div>
          <div className="precio">
            <span>Precio: $1299</span>
          </div>
        </div>
        
        
        <button>Añadir al carrito</button>
      </section>
    </div>

  );
}

export default CardProd;

