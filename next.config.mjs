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
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
      ],
    qualities: [50, 75, 85, 90, 100],
    },
    // Ensure filesystem-backed markdown content is present in serverless runtime.
    // Vercel serverless bundles only traced files; `fs.readdirSync(process.cwd() + '/posts')`
    // won't be automatically included without an explicit trace include.
    outputFileTracingIncludes: {
      '/*': ['./posts/**/*'],
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
