import Image from 'next/image'
import { Phone } from 'lucide-react'

export default function PhoneBanner() {
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4 md:mt-16">
      <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white md:flex-row">
        <div className="bg-primary relative h-[133px] rounded-t-[11px] text-white md:h-60 md:flex-1 md:rounded-s-[11px] md:rounded-t-none">
          <div className="absolute inset-y-0 start-4 z-10 flex flex-col justify-center md:start-10">
            <h2 className="text-lg font-bold whitespace-nowrap md:text-3xl">
              خرید تلفنی از <span className="text-[#082d10]">تورینو</span>
            </h2>
            <p className="mt-2 text-sm md:mt-3 md:text-lg">
              به هرکجا که میخواهید!
            </p>
          </div>
          <div className="absolute end-3 bottom-0 aspect-square w-[52%] md:inset-y-0 md:end-0 md:aspect-auto md:h-full md:w-[45%]">
            <Image
              src="/images/home/phone-banner.png"
              alt="خرید تلفنی"
              fill
              sizes="(min-width: 768px) 40vw, 55vw"
              className="object-cover object-bottom md:object-contain md:object-left-bottom"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 p-4 md:w-72 md:flex-col md:justify-center md:gap-4">
          <p className="flex items-center gap-2 text-xl font-bold">
            <bdi dir="ltr">۰۲۱-۱۸۴۰</bdi>
            <Phone size={20} />
          </p>
          <span className="bg-primary-dark rounded-lg px-6 py-3 text-sm text-white">
            اطلاعات بیشتر
          </span>
        </div>
      </div>
    </section>
  )
}
