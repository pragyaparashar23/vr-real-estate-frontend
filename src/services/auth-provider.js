import axios from "axios";
import { createContext, useContext, useState } from "react";
import { baseUrl } from "../config";
import { toast } from "react-toastify";

// Auth context
const AuthContext = createContext();

const url = "http://localhost:5001/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simulated API calls
  const login = async (email, password) => {
    // In a real app, make an API call here
    setLoading(true);
    setError("");

    const response = await axios
      .post(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("response", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userDetails", JSON.stringify(res.data.user));
        setUser(res.data.user);
        toast.success("Login Successful");
      })
      .catch((err) => {
        toast.error(err);
        console.log("Login error::::", err);
        setError(err);
      });
    setLoading(false);
    return response;
  };

  const register = async (name, email, password, role) => {
    // In a real app, make an API call here
    setLoading(true);
    setSuccess("");
    setError("");
    const response = await axios
      .post(`${baseUrl}/auth/register`, {
        email: email,
        password: password,
        role: role,
        name: name,
      })
      .then((res) => {
        setSuccess(res.data.message);
        return res.data.message;
      })
      .catch((err) => {
        setError(err.response.data.message);
        return err.response.data.message;
      });

    setLoading(false);

    console.log("response.response.status", response);

    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("freelanceUser");
    localStorage.removeItem("userId");
  };

  const value = {
    user,
    login,
    register,
    logout,
    error,
    loading,
    success,
    setSuccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
