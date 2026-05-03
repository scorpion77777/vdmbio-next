import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pubchem.ncbi.nlm.nih.gov' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'vdmbio.com' },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
}

export default nextConfig
