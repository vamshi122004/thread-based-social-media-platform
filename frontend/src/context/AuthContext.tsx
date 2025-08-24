import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuths = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Configure axios interceptors
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // TODO: Verify token with backend
      // For now, we'll simulate a logged-in user
      setUser({
        id: "1",
        username: "demo_user",
        email: "demo@example.com",
        role: "user",
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/login', { email, password });

      // Simulate login for demo
      const mockUser = {
        id: "1",
        username: email.split("@")[0],
        email,
        role:
          email === "admin@example.com"
            ? ("admin" as const)
            : ("user" as const),
      };

      localStorage.setItem("token", "mock-jwt-token");
      setUser(mockUser);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/register', { username, email, password });

      // Simulate registration for demo
      const mockUser = {
        id: "1",
        username,
        email,
        role: "user" as const,
      };

      localStorage.setItem("token", "mock-jwt-token");
      setUser(mockUser);
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
