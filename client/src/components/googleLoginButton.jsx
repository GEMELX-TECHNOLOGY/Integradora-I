import React from 'react';
import '../styles/googleLoginButton.css';
 

const GoogleLoginButton = () => {
  return (
    <button className="google-login-btn">
      <img
        src="https://logosmarcas.net/wp-content/uploads/2020/09/Google-Emblema.png"
        alt="Google logo"
        className="google-logo"
      />
      Iniciar con Google
    </button>
  );
};
//
export default GoogleLoginButton;