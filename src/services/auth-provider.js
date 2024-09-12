import axios from "axios";
import { createContext, useContext, useState } from "react";

// Auth context
const AuthContext = createContext();

const url = "http://localhost:5001/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulated API calls
  const login = async (email, password) => {
    // In a real app, make an API call here
    setLoading(true);
    const response = await axios
      .post(`${url}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("response", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userDetails", JSON.stringify(res.data.user));
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("Login error::::", err);
        setError(err);
      });
    setLoading(false);
    return response;
  };

  const register = async (name, email, password, role) => {
    // In a real app, make an API call here
    const response = await axios
      .post(`${url}/auth/register`, {
        email: email,
        password: password,
        role: role,
        name: name,
      })
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        setError(err.response.data.message);
        return err.response.data.message;
      });

    console.log("response.response.status", response);

    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = { user, login, register, logout, error, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
