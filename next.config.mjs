/** @type {import('next').NextConfig} */
const nextConfig = { experimental: {
    missingSuspenseWithCSRBailout: false,
  }, images:{  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],  }};

export default nextConfig;
