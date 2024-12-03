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
      {
        protocol: 'https',
        hostname: 'westpac.com.au',
        port: '',
        pathname: '/content/dam/public/gel/**',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/design-system',
        destination: '/design-system/wbc',
        permanent: false,
      },
      {
        source: '/design-system/what-is-(G|g)(E|e)(L|l)',
        destination: '/articles/what-is-gel',
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
