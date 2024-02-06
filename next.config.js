/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
    ]
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
