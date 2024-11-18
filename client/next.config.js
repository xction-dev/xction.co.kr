/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
};
