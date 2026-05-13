"use client";

import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import axiosSecure from "./axiosSecure";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
// axios.defaults.withCredentials = true;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosSecure.get("/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
      console.error("fetch user error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosSecure.post("/login", {
        email,
        password,
      });

      if (res.data.success) {
        await fetchUser();
        return true;
      }
      return false;
    } catch (error) {
      console.error("login error", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axiosSecure.post("/users", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        await fetchUser();
        return true;
      }
      return false;
    } catch (error) {
      console.error("register error", error);
      return false;
    }
  };

  const logout = async () => {
    await axiosSecure.post("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
