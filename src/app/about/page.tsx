import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import { btnPrimary } from '@/components/ui/styles'

export const metadata: Metadata = { title: 'درباره ما' }

const values = [
  'قیمت شفاف و بدون هزینه‌ی پنهان',
  'تورهای متنوع داخلی و خارجی',
  'خرید آنلاین ساده و سریع',
  'پشتیبانی در تمام مراحل سفر',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="درباره‌ی تورینو"
        text="تورینو سامانه‌ی رزرو آنلاین تورهای گردشگری است؛ از انتخاب مقصد تا خرید نهایی، همه‌چیز را یک‌جا و ساده انجام دهید."
      />
      <div className="rounded-xl border border-gray-300 bg-white p-6">
        <h2 className="font-bold">چرا تورینو؟</h2>
        <ul className="mt-4 space-y-3 text-gray-600">
          {values.map((v) => (
            <li key={v} className="flex items-center gap-2">
              <span className="bg-primary size-2 rounded-full" />
              {v}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className={btnPrimary}>
          شروع انتخاب تور
        </Link>
      </div>
    </div>
  )
}
