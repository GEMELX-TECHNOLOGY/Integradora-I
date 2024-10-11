import React, { useState } from 'react'; 
import Dashboard from '../components/Dashboard';
import Camara from "../Assets/img/cam_pro.png"; 
import '../Styles/AddProd.css';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [productCode, setProductCode] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice] = useState('');

  console.log("Renderizando AddProduct");

  return (
    <>
      <Dashboard/>
      <div className="add-product-container">
        <div className="form-section">
          <h2>Agregar Producto</h2>
          <div className="form-group">
            <label>Nombre</label>
            <input 
              type="text" 
              placeholder="Nombre del producto" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input 
              type="number" 
              placeholder="Cantidad" 
              value={productQuantity} 
              onChange={(e) => setProductQuantity(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Código de Producto</label>
            <input 
              type="text" 
              placeholder="1234567890" 
              value={productCode} 
              onChange={(e) => setProductCode(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select 
              value={productCategory} 
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Cámaras">Cámaras</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              placeholder="Descripción del producto..." 
              value={productDescription} 
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>
          <button className="save-button">Guardar Producto</button>
        </div>
        <div className="product-preview">
          <h2>Vista previa</h2>
          <div className="producto-card">
            <img src={Camara} alt="camseguridad" />
            <h3>{productName || "Cámara de seguridad ZOSI 8-500"}</h3>
            <p>Cantidad: {productQuantity}</p>
            <p>Precio: {productPrice || "$XX.XX"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
