import Image from 'next/image'
import { Phone } from 'lucide-react'

export default function PhoneBanner() {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:mt-16">
      <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white md:flex-row">
        <div className="bg-primary relative h-48 flex-1 p-5 text-white md:h-60 md:px-10 md:py-0">
          <div className="relative z-10 max-w-[48%] md:flex md:h-full md:max-w-[45%] md:flex-col md:justify-center">
            <h2 className="text-xl leading-9 font-bold md:text-3xl">
              خرید تلفنی از <span className="text-primary-dark">تورینو</span>
            </h2>
            <p className="mt-2 text-sm md:mt-3 md:text-lg">به هرکجا که میخواهید!</p>
          </div>
          <div className="absolute inset-y-0 end-0 w-[52%] md:w-[45%]">
            <Image
              src="/images/home/phone-banner.png"
              alt="خرید تلفنی"
              fill
              className="object-contain object-left-bottom"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 p-4 md:w-72 md:flex-col md:justify-center md:gap-4">
          <p className="flex items-center gap-2 text-xl font-bold">
            <bdi dir="ltr">۰۲۱-۱۸۴۰</bdi>
            <Phone size={20} />
          </p>
          <span className="bg-primary-dark rounded-lg px-6 py-3 text-sm text-white">اطلاعات بیشتر</span>
        </div>
      </div>
    </section>
  )
}