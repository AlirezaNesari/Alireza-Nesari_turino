import 'server-only'
import type { Tour } from '@/types/tour'

const API = process.env.API_URL!

import type { TourFilters } from '@/lib/api-types'
export async function getTours(filters: TourFilters = {}): Promise<Tour[]> {
  const qs = new URLSearchParams()
  for (const [k, v] of Object.entries(filters)) if (v) qs.set(k, v)
  const res = await fetch(`${API}/tour?${qs}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('خطا در دریافت تورها')
  return res.json()
}

export async function getTour(id: string): Promise<Tour | null> {
  const res = await fetch(`${API}/tour/${id}`, { next: { revalidate: 60 } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('خطا در دریافت تور')
  return res.json()
}