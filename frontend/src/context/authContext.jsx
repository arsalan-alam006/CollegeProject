// src/context/authContext.jsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const UserContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
        try {

            const token = localStorage.getItem("token");
            if(token) {
                const response = await axios.get("http://localhost:5000/api/auth/verify", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(response)
                if(response.data.success) {
                    setUser(response.data.user);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        } catch (error) {
          console.log(error)
            if(error.response && !error.response.data.error) {
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    }
    verifyUser();
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(UserContext);

// Export the provider
export default AuthProvider;