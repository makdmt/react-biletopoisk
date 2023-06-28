/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.postimg.cc',
            port: '',
            pathname: '/**/**',
          },
        ],
      },
}

module.exports = nextConfig
