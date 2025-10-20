import React from 'react'

export default function Layout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className='min-h-screen items-center justify-center flex'>
         {children}
      </div>
   )
}
