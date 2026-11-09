'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { PageLoader } from '@/components/ui/Loaders'
import { EmptyState, ErrorState } from '@/components/ui/States'
import { btnOutline } from '@/components/ui/styles'
import { getTransactions } from '@/services/tours'
import { formatDateTime } from '@/utils/date'
import { getErrorMessage } from '@/utils/error'
import { formatPrice, shortId } from '@/utils/format'

const TYPES: Record<string, string> = { Purchase: 'ثبت نام در تور گردشگری' }
const PAGE = 10

export default function Transactions() {
  const [count, setCount] = useState(PAGE)
  const { data, error, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  useEffect(() => {
    if (error)
      toast.error(getErrorMessage(error), { toastId: 'transactions-error' })
  }, [error])

  if (isPending) return <PageLoader label="در حال دریافت تراکنش‌ها..." />
  if (isError)
    return (
      <ErrorState
        message="خطا در دریافت تراکنش‌ها."
        onRetry={() => refetch()}
        retrying={isRefetching}
      />
    )
  if (!data.length) return <EmptyState message="تراکنشی ثبت نشده است." />

  const rows = [...data].reverse()

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-3 text-start font-medium sm:px-4">
                تاریخ و ساعت
              </th>
              <th className="px-3 py-3 text-start font-medium sm:px-4">
                مبلغ (تومان)
              </th>
              <th className="hidden px-4 py-3 text-start font-medium sm:table-cell">
                نوع تراکنش
              </th>
              <th className="px-3 py-3 text-start font-medium sm:px-4">
                شماره سفارش
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, count).map((t) => (
              <tr key={t.id} className="border-t border-gray-100">
                <td className="px-3 py-3 whitespace-nowrap sm:px-4">
                  {formatDateTime(t.createdAt)}
                </td>
                <td className="px-3 py-3 sm:px-4">{formatPrice(t.amount)}</td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  {TYPES[t.type] ?? t.type}
                </td>
                <td className="px-3 py-3 sm:px-4">{shortId(t.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {count < rows.length && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setCount((c) => c + PAGE)}
            className={btnOutline}
          >
            نمایش بیشتر
          </button>
        </div>
      )}
    </div>
  )
}
