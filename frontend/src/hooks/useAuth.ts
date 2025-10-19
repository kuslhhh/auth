import { useState, useEffect } from "react";
import { api } from "../lib/api";
import type { User } from "../types/auth";

export const useAuth = () => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   const fetchMe = async () => {
      try {
         const { data } = await api.get("/user/me", {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
         });
         setUser(data.user);
      } catch (err) {
         setUser(null);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchMe();
   }, []);

   const login = async (email: string, password: string) => {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
   };

   const logout = async () => {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      setUser(null);
   };

   const register = async (email: string, password: string, name?: string) => {
      await api.post("/auth/register", { email, password, name });
   };

   return { user, loading, login, logout, register, fetchMe };
};
