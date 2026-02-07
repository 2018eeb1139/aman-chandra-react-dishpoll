import { createContext, useContext, useState, useEffect } from "react";
import users from "../data/users.json";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    try {
      const user = users.find(
        (u) => u.username === username && u.password === password,
      );

      if (user) {
        const userWithoutPassword = { id: user.id, username: user.username };
        setCurrentUser(userWithoutPassword);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userWithoutPassword),
        );
        toast.success(`Welcome back, ${user.username}!`);
        return { success: true };
      } else {
        toast.error("Invalid username or password");
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return { success: false, error: "Login failed" };
    }
  };

  const logout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
