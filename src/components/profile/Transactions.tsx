'use client'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '@/services/tours'
import { formatDateTime } from '@/utils/date'
import { formatPrice, shortId } from '@/utils/format'

const TYPES: Record<string, string> = { Purchase: 'ثبت نام در تور گردشگری' }

export default function Transactions() {
  const { data, isPending, isError } = useQuery({ queryKey: ['transactions'], queryFn: getTransactions })

  if (isPending) return <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
  if (isError) return <p className="py-10 text-center text-red-600">خطا در دریافت تراکنش‌ها.</p>
  if (!data.length) return <p className="rounded-xl bg-gray-50 py-12 text-center text-gray-500">تراکنشی ثبت نشده است.</p>

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[36rem] text-sm">
        <thead className="bg-gray-100">
          <tr>
            {['تاریخ و ساعت', 'مبلغ (تومان)', 'نوع تراکنش', 'شماره سفارش'].map((h) => (
              <th key={h} className="px-4 py-3 text-start font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...data].reverse().map((t) => (
            <tr key={t.id} className="border-t border-gray-100">
              <td className="px-4 py-3">{formatDateTime(t.createdAt)}</td>
              <td className="px-4 py-3">{formatPrice(t.amount)}</td>
              <td className="px-4 py-3">{TYPES[t.type] ?? t.type}</td>
              <td className="px-4 py-3">{shortId(t.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}