'use client'
import Image from 'next/image'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-6 px-4 py-8 md:flex-row md:justify-center md:gap-24 md:py-10">
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
        className="h-auto w-52 md:w-72"
      />
    </section>
  )
}
