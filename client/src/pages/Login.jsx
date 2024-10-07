import React from "react";
import '../styles/Login.css';
import imagen1 from '../Assets/img/alpro-1.jpg';
import imagenFondo from '../Assets/img/slide.jpeg';
import Form from '../components/Form';

const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/3 flex justify-center items-center bg-teal-500">
        <img
          src={imagenFondo}
          alt="Imagen de fondo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/3 flex flex-col justify-center items-center bg-white p-8 shadow-lg">
        <div className="mb-6">
          <img src={imagen1} alt="Logo ALPRO" className="w-32 h-32 mx-auto" />
        </div>

        <h3 className="text-2xl font-bold mb-6">Nos agrada verte de nuevo</h3>

        <Form route="/api/token/" method="login"/>
        <footer className="mt-4 text-sm text-gray-600">
          &copy; ALPRO 2024
        </footer>
      </div>
    </div>
  );
};

export default Login;
