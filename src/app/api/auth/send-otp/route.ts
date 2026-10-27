import { API, proxy } from '@/lib/server/backend'

export async function POST(req: Request) {
  const body = await req.json()
  return proxy(() =>
    fetch(`${API}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    }),
  )
}
