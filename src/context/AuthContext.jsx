import { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken, removeToken, getUser, saveUser, removeUser } from "../../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  //called after login(Both Save token & user to localstorage and set in context)
  const login = (token, user) => {
    saveToken(token);
    saveUser(user);
    setToken(token);
    setUser(user);
  };

  //For clear all credentials and token
  const logout = () => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

//Using this custom hook we can access auth data easily in any components
export const useAuth = () => useContext(AuthContext);
