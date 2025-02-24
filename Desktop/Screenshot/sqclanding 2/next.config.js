/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Replace with your specific image domains
      },
    ],
    domains: ['22527425.fs1.hubspotusercontent-na1.net']
  },
}

module.exports = nextConfig 