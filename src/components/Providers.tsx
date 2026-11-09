'use client'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  )
  return (
    <QueryClientProvider client={client}>
      {children}
      <ToastContainer
        position="top-center"
        rtl
        autoClose={3500}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </QueryClientProvider>
  )
}
