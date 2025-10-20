"use client";

import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
   const { user, loading } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!loading && !user) {
         router.push("/login");
      }
   }, [loading, user]);

   if (loading) return <p>Loading...</p>;
   if (!user) return null

   return (
      <div>
         <h1>Welcome, {user.email}</h1>
         <p>Role: {user.role}</p>
      </div>
   );
}
