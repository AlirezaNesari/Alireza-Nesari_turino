import type { Metadata } from 'next'
import MyTours from '@/components/profile/MyTours'

export const metadata: Metadata = { title: 'تورهای من' }

export default function MyToursPage() {
  return <MyTours />
}