import axios from 'axios'
import { http } from '@/lib/http'
import type { OrderBody, Tour, Transaction, UserTour } from '@/types/tour'

export const reserveTour = (id: string) =>
  http.put<{ message: string }>(`/basket/${id}`).then((r) => r.data)

export async function getBasket() {
  try {
    return (await http.get<Tour>('/basket')).data
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) return null // سبد خالی
    throw e
  }
}

export const createOrder = (body: OrderBody) =>
  http.post<{ message: string }>('/order', body).then((r) => r.data)

export async function getUserTours(): Promise<UserTour[]> {
  const { data } = await http.get<Tour[]>('/user/tours')
  const now = Date.now()
  return data.filter(Boolean).map((t) => ({ ...t, ended: Date.parse(t.endDate) < now }))
}

export const getTransactions = () => http.get<Transaction[]>('/user/transactions').then((r) => r.data)