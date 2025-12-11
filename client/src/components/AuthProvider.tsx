import { createContext, useContext, useState, useEffect } from "react";
import { type User, type UserCreateDTO, type UserLoginDTO } from "../schemas/DbSchema";
import { api } from "../api/axios";
import { setUserRefreshHandler } from "../api/axios";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  updateUser: (user: User | null) => void;  
  register: (data: UserCreateDTO, setError: React.Dispatch<React.SetStateAction<string | null>>) =>  Promise<boolean>;
  login: (data: UserLoginDTO, setError: React.Dispatch<React.SetStateAction<string | null>>) =>  Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const res = await api.get("/me");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setUserRefreshHandler((newUser) => setUser(newUser));  
    fetchUser();
  }, []);

  async function register(data: UserCreateDTO, setError: React.Dispatch<React.SetStateAction<string | null>>) {
    try {
      const res = await api.post("/register", data);
      console.log("Register:", res.data);
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || "Register failed.";
      console.error("Register error:", msg);
      setError(msg);
      return false;
    }
  }

  async function login(data: UserLoginDTO, setError: React.Dispatch<React.SetStateAction<string | null>>) {
    try {
      const res = await api.post("/login", data);
      setUser(res.data);
      console.log("Logged in:", res.data);
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || "Login failed.";
      console.error("Login error:", msg);
      setError(msg);
      return false;
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
      console.error("Logged out");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || "Logout failed.";
      console.error("Logout failed:", msg);
    } finally {
      setUser(null); 
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, updateUser: setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
