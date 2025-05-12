import { createContext, useContext, useState, useEffect } from "react";
import { getMe, login } from "../api/authRequests.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const setLogin = async (userData) => {
    try {
      const response = await login(userData);
      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      await getUserData();
      console.log("User logged in successfully");
    } catch (error) {
      console.log({ error: error.message });
      return { error: error.message };
    }
  };

  const setLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getUserData = async () => {
    try {
      const response = await getMe();
      if (response.status === 200) {
        setUser(response.data);
        navigate("/events");
        return response.data;
      }
    } catch (error) {
      console.log({ error: error.message });
    }
    return null;
  };

  useEffect(() => {
    const init = async () => {
      if (!token) {
        navigate("/");
        setLoading(false);
        return;
      }

      const user = await getUserData();
      if (!user) {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
      }

      setLoading(false);
    };

    init();
  }, []);

  window.addEventListener("unauthorized", () => {
    setLogout();
  });

  return (
    <AuthContext.Provider value={{ user, setLogin, setLogout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

// auth context function:
// load active user
//save token to local storage after login
//remove token after logout or token is expired
//load user data after refresh or page load.
