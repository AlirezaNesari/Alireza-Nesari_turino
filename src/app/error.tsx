'use client'
import Image from 'next/image'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-4 py-12 md:flex-row md:justify-center md:gap-24 md:py-16">
      <div className="text-center md:text-start">
        <h1 className="text-2xl font-bold">اتصال با سرور برقرار نیست!</h1>
        <p className="mt-4">لطفا بعدا دوباره امتحان کنید.</p>
        <button
          onClick={reset}
          className="bg-primary-soft text-primary mt-8 rounded-xl px-10 py-3"
        >
          تلاش مجدد
        </button>
      </div>
      <Image
        src="/images/server-error.png"
        alt="خطای سرور"
        width={380}
        height={300}
        className="h-auto w-64 md:w-95"
      />
    </section>
  )
}
