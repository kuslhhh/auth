"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

export default function RegisterPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const { register } = useAuth();
   const router = useRouter();
   const [error, setError] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await register(email, password, name);
         router.push("/login");
      } catch {
         setError("Registration failed");
      }
   };

   return (
      <div >
         <form
            onSubmit={handleSubmit}
         >
            <h1 >Register</h1>
            {error && (
               <p >{error}</p>
            )}
            <input
               type="text"
               placeholder="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
            <button
               type="submit"
            >
               Register
            </button>
            <p
            >
               Already have an account?{" "}
               <a href="/login" className="text-blue-400 hover:underline">
                  Login
               </a>
            </p>
         </form>
      </div>
   );
}
