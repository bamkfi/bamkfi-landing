/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/:path*',
            destination: 'https://app.bamk.fi/:path*',
            permanent: false,
          },
        ];
      },
};

export default nextConfig;
