/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
