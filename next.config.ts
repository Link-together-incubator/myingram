import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: false,
  images: {
    domains: ['storage.yandexcloud.net'],
  },
}

export default nextConfig
