import Providers from '@/components/Providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LoginModal from '@/components/auth/LoginModal'
// ...
<body className="flex min-h-dvh flex-col font-sans">
  <Providers>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <LoginModal />
  </Providers>
</body>