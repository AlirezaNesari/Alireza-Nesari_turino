import Image from 'next/image'

const cols = [
  {
    title: 'تورینو',
    items: ['درباره ما', 'تماس با ما', 'چرا تورینو', 'بیمه مسافرتی'],
  },
  {
    title: 'خدمات مشتریان',
    items: [
      'پشتیبانی آنلاین',
      'راهنمای خرید',
      'راهنمای استرداد',
      'پرسش و پاسخ',
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-16 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-dashed border-gray-300 py-8 md:grid-cols-[auto_auto_1fr] md:gap-x-24 md:border-solid md:border-gray-200">
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

          <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-1 md:flex-col md:items-end md:justify-self-end">
            <div className="flex w-36 flex-wrap items-center justify-center gap-2 md:order-2 md:mt-4 md:w-auto md:flex-nowrap md:gap-3">
              <Image
                src="/images/badges/qr.png"
                alt="کد QR"
                width={80}
                height={80}
                className="order-1 h-9 w-9 object-contain md:order-3 md:h-12 md:w-auto"
              />
              <Image
                src="/images/badges/samandehi.png"
                alt="نماد ساماندهی"
                width={80}
                height={80}
                className="order-2 h-9 w-9 object-contain md:order-4 md:h-12 md:w-auto"
              />
              <Image
                src="/images/badges/aira.png"
                alt="دامنه نرخ بلیط شرکت‌های هواپیمایی"
                width={80}
                height={80}
                className="order-3 h-9 w-9 object-contain md:order-5 md:h-12 md:w-auto"
              />
              <Image
                src="/images/badges/caa.png"
                alt="سازمان هواپیمایی کشوری"
                width={80}
                height={80}
                className="order-4 h-9 w-9 object-contain md:order-1 md:h-12 md:w-auto"
              />
              <Image
                src="/images/badges/passenger-rights.png"
                alt="حقوق مسافر"
                width={80}
                height={80}
                className="order-5 h-9 w-9 object-contain md:order-2 md:h-12 md:w-auto"
              />
            </div>

            {/* لوگو و تلفن */}
            <div className="md:order-1">
              <Image
                src="/images/logo.svg"
                alt="تورینو"
                width={120}
                height={32}
              />
              <p className="mt-3 text-sm whitespace-nowrap">
                تلفن پشتیبانی:۰۲۱۸۵۷۴
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="border-t border-gray-200 py-3 text-center text-xs text-gray-500">
        کلیه حقوق این وب سایت متعلق به تورینو میباشد.
      </p>
    </footer>
  )
}
