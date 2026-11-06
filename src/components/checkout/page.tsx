import type { Metadata } from 'next'
import CheckoutView from '@/components/checkout/CheckoutView'

export const metadata: Metadata = { title: 'ثبت و خرید نهایی' }

export default function CheckoutPage() {
  return <CheckoutView />
}