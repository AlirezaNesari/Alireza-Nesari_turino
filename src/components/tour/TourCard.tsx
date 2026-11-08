import Image from 'next/image'
import Link from 'next/link'
import type { Tour } from '@/types/tour'
import { getVehicle } from '@/constants/tour'
import { monthName, tourDuration } from '@/utils/date'
import { formatPrice } from '@/utils/format'
import { toFa } from '@/utils/digits'

export default function TourCard({ tour }: { tour: Tour }) {
  const { days } = tourDuration(tour.startDate, tour.endDate)
  const info = `${monthName(tour.startDate)} ماه · ${toFa(String(days))} روزه · ${getVehicle(tour.fleetVehicle).label}${tour.insurance ? ' · بیمه' : ''}`

  return (
    <Link
      href={`/tours/${tour.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
    >
      <div className="relative h-40 w-full">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="flex-1 p-3">
        <h3 className="text-lg font-medium">{tour.title}</h3>
        <p className="mt-2 text-xs text-gray-500">{info}</p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 p-3">
        <span className="bg-primary rounded px-4 py-1 text-sm text-white">
          رزرو
        </span>
        <p>
          <span className="font-bold text-sky-600">
            {formatPrice(tour.price)}
          </span>{' '}
          <span className="text-xs text-gray-500">تومان</span>
        </p>
      </div>
    </Link>
  )
}
