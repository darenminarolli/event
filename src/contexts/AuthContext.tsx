import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types/user";
import api from "../services/api";
import { AuthService } from "../services/AuthService";

interface AuthContextType {
  user?: User | null;
  isAuthenticated: boolean;
  login: ({}: LoginData) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginData {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
 
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({ email, password }: LoginData) => {
    try {
      const dataToSend = { email, password };
      const response = await AuthService.loginUser(dataToSend);
      const { user } = response;
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to login", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logoutUser();
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login'
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
