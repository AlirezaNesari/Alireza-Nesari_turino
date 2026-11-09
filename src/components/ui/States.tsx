'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonLoader } from '@/components/ui/Loaders'
import { btnPrimary } from '@/components/ui/styles'

export function ErrorState({
  message = 'اتصال با سرور برقرار نیست!',
  onRetry,
  retrying,
}: {
  message?: string
  onRetry: () => void
  retrying?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <Image src="/images/server-error.png" alt="" width={220} height={180} className="h-auto w-44 sm:w-52" />
      <p className="text-lg font-bold">{message}</p>
      <p className="text-sm text-gray-500">لطفا بعدا دوباره امتحان کنید.</p>
      <button onClick={onRetry} disabled={retrying} className={`${btnPrimary} mt-2 min-w-28`}>
        {retrying ? <ButtonLoader /> : 'تلاش مجدد'}
      </button>
    </div>
  )
}

export function EmptyState({ message, href, action }: { message: string; href?: string; action?: string }) {
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