import Image from 'next/image'
import { getTours } from '@/lib/api'
import SearchForm from '@/components/home/SearchForm'
import PhoneBanner from '@/components/home/PhoneBanner'
import WhyTurino from '@/components/home/WhyTurino'
import Features from '@/components/home/Features'
import TourCard from '@/components/tour/TourCard'

type SearchParams = Promise<Record<string, string | string[] | undefined>>
const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParams
  const filters = {
    originId: pick(sp.originId),
    destinationId: pick(sp.destinationId),
    startDate: pick(sp.startDate),
    endDate: pick(sp.endDate),
  }
  const tours = await getTours(filters)
  return (
    <>
      <Image
        src="/images/home/hero.png"
        alt=""
        width={1200}
        height={400}
        priority
        sizes="100vw"
        className="h-auto w-full md:h-80 md:object-cover"
      />

      <section className="mx-auto max-w-7xl px-4">
        <h1 className="mt-8 text-center text-lg font-bold md:text-xl">
          <span className="text-primary">تورینو</span> برگزار کننده بهترین تور
          های داخلی و خارجی
        </h1>
        <SearchForm key={JSON.stringify(filters)} initial={filters} />

        <h2 className="mt-12 mb-6 text-xl font-bold">همه تورها</h2>
        {tours.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 py-12 text-center text-gray-500">
            توری با این مشخصات پیدا نشد.
          </p>
        )}
      </section>

      <PhoneBanner />
      <WhyTurino />
      <Features />
    </>
  )
}
