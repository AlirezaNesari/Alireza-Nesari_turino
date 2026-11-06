'use client'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useMe } from '@/hooks/useMe'
import { useAuthModal } from '@/store/useAuthModal'
import { reserveTour } from '@/services/tours'
import { getErrorMessage } from '@/utils/error'
import { btnPrimary } from '@/components/ui/styles'

export default function ReserveButton({ tourId, soldOut }: { tourId: string; soldOut: boolean }) {
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
      className={`${btnPrimary} px-10 py-3 text-base`}
    >
      {soldOut ? 'ظرفیت تکمیل است' : reserve.isPending ? 'لطفا صبر کنید...' : 'رزرو و خرید'}
    </button>
  )
}