import { NextResponse } from 'next/server'
import { API, cookieOpts } from '@/lib/server/backend'

export async function POST(req: Request) {
  try {
    const res = await fetch(`${API}/auth/check-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(await req.json()),
      cache: 'no-store',
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json(data, { status: res.status })

    const out = NextResponse.json({ user: data.user })
    out.cookies.set('accessToken', data.accessToken, {
      ...cookieOpts,
      maxAge: 60 * 60,
    })
    out.cookies.set('refreshToken', data.refreshToken, {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 7,
    })
    return out
  } catch {
    return NextResponse.json(
      { message: 'اتصال با سرور برقرار نیست!' },
      { status: 503 },
    )
  }
}
