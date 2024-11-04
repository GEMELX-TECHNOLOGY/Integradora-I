import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Crear el proveedor del contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState("");

    // Función para actualizar los datos del usuario
    const loginUser = (userData) => {
        setUser(userData);
        setUserRole(userData.rol);
    };

    return (
        <UserContext.Provider value={{ user, userRole, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};
