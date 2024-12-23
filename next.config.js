/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    localeDetection: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
