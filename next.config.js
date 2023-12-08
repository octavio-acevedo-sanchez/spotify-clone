/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kzgqbwerpkengyydmamh.supabase.co'
      }
    ]
  }
}

module.exports = nextConfig
