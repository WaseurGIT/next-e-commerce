"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import axiosSecure from "./axiosSecure";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profilePicture: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosSecure.get("/me", {
        withCredentials: true,
      });
      setUser(res.data);
      return res.data;
    } catch (error) {
      setUser(null);
      return null;
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
        return await fetchUser();
      }
      return null;
    } catch (error) {
      console.error("login error", error);
      return null;
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
        setUser(res.data.user);
        return res.data.user;
      }
      return null;
    } catch (error) {
      console.error("register error", error);
      return null;
    }
  };

  const logout = async () => {
    await axiosSecure.post("/logout");
    setUser(null);
    router.push("/");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
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
