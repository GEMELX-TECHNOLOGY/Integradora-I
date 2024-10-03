import React from 'react';
import GoogleLoginButton from '../components/googleLoginButton';
import InputField from '../components/inputField';


const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>
        <GoogleLoginButton />
        <p className="or-register">o registrarse</p>
        <InputField type="email" placeholder="Correo Electrónico" icon="fa fa-envelope" />
        <InputField type="password" placeholder="Contraseña" icon="fa fa-lock" />
        <p className="forgot-password">¿Has olvidado tu contraseña?</p>
        <button className="login-btn">Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Login;