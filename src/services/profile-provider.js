import axios from "axios";
import { createContext, useContext, useState } from "react";

// Auth context
const ProfileContext = createContext();

const url = "http://localhost:5000/api";

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated API calls
  const login = async (email, password) => {
    // In a real app, make an API call here
    const response = await axios.post(`${url}/auth/login`, {
      username: email,
      password: password,
    });

    localStorage.setItem("token", response.data.token);
    console.log("response", response);
    setUser(response.data.user);
    return response;
  };

  const value = { user, login };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
