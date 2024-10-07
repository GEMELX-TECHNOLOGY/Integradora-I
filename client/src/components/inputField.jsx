import React from 'react';
import '..Styles/inputField.css';

//
const InputField = ({ type, placeholder }) => {
  return (
    <div className="input-field">
      <input type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputField;