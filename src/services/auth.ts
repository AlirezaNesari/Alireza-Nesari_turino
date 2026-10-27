import { http } from '@/lib/http'
import type { User } from '@/types/auth'

export const sendOtp = (mobile: string) =>
  http.post<{ message: string; code?: string }>('/auth/send-otp', { mobile }).then((r) => r.data)

export const checkOtp = (mobile: string, code: string) =>
  http.post<{ user: User }>('/auth/check-otp', { mobile, code }).then((r) => r.data)

export const logout = () => http.post('/auth/logout')

export const getMe = async () => {
  try {
    return (await http.get<User>('/auth/me')).data
  } catch {
    return null
  }
}