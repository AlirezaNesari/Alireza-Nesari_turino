import type { Metadata } from 'next'
import Transactions from '@/components/profile/Transactions'

export const metadata: Metadata = { title: 'تراکنش‌ها' }

export default function TransactionsPage() {
  return <Transactions />
}
