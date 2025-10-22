"use client";

import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
   const { user, loading, logout } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!loading && !user) {
         router.push("/login");
      }
   }, [loading, user]);

   if (loading) return <p>Loading...</p>;
   if (!user) return null

   const handleLogout = async () => {
      try {
         await logout();
         router.push("/login");
      } catch (error) {
         console.error("Logout error:", error);
      }
   };

   return (
      <div className="p-8">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Welcome, {user.name || user.email}</h1>
            <button 
               onClick={handleLogout}
               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
               Logout
            </button>
         </div>
         <div className="bg-zinc-800 p-4 rounded-lg">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
         </div>
      </div>
   );
}
