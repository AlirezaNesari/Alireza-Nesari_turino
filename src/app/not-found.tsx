import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-6 px-4 py-8 md:flex-row md:justify-center md:gap-24 md:py-10">
      <div className="text-center md:text-start">
        <h1 className="text-2xl font-bold">صفحه مورد نظر یافت نشد!</h1>
        <Link
          href="/"
          className="bg-primary-soft text-primary mt-8 inline-block rounded-xl px-10 py-3"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <Image
        src="/images/404.png"
        alt="۴۰۴"
        width={380}
        height={300}
        className="h-auto w-52 md:w-72"
        priority
      />
    </section>
  )
}
