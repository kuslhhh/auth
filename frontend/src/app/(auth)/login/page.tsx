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
         router.push("/login")
      } catch {
         setError("Registration failed")
      }
   };

   return (
      <div>
         <h1 className='text-2xl'>Login Form</h1>
         <form
            onSubmit={handleSubmit}
         >


         </form>
      </div>
   )
}
