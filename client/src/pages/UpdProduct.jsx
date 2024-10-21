import React, { useState } from "react";
import Dashboard from "../components/Dashboard"; 
import "./UpdateProduct.css";

function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [productCode, setProductCode] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productModel, setProductModel] = useState("");
  const [productBrand, setProductBrand] = useState("");


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

  const handleUpdate = () => {
    console.log("Producto actualizado correctamente");
  };

  return (
    <div className="page-container">
      <Dashboard />
      <div className="update-product-container">
        <div className="form-section">
          <h2>Actualizar Producto</h2>
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
                placeholder="Cantidad del producto"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Referencia</label>
              <input
                type="text"
                placeholder="Referencia del producto"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Precio</label>
              <input
                type="number"
                placeholder="Precio del producto"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              placeholder="Descripción del producto"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Imagen del Producto</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <button className="save-button" onClick={handleUpdate}>
            Actualizar Producto
          </button>
        </div>

        <div className="product-preview">
          <h2>Vista Previa del Producto</h2>
          <div className="producto-card">
            {productImage && (
              <img src={productImage} alt="Vista previa del producto" />
            )}
            <h3>{productName}</h3>
            <p>Cantidad: {productQuantity}</p>
            <p>Precio: ${productPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
