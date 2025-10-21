"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login } = useAuth();
   const router = useRouter();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
         await login(email, password);
         router.push("/dashboard");
      } catch (err: any) {
         console.error("Login error:", err);
         setError(
            err.response?.data?.message || 
            err.message || 
            "Login failed. Please check your credentials."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className='bg-[#1a1a1a] p-4 rounded-t-2xl border-b-2 border-white'>
         <form
            onSubmit={handleSubmit}
            className='flex flex-col text-center gap-4'
         >
            <h1 className='text-2xl text-white'>Login Form</h1>
            
            {error && (
               <p className='text-red-500 text-sm bg-red-100 p-2 rounded'>{error}</p>
            )}
            
            <input
               className='border-b-2 border-white outline-0 bg-transparent text-white p-2'
               type="email"
               placeholder='Email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               disabled={loading}
            />

            <input
               className='border-b-2 border-white outline-0 bg-transparent text-white p-2'
               type="password"
               placeholder='Password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               disabled={loading}
            />

            <button
               type='submit'
               className='bg-white text-black p-2 rounded mt-4 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition'
               disabled={loading}
            >
               {loading ? "Logging in..." : "Login"}
            </button>

            <p className='text-white text-sm'>
               Don't have an account?{' '}
               <a href="/register" className='text-blue-400 underline hover:text-blue-300'>
                  Register
               </a>
            </p>
         </form>
      </div>
   );
}