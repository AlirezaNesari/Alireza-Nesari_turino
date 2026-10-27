import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LoginModal from '@/components/auth/LoginModal'

const vazir = localFont({
  src: '../assets/fonts/Vazirmatn-variable.woff2',
  variable: '--font-vazir',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'تورینو | برگزارکننده بهترین تورهای داخلی و خارجی',
    template: '%s | تورینو',
  },
  description: 'رزرو آنلاین تورهای داخلی و خارجی با تورینو',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="flex min-h-dvh flex-col font-sans">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <LoginModal />
        </Providers>
      </body>
    </html>
  )
}
