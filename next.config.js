/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
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

// module.exports = {
//   reactStrictMode: true,

//   swcMinify: true,

//   images: {
//     domains: ["source.unsplash.com", "i.scdn.co", "cdn.discordapp.com"],
//   },
// };
