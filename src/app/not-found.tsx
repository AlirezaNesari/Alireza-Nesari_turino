import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 md:flex-row md:justify-center md:gap-24">
      <div className="text-center md:text-start">
        <h1 className="text-2xl font-bold">صفحه مورد نظر یافت نشد!</h1>
        <Link href="/" className="mt-8 inline-block rounded-xl bg-primary-soft px-10 py-3 text-primary">
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <Image src="/images/404.png" alt="۴۰۴" width={380} height={300} priority />
    </section>
  )
}