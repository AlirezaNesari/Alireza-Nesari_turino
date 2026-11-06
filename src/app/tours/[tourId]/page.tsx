import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BadgeCheck, CalendarCheck, CalendarDays, MapPin, ShieldCheck, Users } from 'lucide-react'
import { getTour, getTours } from '@/lib/api'
import ReserveButton from '@/components/tour/ReserveButton'
import { cityName, getVehicle } from '@/constants/tour'
import { formatJalaliLong, tourDuration } from '@/utils/date'
import { formatPrice } from '@/utils/format'
import { toFa } from '@/utils/digits'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const tours = await getTours()
    return tours.map((t) => ({ tourId: t.id }))
  } catch {
    return [] 
  }
}

type Props = { params: Promise<{ tourId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tourId } = await params
  const tour = await getTour(tourId)
  return { title: tour?.title ?? 'تور' }
}

export default async function TourPage({ params }: Props) {
  const { tourId } = await params
  const tour = await getTour(tourId)
  if (!tour) notFound()

  const vehicle = getVehicle(tour.fleetVehicle)
  const { days, nights } = tourDuration(tour.startDate, tour.endDate)
  const info = [
    { icon: MapPin, label: 'مبدا', value: cityName(tour.origin) },
    { icon: CalendarDays, label: 'تاریخ رفت', value: formatJalaliLong(tour.startDate) },
    { icon: CalendarCheck, label: 'تاریخ برگشت', value: formatJalaliLong(tour.endDate) },
    { icon: vehicle.icon, label: 'حمل و نقل', value: vehicle.label },
    { icon: Users, label: 'ظرفیت', value: `حداکثر ${toFa(String(tour.availableSeats))} نفر` },
    { icon: ShieldCheck, label: 'بیمه', value: tour.insurance ? 'دارای بیمه' : 'بدون بیمه' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl md:w-80">
            <Image src={tour.image} alt={tour.title} fill unoptimized priority className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="text-2xl font-bold">{tour.title}</h1>
            <p className="mt-2 text-gray-500">
              {toFa(String(days))} روز و {toFa(String(nights))} شب
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              {tour.options.map((o) => (
                <li key={o} className="flex items-center gap-1">
                  <BadgeCheck size={16} className="text-primary" />
                  {o}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
              <p>
                <span className="text-2xl font-bold text-sky-600">{formatPrice(tour.price)}</span>{' '}
                <span className="text-xs text-gray-500">تومان</span>
              </p>
              <ReserveButton tourId={tour.id} soldOut={tour.availableSeats <= 0} />
            </div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-y-4 border-t border-gray-200 pt-4 md:grid-cols-6">
          {info.map((item) => (
            <div key={item.label} className="border-gray-200 px-3 md:border-e md:last:border-e-0">
              <dt className="flex items-center gap-1 text-sm text-gray-500">
                <item.icon size={16} />
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-bold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}