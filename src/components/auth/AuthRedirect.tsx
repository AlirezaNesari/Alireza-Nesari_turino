'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthModal } from '@/store/useAuthModal'

export default function AuthRedirect() {
  const params = useSearchParams()
  const router = useRouter()
  const show = useAuthModal((s) => s.show)
  const needLogin = params.get('login') === '1'

  useEffect(() => {
    if (needLogin) {
      show()
      router.replace('/')
    }
  }, [needLogin, show, router])

  return null
}
