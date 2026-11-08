import { http } from '@/lib/http'
import type { User } from '@/types/auth'

export const updateProfile = (data: Partial<User>) =>
  http.put('/user/profile', data).then((r) => r.data)
