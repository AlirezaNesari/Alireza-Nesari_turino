'use client'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

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
      <Toaster position="top-center" richColors dir="rtl" />
    </QueryClientProvider>
  )
}
