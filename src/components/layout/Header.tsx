'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, LogOut, Menu, User as UserIcon, X } from 'lucide-react'
import { toast } from 'sonner'
import { useMe } from '@/hooks/useMe'
import { useAuthModal } from '@/store/useAuthModal'
import { logout } from '@/services/auth'
import { toFa } from '@/utils/digits'

const links = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/services', label: 'خدمات گردشگری' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
]

export default function Header() {
  const pathname = usePathname()
  const [menu, setMenu] = useState(false)

  return (
    <header className="bg-white md:border-b md:border-gray-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4">
        <button
          className="text-primary-dark md:hidden"
          onClick={() => setMenu((m) => !m)}
          aria-label="منو"
        >
          {menu ? <X /> : <Menu />}
        </button>
        <Link href="/" className="hidden md:block">
          <Image
            src="/images/logo.svg"
            alt="تورینو"
            width={120}
            height={32}
            priority
          />
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname === l.href ? 'text-primary' : 'hover:text-primary'
              }
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
        <nav className="flex flex-col gap-4 border-t border-gray-100 px-4 py-4 text-sm md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

function AuthArea() {
  const { data: user, isPending } = useMe()
  const show = useAuthModal((s) => s.show)
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)

  const out = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.setQueryData(['me'], null)
      setOpen(false)
      toast.success('از حساب کاربری خارج شدید')
    },
  })

  if (isPending)
    return <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />

  if (!user)
    return (
      <button
        onClick={show}
        aria-label="ورود | ثبت نام"
        className="border-primary text-primary flex items-center gap-2 rounded-lg border p-2 text-sm font-medium md:px-4 md:py-1.5"
      >
        <Image
          src="/icons/login.svg"
          alt=""
          width={20}
          height={20}
          className="md:hidden"
        />
        <UserIcon size={16} className="hidden md:block" />
        <span className="hidden md:inline">ورود | ثبت نام</span>
      </button>
    )

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-primary flex items-center gap-2 text-sm"
      >
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
