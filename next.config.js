/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['e-cdns-images.dzcdn.net']
  }
}

module.exports = nextConfig