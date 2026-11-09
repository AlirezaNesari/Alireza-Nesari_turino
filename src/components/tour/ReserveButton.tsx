'use client'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ButtonLoader } from '@/components/ui/Loaders'
import { btnPrimary } from '@/components/ui/styles'
import { useMe } from '@/hooks/useMe'
import { useAuthModal } from '@/store/useAuthModal'
import { reserveTour } from '@/services/tours'
import { getErrorMessage } from '@/utils/error'

export default function ReserveButton({
  tourId,
  soldOut,
}: {
  tourId: string
  soldOut: boolean
}) {
  const router = useRouter()
  const qc = useQueryClient()
  const { data: user } = useMe()
  const show = useAuthModal((s) => s.show)

  const reserve = useMutation({
    mutationFn: () => reserveTour(tourId),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ['basket'] })
      router.push('/checkout')
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })

  return (
    <button
      disabled={soldOut || reserve.isPending}
      onClick={() => (user ? reserve.mutate() : show())}
      className={`${btnPrimary} min-w-40 px-10 py-3 text-base`}
    >
      {soldOut ? (
        'ظرفیت تکمیل است'
      ) : reserve.isPending ? (
        <ButtonLoader />
      ) : (
        'رزرو و خرید'
      )}
    </button>
  )
}
