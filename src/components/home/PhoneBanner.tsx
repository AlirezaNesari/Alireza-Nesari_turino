import Image from 'next/image'
import { Phone } from 'lucide-react'

export default function PhoneBanner() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="flex flex-col items-center gap-6 overflow-hidden rounded-xl bg-primary px-6 pt-6 text-white md:flex-row md:justify-between md:px-10 md:pt-0">
        <div className="text-center md:text-start">
          <h2 className="text-3xl font-bold">خرید تلفنی از تورینو</h2>
          <p className="mt-2 text-lg">به هرکجا که میخواهید!</p>
        </div>
        <Image
          src="/images/home/phone-banner.png"
          alt="خرید تلفنی"
          width={320}
          height={240}
          className="h-auto w-56 self-end md:w-72"
        />
        <div className="mb-6 flex flex-col items-center gap-3 rounded-lg bg-white p-4 text-gray-800 md:mb-0">
          <p className="flex items-center gap-2 font-bold">
            <Phone size={18} /> ۰۲۱-۱۸۴۰
          </p>
          <span className="rounded bg-primary-dark px-4 py-1.5 text-sm text-white">اطلاعات بیشتر</span>
        </div>
      </div>
    </section>
  )
}