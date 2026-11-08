'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { toFa } from '@/utils/digits'

const slides = [
  {
    title: 'تور طبیعت گردی و تاریخی',
    text: 'اگر دوست دارید در دل طبیعت چادر بزنید یا از جاذبه‌های تاریخی و گردشگری دیدن کنید، تورهای طبیعت‌گردی و تاریخی را از تورینو بخرید.',
    image: '/images/home/why/why-1.png',
  },
  { title: 'تورهای متنوع', text: 'متن اسلاید دوم را از فیگما جایگزین کن.', image: '/images/home/why/why-2.png' },
  { title: 'قیمت مناسب', text: 'متن اسلاید سوم را از فیگما جایگزین کن.', image: '/images/home/why/why-3.png' },
  { title: 'پشتیبانی ۲۴ ساعته', text: 'متن اسلاید چهارم را از فیگما جایگزین کن.', image: '/images/home/why/why-4.png' },
]

export default function WhyTurino() {
  const [i, setI] = useState(0)
  const s = slides[i]
  const next = slides[i + 1]
  const next2 = slides[i + 2]
  const go = (d: number) => setI((n) => Math.min(Math.max(n + d, 0), slides.length - 1))

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:mt-16">
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            <Image src="/images/home/why-icon.svg" alt="" width={36} height={36} className="size-9" />
            چرا <span className="text-primary">تورینو</span> ؟
          </h2>
          <div className="hidden md:block">
            <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
            <p className="mt-3 leading-8 text-gray-600">{s.text}</p>
          </div>
        </div>

        <div>
          <div className="relative h-48 w-full md:h-80">
            {next2 && <Peek src={next2.image} className="end-0 top-[12%] z-0 h-[76%] w-[36%]" />}
            {next && <Peek src={next.image} className="end-[6%] top-[6%] z-10 h-[88%] w-[40%]" />}
            <div className="absolute start-0 top-0 z-20 h-full w-[78%] overflow-hidden rounded-3xl">
              <Image src={s.image} alt={s.title} fill className="object-cover" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-6 text-sm">
            <button
              onClick={() => go(1)}
              disabled={i === slides.length - 1}
              aria-label="بعدی"
              className="text-primary-dark disabled:text-gray-300"
            >
              <ArrowRight />
            </button>
            <bdi dir="ltr">
              {toFa(String(i + 1))} / {toFa(String(slides.length))}
            </bdi>
            <button
              onClick={() => go(-1)}
              disabled={i === 0}
              aria-label="قبلی"
              className="text-primary-dark disabled:text-gray-300"
            >
              <ArrowLeft />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Peek({ src, className }: { src: string; className: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-3xl ${className}`}>
      <Image src={src} alt="" fill className="object-cover brightness-90" />
    </div>
  )
}