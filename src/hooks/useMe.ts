import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/services/auth'

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
