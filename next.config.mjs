/** @type {import('next').NextConfig} */
const nextConfig = { experimental: {
    missingSuspenseWithCSRBailout: false,
  }, images:{domains:['lh3.googleusercontent.com']}};

export default nextConfig;
