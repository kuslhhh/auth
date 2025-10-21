"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function () {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const { register } = useAuth()
   const router = useRouter()
   const [error, setError] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         await register(email, password, name)
         router.push("/dashboard")
      } catch {
         setError("Registration failed")
      }
   };

   return (
      <div
         className='bg-[#1a1a1a] p-4 rounded-t-2xl border-b-2 border-white'
      >
         <form
            onSubmit={handleSubmit}
            className='flex flex-col text-center'
         >
            <h1 className='text-2xl'>Login Form</h1>
            {error && (
               <p>{error}</p>
            )}
            <input
               className='border-b-2 border-white outline-0 '
               type="email"
               placeholder='Email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />

            <input
               type="password"
               placeholder='Password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />

            <button
               type='submit'
            >
               Login
            </button>

            <p>
               Dont have an account?
               <a href="/register">
                  register
               </a>
            </p>
         </form>
      </div>
   )
}
