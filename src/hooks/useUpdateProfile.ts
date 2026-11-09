import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateProfile } from '@/services/user'
import { getErrorMessage } from '@/utils/error'

export function useUpdateProfile(onDone?: () => void) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] })
      toast.success('تغییرات با موفقیت ذخیره شد')
      onDone?.()
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
