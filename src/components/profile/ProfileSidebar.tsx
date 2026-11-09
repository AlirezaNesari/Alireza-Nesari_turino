'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MaskIcon from '@/components/ui/MaskIcon'

const items = [
  { href: '/profile', label: 'پروفایل', icon: '/icons/profile/user.svg' },
  { href: '/profile/tours', label: 'تورهای من', icon: '/icons/profile/tours.svg' },
  { href: '/profile/transactions', label: 'تراکنش‌ها', icon: '/icons/profile/transactions.svg' },
]

export default function ProfileSidebar() {
  const pathname = usePathname()
  return (
    <nav className="flex border-b border-gray-200 text-sm md:flex-col md:overflow-hidden md:rounded-xl md:border md:bg-white">
      {items.map((it) => {
        const active = pathname === it.href
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`-mb-px flex flex-1 items-center justify-center gap-2 border-b-2 px-2 py-3 whitespace-nowrap md:mb-0 md:flex-none md:justify-start md:border-b-0 md:px-4 ${
              active ? 'border-primary text-primary md:bg-primary-soft' : 'border-transparent hover:bg-gray-50'
            }`}
          >
            <MaskIcon src={it.icon} />
            {it.label}
          </Link>
        )
      })}
    </nav>
  )
}