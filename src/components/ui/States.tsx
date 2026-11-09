'use client'
import Link from 'next/link'
import { ButtonLoader } from '@/components/ui/Loaders'
import { btnPrimary } from '@/components/ui/styles'

export function ErrorState({
  message = 'خطا در دریافت اطلاعات.',
  onRetry,
  retrying,
}: {
  message?: string
  onRetry: () => void
  retrying?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-red-50 py-12 text-center">
      <p className="text-red-600">{message}</p>
      <button
        onClick={onRetry}
        disabled={retrying}
        className={`${btnPrimary} min-w-28`}
      >
        {retrying ? <ButtonLoader /> : 'تلاش مجدد'}
      </button>
    </div>
  )
}

export function EmptyState({
  message,
  href,
  action,
}: {
  message: string
  href?: string
  action?: string
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-gray-50 py-12 text-center text-gray-500">
      <p>{message}</p>
      {href && action && (
        <Link href={href} className={btnPrimary}>
          {action}
        </Link>
      )}
    </div>
  )
}
