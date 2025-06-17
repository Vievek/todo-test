import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as authLogin,
  register as authRegister,
  getCurrentUser,
} from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const userData = await authLogin(credentials);
      setUser(userData);
      navigate("/");
    } catch (err) {
      // Improved error handling to extract message from axios error shape
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  const register = async (credentials) => {
    try {
      setError(null);
      await authRegister(credentials);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
