/** @type {import('next').NextConfig} */
console.log({ env: process.env }) 
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  async rewrites() {
    return [
      { 
        source: "/api/:path*",
        destination: `https://${process.env.BACKEND_HOST}/:path*`
      }
    ]
  }
}

module.exports = nextConfig
