import React from 'react';
import './inputField.css';


const InputField = ({ type, placeholder }) => {
  return (
    <div className="input-field">
      <input type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputField;