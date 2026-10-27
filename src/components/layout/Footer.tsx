import Image from 'next/image'

const cols = [
  { title: 'تورینو', items: ['درباره ما', 'تماس با ما', 'چرا تورینو', 'بیمه مسافرتی'] },
  { title: 'خدمات مشتریان', items: ['پشتیبانی آنلاین', 'راهنمای خرید', 'راهنمای استرداد', 'پرسش و پاسخ'] },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[1fr_auto_auto] md:gap-24">
        <div className="order-last md:order-first">
          <Image src="/images/logo.svg" alt="تورینو" width={120} height={32} />
          <p className="mt-4 text-sm">تلفن پشتیبانی: ۰۲۱-۸۵۷۴</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="mb-4 font-bold">{c.title}</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {c.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-gray-200 py-3 text-center text-xs text-gray-500">
        کلیه حقوق این وب سایت متعلق به تورینو میباشد.
      </p>
    </footer>
  )
}