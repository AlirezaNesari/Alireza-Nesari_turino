import { useEffect, useState } from 'react'

export function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(t)
  }, [left])
  const label = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`
  return { left, label, reset: () => setLeft(seconds) }
}
