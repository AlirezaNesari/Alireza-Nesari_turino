import type { Metadata } from 'next'
import Link from 'next/link'
import { Bus, Globe, Headset, Plane, ShieldCheck, Trees } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import { btnPrimary } from '@/components/ui/styles'

export const metadata: Metadata = { title: 'خدمات گردشگری' }

const services = [
  {
    icon: Bus,
    title: 'تورهای داخلی',
    text: 'سفر به زیباترین نقاط ایران با برنامه‌ی مشخص و راهنمای تور.',
  },
  {
    icon: Plane,
    title: 'تورهای خارجی',
    text: 'تورهای کشورهای همسایه و اروپایی با حمل‌ونقل هوایی و زمینی.',
  },
  {
    icon: Trees,
    title: 'طبیعت‌گردی و تاریخی',
    text: 'تورهای ویژه برای دوستداران طبیعت، آثار تاریخی و فرهنگی.',
  },
  {
    icon: ShieldCheck,
    title: 'بیمه مسافرتی',
    text: 'بسیاری از تورها بیمه‌ی مسافرتی دارند و روی صفحه‌ی هر تور مشخص است.',
  },
  {
    icon: Headset,
    title: 'پشتیبانی',
    text: 'همراهی ۲۴ ساعته در تمامی مراحل سفر شما.',
  },
  {
    icon: Globe,
    title: 'رزرو آنلاین',
    text: 'انتخاب تور، ثبت مشخصات مسافر و خرید، همه در چند مرحله‌ی ساده.',
  },
]

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <PageHeader
        title="خدمات گردشگری"
        text="تورینو بهترین تورهای داخلی و خارجی را با قیمت مناسب و پشتیبانی کامل در اختیار شما می‌گذارد."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border border-gray-300 bg-white p-5"
          >
            <span className="bg-primary-soft text-primary-dark grid size-11 place-items-center rounded-lg">
              <Icon size={22} />
            </span>
            <h2 className="mt-4 font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-gray-600">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className={btnPrimary}>
          مشاهده‌ی تورها
        </Link>
      </div>
    </div>
  )
}
