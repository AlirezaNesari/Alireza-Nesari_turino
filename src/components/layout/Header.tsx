'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, House, LogOut, Megaphone, Menu, Phone, Plane, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useMe } from '@/hooks/useMe'
import { useAuthModal } from '@/store/useAuthModal'
import { logout } from '@/services/auth'
import { toFa } from '@/utils/digits'

const links = [
  { href: '/', label: 'صفحه اصلی', icon: House },
  { href: '/services', label: 'خدمات گردشگری', icon: Plane },
  { href: '/about', label: 'درباره ما', icon: Megaphone },
  { href: '/contact', label: 'تماس با ما', icon: Phone },
]

export default function Header() {
  const pathname = usePathname()
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menu])

  return (
    <header className="bg-white md:border-b md:border-gray-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4">
        <button
          className="text-primary-dark md:hidden"
          onClick={() => setMenu(true)}
          aria-label="منو"
        >
          <Menu />
        </button>
        <Link href="/" className="hidden md:block">
          <Image src="/images/logo.svg" alt="تورینو" width={120} height={32} priority />
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? 'text-primary' : 'hover:text-primary'}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ms-auto">
          <AuthArea />
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMenu(false)}>
          <nav
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 start-0 w-64 max-w-[70%] rounded-e-2xl bg-white pt-16 shadow-xl"
          >
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenu(false)}
                  className={`flex items-center gap-3 px-6 py-4 ${active ? 'text-primary' : ''}`}
                >
                  <Icon size={20} fill={active ? 'currentColor' : 'none'} />
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

function AuthArea() {
  const { data: user, isPending } = useMe()
  const show = useAuthModal((s) => s.show)
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const out = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.clear()
      qc.setQueryData(['me'], null)
      setOpen(false)
      toast.success('از حساب کاربری خارج شدید')
      if (pathname.startsWith('/profile') || pathname.startsWith('/checkout')) router.push('/')
    },
  })

  if (isPending) return <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />

  if (!user)
    return (
      <button
        onClick={show}
        aria-label="ورود | ثبت نام"
        className="border-primary text-primary flex items-center gap-2 rounded-lg border p-2 text-sm font-medium md:px-4 md:py-1.5"
      >
        <Image src="/icons/login.svg" alt="" width={20} height={20} className="md:hidden" />
        <UserIcon size={16} className="hidden md:block" />
        <span className="hidden md:inline">ورود | ثبت نام</span>
      </button>
    )

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="text-primary flex items-center gap-2 text-sm">
        <UserIcon size={16} />
        {toFa(user.mobile)}
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute start-0 top-full z-40 mt-2 w-52 rounded-lg border border-gray-200 bg-white text-sm shadow-lg">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
          >
            <UserIcon size={16} />
            اطلاعات حساب کاربری
          </Link>
          <button
            onClick={() => out.mutate()}
            className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-3 text-red-600 hover:bg-gray-50"
          >
            <LogOut size={16} />
            خروج از حساب کاربری
          </button>
        </div>
      )}
    </div>
  )
}