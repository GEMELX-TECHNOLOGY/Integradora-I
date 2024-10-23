import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../components/Dashboard';
import '../Styles/AddProd.css';

function AddProduct() { //creacion de la funcion para añádir producto
  const [categories, setCategories] = useState([]); //hook que maneja el estado de los componenetes
  const [productName, setProductName] = useState(''); //Todos inician con una cadena vacia,1,null
  const [productQuantity, setProductQuantity] = useState(1);
  const [productCode, setProductCode] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productModel, setProductModel] = useState('');
  const [productBrand, setProductBrand] = useState('');
//los useStates guardan informacion que luego puede cambiar manteniendo un valor inicial primero
//los hooks son herramientas que permiten extender o personalizar el comportamiento de una aplicación de manera flexible y organizada.

  useEffect(() => { //hook que realiza efectos secundarios, se ejecuta cuando se actualize el estado del componente
    const fetchCategories = async () => { //funcion que espera a que se realize un proceso
      try {//Manejo de excepciones
        const response = await api.get('api/categorias/'); //aqui se realiza la solicitud get, el await se usa pa esperar una peticion y luego dar una respuesta
        setCategories(response.data);//Cuando se recibe respuesta se manda llamar al setcategories para que guarde la nueva categoria
      } catch (error) {//se intenta ejecutar en el try primero, si ocurre un error cae aqui
        console.error('Error al obtener las categorías:', error); //mensaje de error
      }
    };

    fetchCategories(); //cargar datos iniciales
  }, []);

  const handleImageChange = (event) => { //cuando en nuestra cajita de texto "seleccione una imagen" cambia para hacer esa seleccion de imagen con su formato
    const file = event.target.files[0];// elemento del DOM que desencadenó el evento y accede al primer elemento de una lista (imagen seleccionada)
    if (file) {//aqui se comprueba si se selecciono una imagen
      setProductImage(file); //esto actualiza en la bd el archivo seleccionado como imagen
    }
  };

  const handleSubmit = async (e) => { //funcion que se ejecuta cuando el formulario se envia
    e.preventDefault(); //evita recargo de pagina al seleccionar crear otra categoria
    let categoriaId = productCategory; 

    // Si se seleccionó "otra", crear una nueva categoría
    if (productCategory === 'otra' && customCategory) {
      try {
        const newCategoryResponse = await api.post('api/categorias/crear', {
          nombre_categoria: customCategory,
          referencia_categoria: 'Ref1234', 
        });
        categoriaId = newCategoryResponse.data.id_categoria; // Obtener el ID de la nueva categoría
      } catch (error) {
        console.error('Error al crear la categoría:', error.response ? error.response.data : error.message);
        alert('Hubo un error al crear la categoría: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
        return; // Detener la ejecución si hubo un error
      }
    }

    const formData = new FormData();
    formData.append('cod_producto', productCode);
    formData.append('nombre', productName);
    formData.append('descripcion', productDescription);
    formData.append('referencia', productCode); 
    formData.append('modelo', productModel);
    formData.append('marca', productBrand);
    formData.append('precio', productPrice);
    formData.append('stock', productQuantity);
    formData.append('categoria', categoriaId); // Asigna el ID de la categoría
    if (productImage) {
      formData.append('imagen', productImage);
    }

    try {
      await api.post('api/productos/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Limpiar el formulario después de enviar
      setProductName('');
      setProductQuantity(1);
      setProductCode('');
      setProductCategory('');
      setCustomCategory('');
      setProductDescription('');
      setProductPrice('');
      setProductImage(null);
      setProductModel('');
      setProductBrand('');
      alert('Producto guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el producto:', error.response ? error.response.data : error.message);
      alert('Hubo un error al guardar el producto: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className="page-container">
      <Dashboard />
      <div className="add-product-container">
        <form onSubmit={handleSubmit} className="form-section">
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
              <label>Referencia</label>
              <input 
                type="text" 
                placeholder="Referencia" 
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
                {categories.map(category => (
                  <option key={category.id_categoria} value={category.id_categoria}>
                    {category.nombre_categoria}
                  </option>
                ))}
                <option value="otra">Otra (Especificar)</option> 
              </select>
              {productCategory === 'otra' && ( 
                <div>
                  <label>Especifica tu categoría</label>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Escribe tu categoría"
                  />
                </div>
              )}
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
          <div className="form-group-row">
            <div className="form-group">
              <label>Modelo</label>
              <input 
                type="text" 
                placeholder="Modelo del producto" 
                value={productModel} 
                onChange={(e) => setProductModel(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Marca</label>
              <input 
                type="text" 
                placeholder="Marca del producto" 
                value={productBrand} 
                onChange={(e) => setProductBrand(e.target.value)} 
              />
            </div>
          </div>
          <button type="submit" className="save-button">Guardar Producto</button>
        </form>
        <div className="product-preview">
          <h2>Vista previa</h2>
          <div className="producto-card">
            {productImage && <img src={URL.createObjectURL(productImage)} alt="Imagen del producto" />}
            <h3>{productName || ""}</h3>
            <p>Cantidad: {productQuantity}</p>
            <p>Precio: {productPrice ? '$' + productPrice : "$xx.xx"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
