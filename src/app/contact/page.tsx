import type { Metadata } from 'next'
import { Headset, Phone } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = { title: 'تماس با ما' }

const contacts = [
  { icon: Headset, title: 'تلفن پشتیبانی', value: '۰۲۱-۸۵۷۴' },
  { icon: Phone, title: 'خرید تلفنی', value: '۰۲۱-۱۸۴۰' },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="تماس با ما"
        text="برای پرسش، راهنمایی یا خرید تلفنی با شماره‌های زیر تماس بگیرید."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map(({ icon: Icon, title, value }) => (
          <div
            key={title}
            className="flex items-center gap-4 rounded-xl border border-gray-300 bg-white p-5"
          >
            <span className="bg-primary-soft text-primary-dark grid size-12 place-items-center rounded-lg">
              <Icon size={22} />
            </span>
            <div>
              <h2 className="text-sm text-gray-500">{title}</h2>
              <p className="mt-1 text-xl font-bold">
                <bdi dir="ltr">{value}</bdi>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
