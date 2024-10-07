import React from 'react';
import '../styles/Login.css';
import imagen1 from '../Assets/img/alpro-1.jpg'; 
import imagenFondo from '../Assets/img/slide.jpg'; 

const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/3 flex justify-center items-center bg-teal-500">
        <img src={imagenFondo} alt="Imagen de fondo" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/3 flex flex-col justify-center items-center bg-white p-8 shadow-lg">
        <div className="mb-6">
          <img src={imagen1} alt="Logo ALPRO" className="w-32 h-32 mx-auto" />
        </div>

        <h3 className="text-2xl font-bold mb-6">Nos agrada verte de nuevo</h3>

        <form className="w-full">
          <div className="input-wrapper mb-4">
            <label htmlFor="username" className="block font-semibold">Usuario</label>
            <input type="text" id="username" placeholder="Username" className="border border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="input-wrapper mb-4">
            <label htmlFor="password" className="block font-semibold">Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" className="border border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="extra-options flex justify-between items-center mb-4">
            <div>
              <input type="checkbox" id="remember" className="mr-1" />
              <label htmlFor="remember" className="text-sm">Recordarme</label>
            </div>
            <a href="#" className="text-blue-500 text-sm hover:underline">¿Has olvidado tu contraseña?</a>
          </div>
          <button type="submit" className="login-btn bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Iniciar sesión</button>
        </form>
        <footer className="mt-4 text-sm text-gray-600">&copy; ALPRO 2024</footer>
      </div>
    </div>
  );
};

export default Login;
