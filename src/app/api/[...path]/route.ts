import { backendFetch, proxy } from '@/lib/server/backend'

const ALLOWED = ['basket', 'order', 'user']

async function handler(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  if (!ALLOWED.includes(path[0])) {
    return Response.json({ message: 'مسیر یافت نشد' }, { status: 404 })
  }
  const body = req.method === 'GET' ? undefined : (await req.text()) || undefined
  return proxy(() => backendFetch(`/${path.join('/')}`, { method: req.method, body }))
}

export { handler as GET, handler as POST, handler as PUT }