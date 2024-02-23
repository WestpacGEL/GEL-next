/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/westpac-gel/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/design-system',
        destination: '/design-system/wbc',
        permanent: false,
      },
      {
        source: '/articles',
        destination: '/',
        permanent: false,
      },
    ];
  },
};
