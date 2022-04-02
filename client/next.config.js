/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  async rewrites() {
    return [
      { 
        source: "/api/:path*",
        // destination: `https://${process.env.BACKEND_HOST}/:path*`
        destination: `http://localhost:4000/:path*`
      }
    ]
  }
}

module.exports = nextConfig
