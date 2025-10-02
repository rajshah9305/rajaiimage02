/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,        // ← DELETED (not needed in Next 14)
  },
  eslint: {
    ignoreDuringBuilds: true,   // optional: lets the build pass even with old ESLint
  },
  typescript: {
    ignoreBuildErrors: true,    // optional: same for TS while you clean up
  },
};

module.exports = nextConfig;
