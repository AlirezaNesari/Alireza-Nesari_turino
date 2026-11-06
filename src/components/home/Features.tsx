import Image from 'next/image'

// متن‌ها را از فیگما کپی کن
const items = [
  { image: '/images/home/features/feature-1.png', title: 'رضایت کاربران', text: 'رضایت بیش از ۹۰ درصد کاربران از خرید تور' },
  { image: '/images/home/features/feature-2.png', title: 'پشتیبانی', text: 'پشتیبانی و همراهی ۲۴ ساعته در تمام مراحل سفر' },
  { image: '/images/home/features/feature-3.png', title: 'به‌صرفه‌ترین قیمت', text: 'بهترین قیمت تور را از تورینو بخواهید' },
]

export default function Features() {
  return (
    <section className="mx-auto mt-16 grid max-w-7xl gap-6 border-t border-gray-200 px-4 pt-10 md:grid-cols-3">
      {items.map((f) => (
        <div key={f.title} className="flex items-center gap-4">
          <Image src={f.image} alt="" width={64} height={64} className="h-16 w-16 object-contain" />
          <div>
            <h3 className="font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{f.text}</p>
          </div>
        </div>
      ))}
    </section>
  )
}