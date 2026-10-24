import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'localhost', port: '6500', pathname: '/static/**' }],
  },
}
export default nextConfig