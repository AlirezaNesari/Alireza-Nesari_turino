import 'server-only'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const API = process.env.API_URL!
export const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.COOKIE_SECURE === 'true',
  path: '/',
}
const json = { 'Content-Type': 'application/json' }

export async function backendFetch(path: string, init: RequestInit = {}) {
  const jar = await cookies()
  const access = jar.get('accessToken')?.value
  const refresh = jar.get('refreshToken')?.value

  const call = (token?: string) =>
    fetch(`${API}${path}`, {
      ...init,
      cache: 'no-store',
      headers: {
        ...json,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    })

  let res = await call(access)
  if ((res.status === 401 || res.status === 403) && refresh) {
    const r = await fetch(`${API}/auth/refresh-token`, {
      method: 'POST',
      headers: json,
      body: JSON.stringify({ refreshToken: refresh }),
      cache: 'no-store',
    })
    if (r.ok) {
      const { accessToken } = await r.json()
      jar.set('accessToken', accessToken, { ...cookieOpts, maxAge: 60 * 60 })
      res = await call(accessToken)
    }
  }
  return res
}

export async function proxy(fn: () => Promise<Response>) {
  try {
    const res = await fn()
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json(
      { message: 'اتصال با سرور برقرار نیست!' },
      { status: 503 },
    )
  }
}
