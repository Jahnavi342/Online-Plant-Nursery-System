import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { isTokenExpired, clearAuthData } from "../utils/tokenUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount and validate token
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Check if token is expired
          if (isTokenExpired(userData.token)) {
            clearAuthData();
            setUser(null);
          } else {
            // Verify token with backend
            try {
              const response = await axiosInstance.get("/api/auth/profile");
              
              // Update user data with fresh profile info
              const updatedUser = {
                ...userData,
                ...response.data
              };
              setUser(updatedUser);
              localStorage.setItem("user", JSON.stringify(updatedUser));
            } catch (error) {
              if (error.response?.status === 401) {
                // Token is invalid, clear it
                clearAuthData();
                setUser(null);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        clearAuthData();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    clearAuthData();
  };

  // Check if user is authenticated and token is valid
  const isAuthenticated = () => {
    return user && user.token && !isTokenExpired(user.token);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
