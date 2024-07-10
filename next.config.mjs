/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
        },
      ],
    },
    redirects: async () => {
      return [
        {
          source: '/:path*',
          has: [{ type: 'header', key: 'host', value: 'www.thedigital.ninja' }],
          destination: 'https://TheDigital.Ninja/:path*',
          permanent: true,
        },
      ];
    },
  }

export default nextConfig;
