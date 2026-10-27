import { backendFetch, proxy } from '@/lib/server/backend'

export async function GET() {
  return proxy(() => backendFetch('/user/profile'))
}
