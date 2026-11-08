import Image from 'next/image'

const items = [
  {
    image: '/images/home/features/feature-3.png',
    title: 'به‌صرفه‌ترین قیمت',
    text: 'به‌صرفه‌ترین و ارزان‌ترین قیمت تور را از ما بخواهید.',
  },
  {
    image: '/images/home/features/feature-2.png',
    title: 'پشتیبانی',
    text: 'پشتیبانی و همراهی ۲۴ ساعته در تمامی مراحل سفر شما.',
  },
  {
    image: '/images/home/features/feature-1.png',
    title: 'رضایت کاربران',
    text: 'رضایت بیش از ۱۰ هزار کاربر از تورهای ما.',
  },
]

export default function Features() {
  return (
    <section className="mx-auto mt-12 max-w-7xl border-t border-gray-200 px-4 pt-8 md:mt-16 md:pt-10">
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {items.map((f) => (
          <div key={f.title} className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold md:text-base">{f.title}</h3>
              <p className="mt-1 text-xs text-gray-500 md:text-sm">{f.text}</p>
            </div>
            <Image
              src={f.image}
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16"
            />
          </div>
        ))}
      </div>
    </section>
  )
}