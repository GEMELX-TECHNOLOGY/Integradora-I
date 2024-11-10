import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const fetchUserDetails = async (token) => {
      try {
        const response = await api.get("/api/v1/user/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    const loginUser = (token, userDetails) => {
      localStorage.setItem("access", token);
      setUser(userDetails);  // Establece el usuario completo
    };
  
    const resetUser = () => {
      setUser(null);
      setLoading(false);
    };
  
    useEffect(() => {
      const token = localStorage.getItem("access");
      if (token) {
        fetchUserDetails(token);
      } else {
        setUser(null);
        setLoading(false);
      }
    }, []);
  
    return (
      <UserContext.Provider value={{ user, loading, loginUser, resetUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  

export const useUser = () => useContext(UserContext);
