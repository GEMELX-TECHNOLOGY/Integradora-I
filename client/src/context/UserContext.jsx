import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Crear el proveedor del contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Función para actualizar los datos del usuario
    const loginUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};
