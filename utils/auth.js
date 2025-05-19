//Handle localstorage for read,write,remove
//No need to import because localStorage is a built-in browser API, available globally in the window object

// Token
export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// User
export const saveUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => {
    const user = localStorage.getItem("user");
  
    try {
      if (!user || user === "undefined") return null;
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };
  
export const removeUser = () => localStorage.removeItem("user");
