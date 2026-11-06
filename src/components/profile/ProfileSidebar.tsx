'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeftRight, Luggage, User } from 'lucide-react'

const items = [
  { href: '/profile', label: 'پروفایل', icon: User },
  { href: '/profile/tours', label: 'تورهای من', icon: Luggage },
  { href: '/profile/transactions', label: 'تراکنش‌ها', icon: ArrowLeftRight },
]

export default function ProfileSidebar() {
  const pathname = usePathname()
  return (
    <nav className="flex overflow-hidden rounded-xl border border-gray-200 bg-white text-sm md:flex-col">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 md:justify-start ${
            pathname === it.href ? 'bg-primary-soft text-primary' : 'hover:bg-gray-50'
          }`}
        >
          <it.icon size={16} />
          {it.label}
        </Link>
      ))}
    </nav>
  )
}