import { NextResponse, type NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const hasSession = req.cookies.has('accessToken') || req.cookies.has('refreshToken')
  if (!hasSession) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.search = '?login=1'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/profile/:path*', '/checkout/:path*'] }