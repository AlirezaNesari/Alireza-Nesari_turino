'use client'
import { useQuery } from '@tanstack/react-query'
import { Map } from 'lucide-react'
import { cityName, getVehicle } from '@/constants/tour'
import { getUserTours } from '@/services/tours'
import { formatJalaliFull } from '@/utils/date'
import { formatPrice, shortId } from '@/utils/format'
import type { UserTour } from '@/types/tour'

export default function MyTours() {
  const { data, isPending, isError } = useQuery({ queryKey: ['userTours'], queryFn: getUserTours })

  if (isPending) return <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
  if (isError) return <p className="py-10 text-center text-red-600">خطا در دریافت تورها.</p>
  if (!data.length) return <p className="rounded-xl bg-gray-50 py-12 text-center text-gray-500">هنوز توری خریداری نکرده‌اید.</p>

  return (
    <ul className="space-y-4">
      {[...data].reverse().map((t, i) => (
        <TourRow key={`${t.id}-${i}`} t={t} />
      ))}
    </ul>
  )
}

function TourRow({ t }: { t: UserTour }) {
  const vehicle = getVehicle(t.fleetVehicle)
  return (
    <li className="rounded-xl border border-gray-200 bg-white text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 p-4">
        <span className="flex items-center gap-2 font-medium">
          <Map size={16} />
          {t.title}
        </span>
        <span className="flex items-center gap-2">
          <vehicle.icon size={16} />
          سفر با {vehicle.label}
        </span>
        <span
          className={`rounded-full px-3 py-0.5 text-xs ${t.ended ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
        >
          {t.ended ? 'به اتمام رسیده' : 'در حال برگزاری'}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-1 px-4 pb-4 text-gray-600">
        <span>
          <b className="text-gray-900">
            {cityName(t.origin)} به {cityName(t.destination)}
          </b>{' '}
          · {formatJalaliFull(t.startDate)}
        </span>
        <span>
          <b className="text-gray-900">تاریخ برگشت</b> · {formatJalaliFull(t.endDate)}
        </span>
      </div>
      <div className="flex flex-wrap gap-8 border-t border-gray-100 px-4 py-3 text-gray-500">
        <span>
          شماره تور <b className="text-gray-900">{shortId(t.id)}</b>
        </span>
        <span>
          مبلغ پرداخت شده <b className="text-gray-900">{formatPrice(t.price)}</b> تومان
        </span>
      </div>
    </li>
  )
}