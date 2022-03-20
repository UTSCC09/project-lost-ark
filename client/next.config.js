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
        // TODO: Need to change the proxy destination for deployment version
        destination: "http://localhost:4000/:path*"
      }
    ]
  }
}

module.exports = nextConfig
