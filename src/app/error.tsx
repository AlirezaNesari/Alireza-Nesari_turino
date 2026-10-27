'use client'
import Image from 'next/image'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 md:flex-row md:justify-center md:gap-24">
      <div className="text-center md:text-start">
        <h1 className="text-2xl font-bold">اتصال با سرور برقرار نیست!</h1>
        <p className="mt-4">لطفا بعدا دوباره امتحان کنید.</p>
        <button onClick={reset} className="mt-8 rounded-xl bg-primary-soft px-10 py-3 text-primary">
          تلاش مجدد
        </button>
      </div>
      <Image src="/images/server-error.png" alt="خطای سرور" width={380} height={300} />
    </section>
  )
}