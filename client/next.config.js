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
        // destination: "http://coinark-server:4000/:path*"
        destination: "http://localhost:4000/:path*"
      }
    ]
  }
}

module.exports = nextConfig
