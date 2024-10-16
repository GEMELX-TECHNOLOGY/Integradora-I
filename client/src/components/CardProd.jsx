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
            <div class>
              <p>10</p>
            </div>
          </div>
          <div className="precio">
            <span>Precio: $1299</span>
          </div>
        </div>
        <div className="botones-container">
          <button className='boton'>Editar</button>
          <button className='boton'>Eliminar</button>
        </div>
      </section>
    </div>

  );
}

export default CardProd;

