'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, CircleHelp } from 'lucide-react'
import { toFa } from '@/utils/digits'


const slides = [
  { title: 'تور طبیعت گردی و تاریخی', text: 'اگر دوست دارید در دل طبیعت چادر بزنید یا از جاذبه‌های تاریخی و گردشگری دیدن کنید، تورهای طبیعت‌گردی و تاریخی را از تورینو بخرید.', image: '/images/home/why/why-1.png' },
  { title: 'تورهای متنوع', text: 'متن اسلاید دوم را از فیگما جایگزین کن.', image: '/images/home/why/why-2.png' },
  { title: 'قیمت مناسب', text: 'متن اسلاید سوم را از فیگما جایگزین کن.', image: '/images/home/why/why-3.png' },
  { title: 'پشتیبانی ۲۴ ساعته', text: 'متن اسلاید چهارم را از فیگما جایگزین کن.', image: '/images/home/why/why-4.png' },
]

export default function WhyTurino() {
  const [i, setI] = useState(0)
  const s = slides[i]
  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length)

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <CircleHelp className="text-primary" />
            چرا <span className="text-primary">تورینو</span>؟
          </h2>
          <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
          <p className="mt-3 leading-8 text-gray-600">{s.text}</p>
        </div>
        <div>
          <div className="relative h-72 w-full overflow-hidden rounded-3xl md:h-80">
            <Image src={s.image} alt={s.title} fill className="object-cover" />
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <button onClick={() => go(-1)} aria-label="قبلی" className="rounded-full p-1 hover:bg-gray-100">
              <ChevronRight />
            </button>
            <span>
              {toFa(String(i + 1))} / {toFa(String(slides.length))}
            </span>
            <button onClick={() => go(1)} aria-label="بعدی" className="rounded-full p-1 hover:bg-gray-100">
              <ChevronLeft />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}