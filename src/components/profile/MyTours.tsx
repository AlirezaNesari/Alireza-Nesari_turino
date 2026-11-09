'use client'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { PageLoader } from '@/components/ui/Loaders'
import MaskIcon from '@/components/ui/MaskIcon'
import { EmptyState, ErrorState } from '@/components/ui/States'
import { cityName, getVehicle } from '@/constants/tour'
import { getUserTours } from '@/services/tours'
import { formatJalaliFull } from '@/utils/date'
import { getErrorMessage } from '@/utils/error'
import { formatPrice, shortId } from '@/utils/format'
import type { UserTour } from '@/types/tour'

const VEHICLE_ICONS: Record<string, string> = {
  airplane: '/icons/vehicles/airplane.svg',
  ship: '/icons/vehicles/ship.svg',
  bus: '/icons/vehicles/bus.svg',
}

export default function MyTours() {
  const { data, error, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: ['userTours'],
    queryFn: getUserTours,
  })

  useEffect(() => {
    if (error) toast.error(getErrorMessage(error), { toastId: 'tours-error' })
  }, [error])

  if (isPending) return <PageLoader label="در حال دریافت تورهای شما..." />
  if (isError) return <ErrorState message="خطا در دریافت تورها." onRetry={() => refetch()} retrying={isRefetching} />
  if (!data.length)
    return <EmptyState message="هنوز توری خریداری نکرده‌اید." href="/" action="مشاهده‌ی تورها" />

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
  const vehicleSvg = VEHICLE_ICONS[t.fleetVehicle.toLowerCase()]
  return (
    <li className="overflow-hidden rounded-xl border border-gray-200 bg-white text-xs sm:text-sm">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 pt-4">
        <span className="flex items-center gap-2 font-medium sm:text-base">
          <MaskIcon src="/icons/profile/tour.svg" />
          {t.title}
        </span>
        <span className="flex items-center gap-1.5">
          {vehicleSvg ? <MaskIcon src={vehicleSvg} /> : <vehicle.icon size={16} />}
          سفر با {vehicle.label}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] sm:text-xs ${
            t.ended ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {t.ended ? 'به اتمام رسیده' : 'در حال برگزاری'}
        </span>
      </div>

      <div className="space-y-3 px-4 py-4 text-gray-600">
        <p className="flex flex-wrap items-center gap-x-2">
          <b className="text-gray-900">
            {cityName(t.origin)} به {cityName(t.destination)}
          </b>
          <span>•</span>
          {formatJalaliFull(t.startDate)}
        </p>
        <p className="flex flex-wrap items-center gap-x-2">
          <b className="text-gray-900">تاریخ برگشت</b>
          <span>•</span>
          {formatJalaliFull(t.endDate)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-gray-500">
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