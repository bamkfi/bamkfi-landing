/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://app.bamk.fi/api/:path*',
            permanent: false,
          },
          {
            source: '/calculator',
            destination: 'https://app.bamk.fi/calculator',
            permanent: false,
          },
          {
            source: '/leaderboard',
            destination: 'https://app.bamk.fi/leaderboard',
            permanent: false,
          },
          {
            source: '/swap',
            destination: 'https://app.bamk.fi/swap',
            permanent: false,
          },
          {
            source: '/mint',
            destination: 'https://app.bamk.fi/swap/mint',
            permanent: false,
          },
          {
            source: '/redeem',
            destination: 'https://app.bamk.fi/swap/redeem',
            permanent: false,
          },
          {
            source: '/swap/:path',
            destination: 'https://app.bamk.fi/swap/:path*',
            permanent: false,
          },
          
        ];
      },
};

export default nextConfig;
