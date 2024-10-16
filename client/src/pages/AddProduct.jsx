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
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  console.log("Renderizando AddProduct");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="page-container">
        <Dashboard />
        <div className="add-product-container">
          <div className="form-section">
            <h2>Agregar Producto</h2>
            <div className="form-group-row">
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
            </div>
            <div className="form-group-row">
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
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea 
                placeholder="Descripción del producto..." 
                value={productDescription} 
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label>Precio</label>
                <input 
                  type="number" 
                  placeholder="Precio" 
                  value={productPrice} 
                  onChange={(e) => setProductPrice(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Imagen del Producto</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </div>
            </div>
            <button className="save-button">Guardar Producto</button>
          </div>
          <div className="product-preview">
            <h2>Vista previa</h2>
            <div className="producto-card">
              <img src={productImage || Camara} alt="camseguridad" />
              <h3>{productName || ""}</h3>
              <p>Cantidad: {productQuantity}</p>
              <p>Precio: {productPrice ? `$${productPrice}` : "$XX.XX"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
